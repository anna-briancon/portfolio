"use client"

import React, { useState } from 'react'
import Image from 'next/image'
import {
  Code,
  FileCode,
  Terminal,
  GitBranch,
  Image as ImageIcon,
  Monitor,
  Database,
  Server,
  type LucideIcon,
} from 'lucide-react'
import type { AboutContent } from '@/lib/payload-client'

const iconMap: Record<string, LucideIcon> = {
  Code,
  FileCode,
  Terminal,
  GitBranch,
  Image: ImageIcon,
  Monitor,
  Database,
  Server,
}

interface AboutProps {
  content: AboutContent
}

const About: React.FC<AboutProps> = ({ content }) => {
  const [isHovered, setIsHovered] = useState(false)
  const skillGroups = content.skillGroups

  return (
    <section className="mb-10 relative">
      <div
        className={`w-[120px] h-[120px] sm:w-[160px] sm:h-[160px] transition-transform duration-500 ease-in-out mb-8 cursor-pointer shrink-0 ${
          isHovered ? 'rotate-y-180' : ''
        }`}
        style={{ transformStyle: 'preserve-3d' }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="absolute w-full h-full backface-hidden rounded-full overflow-hidden border-2 border-gray-300">
          <Image
            src={content.photoFront}
            alt="Anna Briançon"
            fill
            className="object-cover"
            sizes="160px"
            priority
          />
        </div>
        <div className="absolute w-full h-full backface-hidden rounded-full overflow-hidden border-2 border-gray-300 rotate-y-180">
          <Image
            src={content.photoBack}
            alt="Anna Briançon"
            fill
            className="object-cover"
            sizes="160px"
            priority
          />
        </div>
      </div>
      <div className="flex flex-col md:flex-row items-start gap-8 md:gap-16">
        <div className="flex-grow">
          <h2 className="text-3xl md:text-4xl mb-8 tracking-tighter">{content.title}</h2>
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-32">
            <div className="w-full lg:max-w-xl">
              {content.paragraphs.map((paragraph, index) => (
                <p key={index} className="text-lg mb-6 whitespace-pre-line">
                  {paragraph.text}
                </p>
              ))}
            </div>
            {skillGroups.length > 0 && (
              <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  {skillGroups.slice(0, Math.ceil(skillGroups.length / 2)).map((category) => (
                    <div key={category.name} className="mb-6 md:mb-4">
                      <h4 className="text-lg font-semibold mb-3 md:mb-2 tracking-tight">
                        {category.name}
                      </h4>
                      <div className="grid grid-cols-2 gap-3 md:gap-2">
                        {category.tools.map((tool) => {
                          const Icon = iconMap[tool.icon] || Code
                          return (
                            <div key={tool.name} className="flex items-center space-x-2">
                              <Icon className="w-5 h-5" />
                              <span className="text-sm">{tool.name}</span>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  ))}
                </div>
                <div>
                  {skillGroups.slice(Math.ceil(skillGroups.length / 2)).map((category) => (
                    <div key={category.name} className="mb-6 md:mb-4">
                      <h4 className="text-lg font-semibold mb-3 md:mb-2 tracking-tight">
                        {category.name}
                      </h4>
                      <div className="grid grid-cols-2 gap-3 md:gap-2">
                        {category.tools.map((tool) => {
                          const Icon = iconMap[tool.icon] || Code
                          return (
                            <div key={tool.name} className="flex items-center space-x-2">
                              <Icon className="w-5 h-5" />
                              <span className="text-sm">{tool.name}</span>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
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
