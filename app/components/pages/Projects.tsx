"use client"

import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ExternalLink } from 'lucide-react'
import ProgressiveScrollBar from '../ui/ProgressiveScrollBar'
import Image from 'next/image'

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

const Projects: React.FC<ProjectsProps> = ({ categories, projects, setIsHovering }) => {
    const [currentCategory, setCurrentCategory] = useState("Tous")
    const [selectedProject, setSelectedProject] = useState<Project | null>(null)
    const projectsContainerRef = useRef<HTMLDivElement>(null)
    const projectDetailsRef = useRef<HTMLDivElement>(null)
    const [canScroll, setCanScroll] = useState(false)
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 1024)
        checkMobile()
        window.addEventListener('resize', checkMobile)
        return () => window.removeEventListener('resize', checkMobile)
    }, [])

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (projectDetailsRef.current && !projectDetailsRef.current.contains(event.target as Node)) {
                setSelectedProject(null)
            }
        }

        if (selectedProject) {
            document.addEventListener('mousedown', handleClickOutside)
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [selectedProject])

    const filteredProjects = currentCategory === "Tous"
        ? projects
        : projects.filter(project => project.category === currentCategory)

    useEffect(() => {
        const checkScroll = () => {
            if (projectsContainerRef.current) {
                const { scrollHeight, clientHeight } = projectsContainerRef.current
                setCanScroll(scrollHeight > clientHeight)
            }
        }

        checkScroll()
        window.addEventListener('resize', checkScroll)
        return () => window.removeEventListener('resize', checkScroll)
    }, [filteredProjects])

    return (
        <section className="mb-10 h-full flex flex-col">
            <div className="flex flex-col">
                <h2 className="text-3xl md:text-4xl mb-6 md:mb-8 tracking-tighter">Mes Projets</h2>

                {/* Categories */}
                <div className="flex flex-nowrap overflow-x-auto md:flex-wrap gap-2 md:gap-3 mb-4 md:mb-6 pb-2 md:pb-0 scrollbar-hide">
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => setCurrentCategory(category)}
                            className={`
                                px-3 md:px-4 py-2 rounded-full whitespace-nowrap
                                ${currentCategory === category
                                    ? "bg-[#333] text-white"
                                    : "bg-white text-[#333] hover:bg-[#e0dcd4]"
                                } 
                                transition-colors text-sm md:text-base flex-shrink-0
                            `}
                            onMouseEnter={() => setIsHovering(true)}
                            onMouseLeave={() => setIsHovering(false)}
                        >
                            {category}
                        </button>
                    ))}
                </div>
            </div>

            <div className="flex-grow overflow-hidden">
                <ProgressiveScrollBar containerRef={projectsContainerRef} />
                <div className="relative flex flex-col lg:flex-row gap-4 md:gap-8 h-full">
                    {/* Projects List */}
                    <AnimatePresence mode="wait">
                        {(!selectedProject || !isMobile) && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3 }}
                                ref={projectsContainerRef}
                                id="projet"
                                className="w-full lg:w-1/2 overflow-y-auto pr-0 lg:pr-4 mt-4 scrollbar-hide"
                                style={{ maxHeight: 'calc(70vh - 300px)' }}
                            >
                                {filteredProjects.map((project, index) => (
                                    <div
                                        key={project.id}
                                        className={`
                                            flex justify-between items-center py-3 md:py-4 px-3 md:px-6
                                            border-b border-gray-200 last:border-b-0 
                                            hover:bg-gray-100 dark:hover:bg-[#333] transition-all cursor-pointer
                                            ${selectedProject?.id === project.id ? 'bg-gray-100 dark:bg-[#333]' : ''}
                                            ${index >= 3 ? 'mt-4' : ''}
                                        `}
                                        onClick={() => setSelectedProject(project)}
                                        onMouseEnter={() => setIsHovering(true)}
                                        onMouseLeave={() => setIsHovering(false)}
                                    >
                                        <h3 className="text-lg md:text-xl lg:text-2xl xl:text-2xl font-light tracking-tight">{project.title}</h3>
                                        <span className="text-sm text-gray-500 ml-4">{project.category}</span>
                                    </div>
                                ))}
                                {canScroll && (
                                    <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#f4f1ec] to-transparent pointer-events-none dark:from-[#1A1A1A] dark:to-transparent" />
                                )}
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Project Details */}
                    <AnimatePresence mode="wait">
                        {selectedProject && (
                            <motion.div
                                ref={projectDetailsRef}
                                key={selectedProject.id}
                                initial={isMobile ? { opacity: 0, y: 20 } : { opacity: 0, x: -50 }}
                                animate={isMobile ? { opacity: 1, y: 0 } : { opacity: 1, x: 0 }}
                                exit={isMobile ? { opacity: 0, y: 20 } : { opacity: 0, x: -50 }}
                                transition={{ duration: 0.3 }}
                                className={`
                                    p-4 md:p-6 shadow-lg overflow-y-auto scrollbar-hide
                                    bg-white/90 dark:bg-[#333] backdrop-blur-sm z-index-10
                                    ${isMobile
                                        ? 'w-full relative'
                                        : 'w-[45%] absolute right-0 bottom-0 ml-8'}
                                `}
                                style={{
                                    maxHeight: isMobile ? 'calc(100vh - 300px)' : '40vh',
                                }}
                            >
                                <button
                                    onClick={() => setSelectedProject(null)}
                                    className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
                                    onMouseEnter={() => setIsHovering(true)}
                                    onMouseLeave={() => setIsHovering(false)}
                                >
                                    <X size={24} className="text-gray-500 hover:text-gray-700" />
                                </button>

                                <div className="space-y-4 md:space-y-6 pb-6">
                                    <div>
                                        <h3 className="text-lg md:text-xl lg:text-2xl font-semibold mb-2">{selectedProject.title}</h3>
                                        <p className="text-gray-600 dark:text-gray-300 text-sm md:text-base">{selectedProject.description}</p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="inline-block px-3 py-1 rounded-full bg-[#e0dcd4] text-sm text-gray-600">
                                            {selectedProject.category}
                                        </div>
                                        <div className="flex flex-wrap gap-2">
                                            {selectedProject.techno.split(', ').map((tech, index) => (
                                                <div key={index} className="inline-block px-3 py-1 rounded-full bg-[#e0dcd4] text-sm text-gray-600">
                                                    {tech}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    {selectedProject.websiteUrl && (
                                        <div className="mt-4">
                                            <a
                                                href={selectedProject.websiteUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center px-4 py-2 bg-[#333] text-white rounded-md hover:bg-[#444] transition-colors dark:bg-[#e0dcd4] dark:text-[#333] dark:hover:bg-[#d3cfc6]"
                                                onMouseEnter={() => setIsHovering(true)}
                                                onMouseLeave={() => setIsHovering(false)}
                                            >
                                                <ExternalLink size={18} className="mr-2" />
                                                Aller sur le site
                                            </a>
                                        </div>
                                    )}
                                    <p className="text-gray-700 dark:text-gray-400 leading-relaxed text-sm md:text-base">
                                        {selectedProject.text}
                                    </p>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-6">
                                        {selectedProject.images.map((image, index) => (
                                            <div key={index} className="relative aspect-video rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow">
                                                <Image
                                                    src={image}
                                                    alt={`${selectedProject.title} - Image ${index + 1}`}
                                                    className="w-full h-full object-cover"
                                                    width={500}
                                                    height={300}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

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