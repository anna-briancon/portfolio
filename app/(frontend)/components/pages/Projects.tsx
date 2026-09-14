"use client"

import React, { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, ChevronLeft, ChevronRight, ArrowUpRight } from "lucide-react"
import Image from "next/image"
import { trackProjectView } from "../AnalyticsTracker"

interface Project {
  id: number
  title: string
  category: string
  techno: string
  description: string
  text: string
  images: string[]
  websiteUrl: string | null
}

interface ProjectsProps {
  categories: string[]
  projects: Project[]
  setIsHovering: (isHovering: boolean) => void
}

const Projects: React.FC<ProjectsProps> = ({
  categories,
  projects,
  setIsHovering,
}) => {
  const [currentCategory, setCurrentCategory] = useState("Tous")
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [hoveredId, setHoveredId] = useState<number | null>(null)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isFullSizeView, setIsFullSizeView] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const projectDetailsRef = useRef<HTMLDivElement>(null)
  const listRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024)
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        projectDetailsRef.current &&
        !projectDetailsRef.current.contains(event.target as Node) &&
        listRef.current &&
        !listRef.current.contains(event.target as Node) &&
        !isFullSizeView
      ) {
        setSelectedProject(null)
      }
    }

    if (selectedProject) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [selectedProject, isFullSizeView])

  const filteredProjects =
    currentCategory === "Tous"
      ? [...projects].sort((a, b) => b.id - a.id)
      : projects
          .filter((project) => project.category === currentCategory)
          .sort((a, b) => b.id - a.id)

  const handleImageClick = (image: string, index: number) => {
    setSelectedImage(image)
    setCurrentImageIndex(index)
    setIsFullSizeView(true)
  }

  const handleCloseImage = () => {
    setSelectedImage(null)
    setIsFullSizeView(false)
  }

  const handlePrevImage = () => {
    if (!selectedProject) return
    const newIndex =
      currentImageIndex === 0
        ? selectedProject.images.length - 1
        : currentImageIndex - 1
    setCurrentImageIndex(newIndex)
    setSelectedImage(selectedProject.images[newIndex])
  }

  const handleNextImage = () => {
    if (!selectedProject) return
    const newIndex =
      currentImageIndex === selectedProject.images.length - 1
        ? 0
        : currentImageIndex + 1
    setCurrentImageIndex(newIndex)
    setSelectedImage(selectedProject.images[newIndex])
  }

  const selectProject = (project: Project) => {
    setSelectedProject(project)
    trackProjectView(project.id, project.title)
  }

  const technos = selectedProject
    ? selectedProject.techno
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean)
    : []

  return (
    <section className="h-[calc(84vh-120px)] md:h-[calc(70vh-100px)] flex flex-col min-h-0 overflow-hidden">
      <div className="shrink-0 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2 mb-2">
        <h2 className="text-3xl md:text-4xl tracking-tighter">Mes Projets</h2>
        <p className="text-xs uppercase tracking-[0.2em] opacity-40">
          {filteredProjects.length} projet{filteredProjects.length > 1 ? "s" : ""}
        </p>
      </div>

      <div className="shrink-0 flex flex-nowrap overflow-x-auto gap-5 md:gap-7 pb-1 mb-0 scrollbar-hide">
        {categories.map((category) => {
          const active = currentCategory === category
          return (
            <button
              key={category}
              onClick={() => {
                setCurrentCategory(category)
                setSelectedProject(null)
              }}
              className={`relative whitespace-nowrap pb-3 text-sm tracking-wide transition-opacity ${
                active ? "opacity-100" : "opacity-40 hover:opacity-70"
              }`}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              {category}
              {active && (
                <motion.span
                  layoutId="project-filter-underline"
                  className="absolute left-0 right-0 bottom-0 h-px bg-current"
                />
              )}
            </button>
          )
        })}
      </div>

      <div className="flex-1 min-h-0 relative flex flex-col lg:flex-row gap-4 lg:gap-6 pt-1 overflow-hidden">
        <AnimatePresence mode="wait">
          {(!selectedProject || !isMobile) && (
            <motion.div
              ref={listRef}
              key={currentCategory}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className={`h-full overflow-y-auto scrollbar-hide pb-6 ${
                selectedProject && !isMobile ? "w-[42%]" : "w-full lg:w-[48%]"
              }`}
            >
              <ul className="divide-y divide-black/25 dark:divide-white/15">
                {filteredProjects.map((project, index) => {
                  const isSelected = selectedProject?.id === project.id
                  const isHovered = hoveredId === project.id

                  return (
                    <motion.li
                      key={project.id}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: Math.min(index * 0.03, 0.3) }}
                    >
                      <button
                        type="button"
                        onClick={() => selectProject(project)}
                        onMouseEnter={() => {
                          setHoveredId(project.id)
                          setIsHovering(true)
                        }}
                        onMouseLeave={() => {
                          setHoveredId(null)
                          setIsHovering(false)
                        }}
                        className="group w-full text-left py-3 md:py-4 flex items-baseline gap-3 md:gap-5"
                      >
                        <span className="text-xs md:text-sm tabular-nums opacity-35 w-7 shrink-0">
                          {String(index + 1).padStart(2, "0")}
                        </span>

                        <span className="flex-1 min-w-0">
                          <span className="flex flex-col gap-1 md:block">
                            <span
                              className={`block text-lg md:text-2xl font-light tracking-tight transition-transform duration-300 ${
                                isSelected || isHovered ? "md:translate-x-2" : ""
                              }`}
                            >
                              {project.title}
                            </span>
                            <span className="md:hidden text-[10px] uppercase tracking-[0.12em] opacity-40">
                              {project.category}
                            </span>
                          </span>
                          <span
                            className={`mt-2 block h-px bg-current origin-left transition-transform duration-500 ${
                              isSelected || isHovered
                                ? "scale-x-100 opacity-40"
                                : "scale-x-0 opacity-0"
                            }`}
                          />
                        </span>

                        <span className="hidden md:inline text-xs uppercase tracking-[0.14em] opacity-40 shrink-0 max-w-[30%] text-right">
                          {project.category}
                        </span>
                      </button>
                    </motion.li>
                  )
                })}
              </ul>

              {filteredProjects.length === 0 && (
                <p className="py-10 text-sm opacity-40">
                  Aucun projet dans cette catégorie.
                </p>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence mode="wait">
          {selectedProject && (
            <motion.div
              ref={projectDetailsRef}
              key={selectedProject.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className={`h-full overflow-y-auto scrollbar-hide ${
                isMobile
                  ? "w-full relative pt-1"
                  : "w-[52%] absolute right-0 top-0 bottom-0 pl-4"
              }`}
            >
              <div className="flex items-start justify-between gap-3 mb-4">
                <div className="pr-2">
                  <p className="text-[11px] uppercase tracking-[0.18em] opacity-40 mb-1.5">
                    {selectedProject.category}
                  </p>
                  <h3 className="text-2xl md:text-3xl font-light tracking-tight leading-tight">
                    {selectedProject.title}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="p-1.5 opacity-40 hover:opacity-100 transition-opacity shrink-0"
                  aria-label="Fermer"
                  onMouseEnter={() => setIsHovering(true)}
                  onMouseLeave={() => setIsHovering(false)}
                >
                  <X size={20} />
                </button>
              </div>

              {selectedProject.images[0] && (
                <button
                  type="button"
                  className="relative w-full aspect-[16/10] overflow-hidden mb-4 group bg-black/[0.04] dark:bg-white/[0.06]"
                  onClick={() =>
                    handleImageClick(selectedProject.images[0], 0)
                  }
                  onMouseEnter={() => setIsHovering(true)}
                  onMouseLeave={() => setIsHovering(false)}
                >
                  <Image
                    src={selectedProject.images[0]}
                    alt={selectedProject.title}
                    fill
                    className="object-contain transition-transform duration-700 group-hover:scale-[1.02]"
                    sizes="(max-width: 1024px) 100vw, 45vw"
                  />
                </button>
              )}

              <p className="text-base md:text-lg leading-relaxed opacity-80 mb-3 whitespace-pre-line">
                {selectedProject.description}
              </p>

              <p className="text-sm md:text-base leading-relaxed opacity-60 mb-5 whitespace-pre-line">
                {selectedProject.text}
              </p>

              {technos.length > 0 && (
                <div className="flex flex-wrap gap-x-3 gap-y-1 mb-5 text-xs uppercase tracking-[0.12em] opacity-45">
                  {technos.map((tech, index) => (
                    <span key={tech} className="inline-flex items-center gap-3">
                      {tech}
                      {index < technos.length - 1 && (
                        <span className="opacity-40" aria-hidden>
                          /
                        </span>
                      )}
                    </span>
                  ))}
                </div>
              )}

              {selectedProject.websiteUrl && (
                <a
                  href={selectedProject.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm uppercase tracking-[0.16em] border-b border-current pb-1 hover:opacity-60 transition-opacity"
                  onMouseEnter={() => setIsHovering(true)}
                  onMouseLeave={() => setIsHovering(false)}
                >
                  Voir le site
                  <ArrowUpRight size={16} />
                </a>
              )}

              {selectedProject.images.length > 1 && (
                <div className="mt-6 grid grid-cols-2 gap-3">
                  {selectedProject.images.slice(1).map((image, index) => (
                    <button
                      key={image}
                      type="button"
                      className="relative aspect-video overflow-hidden bg-black/[0.04] dark:bg-white/[0.06]"
                      onClick={() => handleImageClick(image, index + 1)}
                      onMouseEnter={() => setIsHovering(true)}
                      onMouseLeave={() => setIsHovering(false)}
                    >
                      <Image
                        src={image}
                        alt={`${selectedProject.title} — ${index + 2}`}
                        fill
                        className="object-contain hover:scale-[1.02] transition-transform duration-500"
                        sizes="300px"
                      />
                    </button>
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {!selectedProject && !isMobile && (
          <div className="hidden lg:flex w-[52%] h-full items-center justify-center opacity-30 text-sm tracking-wide pl-4">
            Sélectionne un projet
          </div>
        )}
      </div>

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
            onClick={handleCloseImage}
          >
            <button
              onClick={handleCloseImage}
              className="absolute top-5 right-5 p-2 bg-white text-[#333] rounded-full"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              <X size={22} />
            </button>
            {selectedProject && selectedProject.images.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    handlePrevImage()
                  }}
                  className="absolute left-4 md:left-8 p-2 bg-white text-[#333] rounded-full"
                  onMouseEnter={() => setIsHovering(true)}
                  onMouseLeave={() => setIsHovering(false)}
                >
                  <ChevronLeft size={22} />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    handleNextImage()
                  }}
                  className="absolute right-4 md:right-8 p-2 bg-white text-[#333] rounded-full"
                  onMouseEnter={() => setIsHovering(true)}
                  onMouseLeave={() => setIsHovering(false)}
                >
                  <ChevronRight size={22} />
                </button>
              </>
            )}
            <Image
              src={selectedImage}
              alt="Aperçu projet"
              className="max-h-[85vh] max-w-full object-contain"
              width={1400}
              height={900}
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx global>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  )
}

export default Projects
