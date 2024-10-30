"use client"

import React, { useEffect, useRef } from 'react'

const AnimatedBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId: number

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    const drawWave = (
      amplitude: number,
      frequency: number,
      yOffset: number,
      color: string,
      time: number
    ) => {
      ctx.beginPath()
      ctx.moveTo(0, canvas.height)

      for (let x = 0; x < canvas.width; x++) {
        const y =
          amplitude * Math.sin((x / canvas.width) * frequency * Math.PI + time) +
          yOffset
        ctx.lineTo(x, y)
      }

      ctx.lineTo(canvas.width, canvas.height)
      ctx.fillStyle = color
      ctx.fill()
    }

    let time = 0

    const animate = () => {
      time += 0.005
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw multiple waves with different properties
      drawWave(30, 3, canvas.height * 0.5, 'rgba(200, 200, 220, 0.3)', time)
      drawWave(20, 2, canvas.height * 0.6, 'rgba(180, 180, 200, 0.3)', time * 1.5)
      drawWave(40, 4, canvas.height * 0.7, 'rgba(160, 160, 180, 0.3)', time * 0.8)

      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full z-[1]" />
}

export default AnimatedBackground




