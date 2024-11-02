"use client"

import React, { useState } from 'react'
import Image from 'next/image'

interface Tool {
    name: string
    icon: React.ElementType
}

interface ToolCategory {
    name: string
    tools: Tool[]
}

interface AboutProps {
    toolCategories: ToolCategory[]
}

const About: React.FC<AboutProps> = ({ toolCategories }) => {
    const [isHovered, setIsHovered] = useState(false)

    return (
        <section className="mb-10 relative">
            <div
                className={`w-[120px] h-[120px] sm:w-[160px] sm:h-[160px] transition-transform duration-500 ease-in-out mb-8 cursor-pointer shrink-0 ${isHovered ? 'rotate-y-180' : ''
                    }`}
                style={{ transformStyle: 'preserve-3d' }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <div className="absolute w-full h-full backface-hidden rounded-full overflow-hidden border-2 border-gray-300">
                    <Image
                        src="/profilMD.jpg"
                        alt="Anna Briançon"
                        layout="fill"
                        objectFit="cover"
                        priority
                    />
                </div>
                <div className="absolute w-full h-full backface-hidden rounded-full overflow-hidden border-2 border-gray-300 rotate-y-180">
                    <Image
                        src="/profil.jpeg"
                        alt="Anna Briançon"
                        layout="fill"
                        objectFit="cover"
                        priority
                    />
                </div>
            </div>
            <div className="flex flex-col md:flex-row items-start gap-8 md:gap-16">

                <div className="flex-grow">
                    <h2 className="text-4xl mb-8 tracking-tighter">À Propos de Moi</h2>
                    <div className="flex flex-col lg:flex-row gap-8 lg:gap-32">
                        <div className="w-full lg:max-w-xl">
                            <p className="text-lg mb-6">
                                Je m&apos;appelle Anna Briançon, je suis actuellement en formation de développeuse Fullstack à MyDigitalSchool Annecy. 
                                Passionnée par l&apos;informatique, le design et la photographie, j'aime mettre mes compétences et mon énergie dans chaque projet.
                            </p>
                            <p className="text-lg mb-6">
                                Au quotidien, j&apos;utilise des outils comme <strong>React</strong> et <strong>Vue</strong> pour concevoir des interfaces fluides et <strong>Symfony</strong> et <strong>Node.js</strong> pour le backend. Mon objectif est de concevoir des applications web qui soient à la fois esthétiques et performantes, pour offrir des expériences uniques.
                            </p>
                        </div>
                        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div>
                                {toolCategories.slice(0, 2).map((category) => (
                                    <div key={category.name} className="mb-6 md:mb-4">
                                        <h4 className="text-lg font-semibold mb-3 md:mb-2 tracking-tight">{category.name}</h4>
                                        <div className="grid grid-cols-2 gap-3 md:gap-2">
                                            {category.tools.map((tool) => (
                                                <div key={tool.name} className="flex items-center space-x-2">
                                                    <tool.icon className="w-5 h-5" />
                                                    <span className="text-sm">{tool.name}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div>
                                {toolCategories.slice(2).map((category) => (
                                    <div key={category.name} className="mb-6 md:mb-4">
                                        <h4 className="text-lg font-semibold mb-3 md:mb-2 tracking-tight">{category.name}</h4>
                                        <div className="grid grid-cols-2 gap-3 md:gap-2">
                                            {category.tools.map((tool) => (
                                                <div key={tool.name} className="flex items-center space-x-2">
                                                    <tool.icon className="w-5 h-5" />
                                                    <span className="text-sm">{tool.name}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <style jsx global>{`
                .backface-hidden {
                    backface-visibility: hidden;
                }
                .rotate-y-180 {
                    transform: rotateY(180deg);
                }
            `}</style>
        </section>
    )
}

export default About