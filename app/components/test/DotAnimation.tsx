import React, { useEffect, useRef } from 'react'

interface DotAnimationProps {
    text: string[]
    containerRef: React.RefObject<HTMLDivElement>
    onComplete: () => void
}

const DotAnimation: React.FC<DotAnimationProps> = ({ text, containerRef, onComplete }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const canvas = canvasRef.current
        const ctx = canvas?.getContext('2d')
        if (!canvas || !ctx || !containerRef.current) return

        const container = containerRef.current
        canvas.width = container.offsetWidth
        canvas.height = container.offsetHeight

        const dots: { x: number; y: number; targetX: number; targetY: number }[] = []
        const dotCount = 1000
        const animationDuration = 3000 // 3 seconds

        // Create dots
        for (let i = 0; i < dotCount; i++) {
            dots.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                targetX: 0,
                targetY: 0
            })
        }

        // Set target positions for dots
        ctx.font = `${parseInt(getComputedStyle(container).fontSize)}px ${getComputedStyle(container).fontFamily}`
        let y = 0
        text.forEach((line, index) => {
            const metrics = ctx.measureText(line)
            const lineHeight = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent
            y += lineHeight + (index === 0 ? 0 : 20) // Add some space between lines

            for (let i = 0; i < line.length; i++) {
                const charWidth = ctx.measureText(line[i]).width
                const x = (canvas.width - metrics.width) / 2 + ctx.measureText(line.substring(0, i)).width

                for (let j = 0; j < 5; j++) { // 5 dots per character
                    const dot = dots[Math.floor(Math.random() * dots.length)]
                    dot.targetX = x + Math.random() * charWidth
                    dot.targetY = y + Math.random() * lineHeight
                }
            }
        })

        let startTime: number | null = null

        const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp
            const progress = Math.min((timestamp - startTime) / animationDuration, 1)

            ctx.clearRect(0, 0, canvas.width, canvas.height)
            ctx.fillStyle = '#333'

            dots.forEach(dot => {
                dot.x += (dot.targetX - dot.x) * progress * 0.1
                dot.y += (dot.targetY - dot.y) * progress * 0.1
                ctx.beginPath()
                ctx.arc(dot.x, dot.y, 1, 0, Math.PI * 2)
                ctx.fill()
            })

            if (progress < 1) {
                requestAnimationFrame(animate)
            } else {
                onComplete()
            }
        }

        requestAnimationFrame(animate)

        return () => {
            // Cleanup if needed
        }
    }, [text, containerRef, onComplete])

    return (
        <canvas
            ref={canvasRef}
            className="absolute top-0 left-0 w-full h-full"
        />
    )
}

export default DotAnimation