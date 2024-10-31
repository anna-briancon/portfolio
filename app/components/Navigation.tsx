"use client"

import React, { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'

interface NavigationProps {
    sections: string[]
    currentSection: string
    setCurrentSection: (section: string) => void
    setIsHovering: (isHovering: boolean) => void
}

const Navigation: React.FC<NavigationProps> = ({ sections, currentSection, setCurrentSection, setIsHovering }) => {
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

            <nav className={`
                fixed z-40 
                ${isMenuOpen
                    ? 'inset-2 md:inset-9 bg-[#f4f1ec] flex items-center justify-center'
                    : shouldShowBurger
                        ? 'hidden'
                        : 'top-10 md:top-20 right-10 md:right-20 block'}
            `}>
                <ul className={`
                    flex flex-col items-end space-y-4
                    ${isMenuOpen && 'items-center space-y-8'}
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