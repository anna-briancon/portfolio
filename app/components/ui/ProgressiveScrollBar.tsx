'use client'

import { useEffect, useState } from 'react'

export default function ProgressiveScrollBar({ containerRef }: { containerRef: React.RefObject<HTMLDivElement> }) {
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = containerRef.current
        const scrollPercentage = (scrollTop / (scrollHeight - clientHeight)) * 100
        setScrollProgress(scrollPercentage)
      }
    }

    const currentRef = containerRef.current
    if (currentRef) {
      currentRef.addEventListener('scroll', handleScroll)
    }

    return () => {
      if (currentRef) {
        currentRef.removeEventListener('scroll', handleScroll)
      }
    }
  }, [containerRef])

  return (
    <div className="w-full sm:w-3/4 md:w-2/3 lg:w-1/2 bg-gray-200 h-0.5 sm:h-1 my-2 sm:my-3 md:my-4 dark:bg-gray-400">
      <div
        className="bg-[#333] h-full transition-all duration-300 ease-out rounded-full"
        style={{ width: `${scrollProgress}%` }}
      />
    </div>
  )
}