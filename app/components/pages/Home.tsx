import React, { useState, useEffect } from 'react'
import { ChevronRight } from 'lucide-react'

interface HomeProps {
  setCurrentSection: (section: string) => void
  setIsHovering: (isHovering: boolean) => void
}

const Home: React.FC<HomeProps> = ({ setCurrentSection, setIsHovering }) => {
  const [typedText, setTypedText] = useState({ name: "", title: "" })
  const [isDeleting, setIsDeleting] = useState(false)
  const [showCursor, setShowCursor] = useState(true)

  useEffect(() => {
    const name = "Anna Briançon"
    const title = "Développeuse Full-stack"
    let nameIndex = 0
    let titleIndex = 0

    const animateText = () => {
      if (!isDeleting) {
        if (nameIndex <= name.length) {
          setTypedText(prev => ({ ...prev, name: name.slice(0, nameIndex) }))
          nameIndex++
        } else if (titleIndex <= title.length) {
          setTypedText(prev => ({ ...prev, title: title.slice(0, titleIndex) }))
          titleIndex++
        } else {
          setTimeout(() => setIsDeleting(true), 1000)
        }
      } else {
        if (titleIndex > 0) {
          setTypedText(prev => ({ ...prev, title: title.slice(0, titleIndex - 1) }))
          titleIndex--
        } else if (nameIndex > 0) {
          setTypedText(prev => ({ ...prev, name: name.slice(0, nameIndex - 1) }))
          nameIndex--
        } else {
          setIsDeleting(false)
          nameIndex = 0
          titleIndex = 0
        }
      }
    }

    const interval = setInterval(animateText, 50)
    const cursorInterval = setInterval(() => setShowCursor(prev => !prev), 530)

    return () => {
      clearInterval(interval)
      clearInterval(cursorInterval)
    }
  }, [isDeleting])

  return (
    <section className="mb-20">
      <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[5vw] leading-none mb-4 sm:mb-6 flex items-center tracking-tighter">
        <span>{typedText.name}</span>
        {typedText.name.length < "Anna Briançon".length && (
          <span
            className={`w-0.5 h-[0.8em] bg-[#333] ml-1 inline-block ${showCursor ? 'opacity-100' : 'opacity-0'
              }`}
            style={{ minWidth: '2px' }}
          />
        )}
      </h1>
      <p className="text-xl sm:text-2xl md:text-3xl mb-6 sm:mb-8 flex items-center tracking-tight">
        <span>{typedText.title}</span>
        {typedText.name.length === "Anna Briançon".length &&
          typedText.title.length < "Développeuse Full-stack".length && (
            <span
              className={`w-0.5 h-[1em] bg-[#333] ml-1 inline-block ${showCursor ? 'opacity-100' : 'opacity-0'
                }`}
              style={{ minWidth: '2px' }}
            />
          )}
      </p>
      <button
        onClick={() => setCurrentSection("projets")}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        className="flex items-center text-sm sm:text-base uppercase tracking-wider hover:text-[#999] transition-colors group"
      >
        Voir les Projets
        <ChevronRight className="ml-2 transition-transform group-hover:translate-x-1" />
      </button>
    </section>
  )
}

export default Home