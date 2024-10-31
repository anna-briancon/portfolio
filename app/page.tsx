"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { SunMedium, Moon } from 'lucide-react'
import Navigation from './components/Navigation'
import Home from './components/pages/Home'
import Projects from './components/pages/Projects'
import About from './components/pages/About'
import Contact from './components/pages/Contact'
import AnimatedBackground from "./components/ui/AnimatedBackground"
import { sections } from './data/sections'
import { categories } from './data/categories'
import { projects } from './data/projects'
import { toolCategories } from './data/toolCategories'

export default function Portfolio() {
  const [currentSection, setCurrentSection] = useState("accueil")
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY })
    }

    if (!isMobile) {
      window.addEventListener("mousemove", handleMouseMove)
    }

    return () => {
      window.removeEventListener('resize', checkMobile)
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [isMobile])

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDarkMode])

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-[#1a1a1a] text-white' : 'bg-[#f4f1ec] text-[#333]'} overflow-hidden font-sans p-2 md:p-5 transition-colors duration-300`}>
      <div className={`border-2 ${isDarkMode ? 'border-white' : 'border-black'} border-opacity-60 fixed inset-4 md:inset-9 overflow-hidden`}>
        <AnimatedBackground />
        {!isMobile && (
          <motion.div
            className="fixed top-0 left-0 w-6 h-6 rounded-full bg-[#333] mix-blend-difference pointer-events-none z-50"
            style={{
              x: cursorPosition.x - 12,
              y: cursorPosition.y - 12,
            }}
            animate={{
              scale: isHovering ? 1.5 : 1,
              backgroundColor: isHovering ? "transparent" : "#333",
              borderColor: isHovering ? "#333" : "transparent",
              borderWidth: 0.5,
            }}
            transition={{ type: "spring", stiffness: 500, damping: 28 }}
          />
        )}
        
        {/* Theme Toggle Buttons */}
        <div className="fixed right-6 md:right-11 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-50">
          <button
            onClick={() => setIsDarkMode(false)}
            className={`p-2 rounded-full transition-colors duration-300 ${
              !isDarkMode ? 'text-[#333] bg-white shadow-md' : 'text-white hover:bg-white/10'
            }`}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <SunMedium className="w-4 h-4" />
          </button>
          <button
            onClick={() => setIsDarkMode(true)}
            className={`p-2 rounded-full transition-colors duration-300 ${
              isDarkMode ? 'text-white bg-[#333] shadow-md' : 'text-[#333] hover:bg-black/10'
            }`}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <Moon className="w-4 h-4" />
          </button>
        </div>

        <Navigation
          sections={sections}
          currentSection={currentSection}
          setCurrentSection={setCurrentSection}
          setIsHovering={setIsHovering}
        />
        <AnimatePresence mode="wait">
          <motion.main
            key={currentSection}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="absolute bottom-2 md:bottom-5 left-5 md:left-20 right-5 md:right-10 max-h-[calc(80vh-40px)] overflow-y-auto scrollbar-hide"
          >
            {currentSection === "accueil" && (
              <Home setCurrentSection={setCurrentSection} setIsHovering={setIsHovering} />
            )}
            {currentSection === "projets" && (
              <Projects
                categories={categories}
                projects={projects}
                setIsHovering={setIsHovering}
              />
            )}
            {currentSection === "à propos" && (
              <About toolCategories={toolCategories} />
            )}
            {currentSection === "contact" && (
              <Contact setIsHovering={setIsHovering} />
            )}
          </motion.main>
        </AnimatePresence>
      </div>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Raleway:wght@100;200;300;400;500;600;700;800;900&display=swap');

        body {
          font-family: 'Raleway', sans-serif;
          overflow: hidden;
        }

        h2, h3, h4, h5, h6 {
          font-family: "Raleway", sans-serif;
          font-weight: 300;
        }

        h1 {
          font-weight: 200;
        }

        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  )
}