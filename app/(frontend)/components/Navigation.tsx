"use client"

import React, { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'

interface NavigationProps {
    sections: string[]
    currentSection: string
    setCurrentSection: (section: string) => void
    setIsHovering: (isHovering: boolean) => void
    isDarkMode: boolean
    setIsDarkMode: (isDarkMode: boolean) => void
}

const Navigation: React.FC<NavigationProps> = ({
    sections,
    currentSection,
    setCurrentSection,
    setIsHovering,
    isDarkMode,
    setIsDarkMode,
}) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [shouldShowBurger, setShouldShowBurger] = useState(false)

    const handleNavClick = (section: string) => {
        setCurrentSection(section)
        setIsMenuOpen(false)
    }

    useEffect(() => {
        const checkMobileAndScroll = () => {
            const isMobile = window.innerWidth < 768
            const hasScrolledContent = window.scrollY > 100
            setShouldShowBurger(isMobile && hasScrolledContent)
        }

        checkMobileAndScroll()
        window.addEventListener('scroll', checkMobileAndScroll)
        window.addEventListener('resize', checkMobileAndScroll)
        const timer = setTimeout(checkMobileAndScroll, 100)

        return () => {
            window.removeEventListener('scroll', checkMobileAndScroll)
            window.removeEventListener('resize', checkMobileAndScroll)
            clearTimeout(timer)
        }
    }, [currentSection])

    return (
        <>
            {shouldShowBurger && (
                <button
                    className="fixed top-6 right-6 md:top-12 md:right-12 z-50 p-2"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    onMouseEnter={() => setIsHovering(true)}
                    onMouseLeave={() => setIsHovering(false)}
                    aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                >
                    {isMenuOpen ? (
                        <X className="w-6 h-6 text-gray-800" />
                    ) : (
                        <Menu className="w-6 h-6 text-gray-800" />
                    )}
                </button>
            )}

            <div
                className="fixed z-40 top-10 md:top-20 left-10 md:left-20 flex items-center gap-2"
                role="group"
                aria-label="Thème"
            >
                <button
                    type="button"
                    onClick={() => setIsDarkMode(false)}
                    onMouseEnter={() => setIsHovering(true)}
                    onMouseLeave={() => setIsHovering(false)}
                    className={`
                        text-sm uppercase tracking-wider transition-colors hover:text-[#999]
                        ${!isDarkMode ? 'text-[#999]' : 'opacity-50'}
                    `}
                    aria-pressed={!isDarkMode}
                >
                    clair
                </button>
                <span className="text-sm opacity-30" aria-hidden>
                    /
                </span>
                <button
                    type="button"
                    onClick={() => setIsDarkMode(true)}
                    onMouseEnter={() => setIsHovering(true)}
                    onMouseLeave={() => setIsHovering(false)}
                    className={`
                        text-sm uppercase tracking-wider transition-colors hover:text-[#999]
                        ${isDarkMode ? 'text-[#999]' : 'opacity-50'}
                    `}
                    aria-pressed={isDarkMode}
                >
                    sombre
                </button>
            </div>

            <nav className={`
                fixed z-40 
                ${isMenuOpen
                    ? `inset-2 md:inset-9 flex items-center justify-center ${isDarkMode ? 'bg-[#1a1a1a]' : 'bg-[#f3ebe1]'}`
                    : shouldShowBurger
                        ? 'hidden'
                        : 'top-10 md:top-20 right-10 md:right-20 block'}
            `}>
                <ul className={`
                    flex flex-col items-end space-y-4
                    ${isMenuOpen ? 'items-center space-y-8' : ''}
                `}>
                    {sections.map((section) => (
                        <li key={section}>
                            <button
                                onClick={() => handleNavClick(section)}
                                onMouseEnter={() => setIsHovering(true)}
                                onMouseLeave={() => setIsHovering(false)}
                                className={`
                                    text-sm uppercase tracking-wider transition-colors
                                    hover:text-[#999]
                                    ${currentSection === section ? "text-[#999]" : ""}
                                    ${isMenuOpen ? 'text-xl py-2 px-4' : ''}
                                `}
                            >
                                {section}
                            </button>
                        </li>
                    ))}
                </ul>
            </nav>

            {isMenuOpen && (
                <div
                    className="fixed inset-2 md:inset-9 bg-black bg-opacity-50 z-30"
                    onClick={() => setIsMenuOpen(false)}
                />
            )}
        </>
    )
}

export default Navigation