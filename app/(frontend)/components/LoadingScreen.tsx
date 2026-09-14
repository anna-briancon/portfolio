"use client"

import { motion, AnimatePresence, type Variants } from "framer-motion"
import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"

export default function LoadingScreen() {
  const pathname = usePathname()
  const skipLoader = pathname?.startsWith("/admin") || pathname?.startsWith("/analytics")
  const [isLoading, setIsLoading] = useState(!skipLoader)
  const textParts = ["Anna Briançon", " │ ", "Portfolio"]
  const characters = textParts.flatMap((part, partIndex) =>
    Array.from(part).map(char => ({ char, isName: partIndex === 0 }))
  )

  const container: Variants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.03,
        delayChildren: 0.1,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.8,
        ease: "easeInOut",
        when: "afterChildren",
      },
    },
  }

  const child: Variants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 200,
      },
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.3,
      },
    },
  }

  useEffect(() => {
    if (skipLoader) {
      setIsLoading(false)
      return
    }

    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1700)

    return () => clearTimeout(timer)
  }, [skipLoader])

  if (skipLoader) return null

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#f3ebe1] px-4"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          <motion.div
            className="flex overflow-hidden flex-wrap justify-center"
            variants={container}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {characters.map((char, index) => (
              <motion.span
                key={index}
                variants={child}
                className={`text-2xl sm:text-3xl md:text-4xl tracking-wider text-gray-800 ${char.isName ? 'font-light' : ''
                  }`}
                style={{
                  display: 'inline-block',
                  whiteSpace: 'pre',
                  fontWeight: char.isName ? 400 : 300,
                }}
              >
                {char.char}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}