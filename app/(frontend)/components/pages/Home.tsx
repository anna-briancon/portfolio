import React from 'react'
import { ChevronRight } from 'lucide-react'

interface HomeProps {
  setCurrentSection: (section: string) => void
  setIsHovering: (isHovering: boolean) => void
}

const Home: React.FC<HomeProps> = ({ setCurrentSection, setIsHovering }) => {
  const name = "Anna Briançon"
  const title = "Développeuse Full-stack"

  return (
    <section className="mb-20">
      <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[5vw] leading-none mb-4 sm:mb-6 tracking-tighter">
        {name}
      </h1>
      <p className="text-xl sm:text-2xl md:text-3xl mb-6 sm:mb-8 tracking-tight">
        {title}
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