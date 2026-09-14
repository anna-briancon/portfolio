"use client"

import React, { useEffect, useRef } from "react"
import * as THREE from "three"

interface AnimatedBackgroundProps {
  isDarkMode?: boolean
}

/**
 * Fond Three.js — grille de points 3D ondulante + réaction souris.
 * Plus lisible qu’un noise plein écran, toujours soft éditorial.
 */
const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({
  isDarkMode = false,
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const darkRef = useRef(isDarkMode)
  const mouseRef = useRef({ x: 0, y: 0 })
  const targetMouseRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    darkRef.current = isDarkMode
  }, [isDarkMode])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    )
    camera.position.set(0, 1.2, 6.5)
    camera.lookAt(0, 0, 0)

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: false,
      powerPreference: "low-power",
    })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(container.clientWidth, container.clientHeight)
    renderer.setClearColor(0xf7f2ea, 1)
    renderer.domElement.style.display = "block"
    renderer.domElement.style.width = "100%"
    renderer.domElement.style.height = "100%"
    container.appendChild(renderer.domElement)

    // --- Point grid ---
    const cols = 56
    const rows = 36
    const spacing = 0.18
    const count = cols * rows
    const positions = new Float32Array(count * 3)
    const base = new Float32Array(count * 3)

    let i = 0
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        const px = (x - cols / 2) * spacing
        const pz = (y - rows / 2) * spacing
        base[i] = px
        base[i + 1] = 0
        base[i + 2] = pz
        positions[i] = px
        positions[i + 1] = 0
        positions[i + 2] = pz
        i += 3
      }
    }

    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3))

    const material = new THREE.PointsMaterial({
      size: 0.045,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.7,
      depthWrite: false,
      color: new THREE.Color("#6b6560"),
    })

    const points = new THREE.Points(geometry, material)
    points.rotation.x = -0.55
    scene.add(points)

    // --- Connecting lines (sparse, every few points) ---
    const linePositions: number[] = []
    const step = 2
    for (let y = 0; y < rows; y += step) {
      for (let x = 0; x < cols - step; x += step) {
        const a = (y * cols + x) * 3
        const b = (y * cols + x + step) * 3
        linePositions.push(base[a], base[a + 1], base[a + 2])
        linePositions.push(base[b], base[b + 1], base[b + 2])
      }
    }
    for (let x = 0; x < cols; x += step) {
      for (let y = 0; y < rows - step; y += step) {
        const a = (y * cols + x) * 3
        const b = ((y + step) * cols + x) * 3
        linePositions.push(base[a], base[a + 1], base[a + 2])
        linePositions.push(base[b], base[b + 1], base[b + 2])
      }
    }

    const lineGeo = new THREE.BufferGeometry()
    const linePosAttr = new Float32Array(linePositions)
    lineGeo.setAttribute("position", new THREE.BufferAttribute(linePosAttr, 3))
    // Store indices into base grid for animation
    const lineIndexPairs: [number, number][] = []
    for (let y = 0; y < rows; y += step) {
      for (let x = 0; x < cols - step; x += step) {
        lineIndexPairs.push([y * cols + x, y * cols + x + step])
      }
    }
    for (let x = 0; x < cols; x += step) {
      for (let y = 0; y < rows - step; y += step) {
        lineIndexPairs.push([y * cols + x, (y + step) * cols + x])
      }
    }

    const lineMat = new THREE.LineBasicMaterial({
      transparent: true,
      opacity: 0.22,
      color: new THREE.Color("#8a847c"),
    })
    const lines = new THREE.LineSegments(lineGeo, lineMat)
    lines.rotation.x = -0.55
    scene.add(lines)

    const lightColor = new THREE.Color("#a39a90")
    const lightLine = new THREE.Color("#b5aaa0")
    const darkColor = new THREE.Color("#5a5652")
    const darkLine = new THREE.Color("#4a4642")

    // Blanc cassé ↔ beige (mode clair)
    const lightBgA = new THREE.Color("#faf6f0")
    const lightBgB = new THREE.Color("#e8dfd2")
    const darkBg = new THREE.Color("#1a1a1a")
    const clearColor = new THREE.Color("#faf6f0")

    let frameId = 0
    let running = true
    const clock = new THREE.Clock()

    const applyTheme = (t: number) => {
      if (darkRef.current) {
        material.color.copy(darkColor)
        material.opacity = 0.35
        material.size = 0.038
        lineMat.color.copy(darkLine)
        lineMat.opacity = 0.12
        renderer.setClearColor(darkBg, 1)
      } else {
        material.color.copy(lightColor)
        material.opacity = 0.28
        material.size = 0.036
        lineMat.color.copy(lightLine)
        lineMat.opacity = 0.1
        // Blanc cassé qui dérive lentement vers le beige
        const mix = reducedMotion
          ? 0.35
          : 0.5 + 0.5 * Math.sin(t * 0.22)
        clearColor.copy(lightBgA).lerp(lightBgB, mix)
        renderer.setClearColor(clearColor, 1)
      }
    }
    applyTheme(0)

    const onResize = () => {
      const w = container.clientWidth
      const h = container.clientHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h, false)
    }

    const onPointerMove = (event: PointerEvent) => {
      const rect = container.getBoundingClientRect()
      targetMouseRef.current = {
        x: ((event.clientX - rect.left) / rect.width) * 2 - 1,
        y: -(((event.clientY - rect.top) / rect.height) * 2 - 1),
      }
    }

    const onVisibility = () => {
      running = document.visibilityState === "visible"
      if (running) clock.start()
    }

    const animate = () => {
      frameId = requestAnimationFrame(animate)
      if (!running) return

      const t = reducedMotion ? 0 : clock.getElapsedTime()
      applyTheme(t)

      mouseRef.current.x += (targetMouseRef.current.x - mouseRef.current.x) * 0.1
      mouseRef.current.y += (targetMouseRef.current.y - mouseRef.current.y) * 0.1

      const pos = geometry.attributes.position as THREE.BufferAttribute
      const arr = pos.array as Float32Array

      // Souris projetée sur le plan de la grille
      const mx = mouseRef.current.x * 4.2
      const mz = mouseRef.current.y * 3.2

      for (let n = 0; n < count; n++) {
        const ix = n * 3
        const x = base[ix]
        const z = base[ix + 2]
        const wave =
          Math.sin(x * 1.1 + t * 0.9) * 0.18 +
          Math.cos(z * 1.3 - t * 0.7) * 0.14 +
          Math.sin((x + z) * 0.7 + t * 0.45) * 0.1

        const dx = x - mx
        const dz = z - mz
        const dist = Math.sqrt(dx * dx + dz * dz)
        const bump = Math.exp(-dist * dist * 0.4) * 0.9

        arr[ix] = x
        arr[ix + 1] = wave + bump
        arr[ix + 2] = z
      }
      pos.needsUpdate = true

      // Update line endpoints from animated point positions
      const larr = lineGeo.attributes.position.array as Float32Array
      for (let p = 0; p < lineIndexPairs.length; p++) {
        const [ia, ib] = lineIndexPairs[p]
        const o = p * 6
        larr[o] = arr[ia * 3]
        larr[o + 1] = arr[ia * 3 + 1]
        larr[o + 2] = arr[ia * 3 + 2]
        larr[o + 3] = arr[ib * 3]
        larr[o + 4] = arr[ib * 3 + 1]
        larr[o + 5] = arr[ib * 3 + 2]
      }
      lineGeo.attributes.position.needsUpdate = true

      points.rotation.z = Math.sin(t * 0.12) * 0.04
      lines.rotation.z = points.rotation.z

      renderer.render(scene, camera)
    }

    window.addEventListener("resize", onResize)
    window.addEventListener("pointermove", onPointerMove, { passive: true })
    document.addEventListener("visibilitychange", onVisibility)
    animate()

    return () => {
      cancelAnimationFrame(frameId)
      window.removeEventListener("resize", onResize)
      window.removeEventListener("pointermove", onPointerMove)
      document.removeEventListener("visibilitychange", onVisibility)
      geometry.dispose()
      material.dispose()
      lineGeo.dispose()
      lineMat.dispose()
      renderer.dispose()
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement)
      }
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 -z-10 pointer-events-none"
      aria-hidden
    />
  )
}

export default AnimatedBackground
