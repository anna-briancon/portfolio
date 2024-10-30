"use client"

import React, { useState, useEffect, useRef } from 'react'
import { ChevronRight } from 'lucide-react'

interface HomeProps {
  setCurrentSection: (section: string) => void
  setIsHovering: (isHovering: boolean) => void
}

const Home: React.FC<HomeProps> = ({ setCurrentSection, setIsHovering }) => {
  const [textOpacity, setTextOpacity] = useState(0)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = 200

    const text = 'Anna Briançon'
    ctx.font = '88px Raleway, sans-serif'
    ctx.fillStyle = 'black'
    const textWidth = ctx.measureText(text).width
    const startX = 0
    const startY = 150

    const particles: { x: number; y: number; destX: number; destY: number; opacity: number }[] = []

    // Create particles
    for (let i = 0; i < 1000; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        destX: 0,
        destY: 0,
        opacity: 1
      })
    }

    // Get particle destinations
    ctx.fillText(text, startX, startY)
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
    const pixels = imageData.data
    for (let i = 0; i < particles.length; i++) {
      const particle = particles[i]
      while (true) {
        const x = Math.floor(Math.random() * textWidth)
        const y = Math.floor(Math.random() * canvas.height)
        const index = (y * canvas.width + x) * 4
        if (pixels[index + 3] > 0) {
          particle.destX = x
          particle.destY = y
          break
        }
      }
    }

    let textFullyVisible = false
    let particlesFadingOut = false

    // Animation
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      let allParticlesInPlace = true

      for (const particle of particles) {
        if (!particlesFadingOut) {
          const dx = particle.destX - particle.x
          const dy = particle.destY - particle.y
          particle.x += dx * 0.1
          particle.y += dy * 0.1

          if (Math.abs(dx) > 0.1 || Math.abs(dy) > 0.1) {
            allParticlesInPlace = false
          }
        } else {
          particle.opacity -= 0.02
          if (particle.opacity < 0) particle.opacity = 0
        }

        ctx.fillStyle = `rgba(0, 0, 0, ${particle.opacity})`
        ctx.fillRect(particle.x, particle.y, 2, 2)
      }

      if (allParticlesInPlace && !textFullyVisible) {
        setTextOpacity(prev => {
          const newOpacity = Math.min(prev + 0.2, 1) // Updated value here
          if (newOpacity === 1) {
            textFullyVisible = true
          }
          return newOpacity
        })
      }

      if (textFullyVisible && !particlesFadingOut) {
        particlesFadingOut = true
      }

      if (particlesFadingOut && particles.every(p => p.opacity <= 0)) {
        return // Stop the animation
      }

      requestAnimationFrame(animate)
    }

    animate()
  }, [])

  return (
    <section className="mb-20">
      <div className="relative">
        <canvas 
          ref={canvasRef} 
          className="w-full h-[200px]"
          aria-hidden="true"
        />
        <h1 
          className="text-[6vw] leading-none absolute bottom-9 left-0 transition-opacity duration-1000"
          style={{ opacity: textOpacity }}
        >
          Anna Briançon
        </h1>
      </div>
      <p className="text-2xl mb-8 tracking-tight">
        Développeuse Full-stack
      </p>
      <button
        onClick={() => setCurrentSection("projets")}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        className="inline-flex items-center text-sm uppercase tracking-wider hover:text-[#999] transition-colors"
      >
        Voir les Projets <ChevronRight className="ml-2" />
      </button>
    </section>
  )
}

export default Home