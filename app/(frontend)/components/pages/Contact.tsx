import React from 'react'
import { Mail, Linkedin, Github } from 'lucide-react'
import type { ContactContent } from '@/lib/payload-client'

interface ContactProps {
  content: ContactContent
  setIsHovering: (isHovering: boolean) => void
}

const Contact: React.FC<ContactProps> = ({ content, setIsHovering }) => {
  return (
    <section className="mb-20">
      <h2 className="text-3xl md:text-4xl mb-8 tracking-tighter">{content.title}</h2>
      <p className="text-lg mb-6 w-full md:w-2/3 lg:w-1/2 whitespace-pre-line">{content.text}</p>
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
        <a
          href={`mailto:${content.email}`}
          className="group inline-flex items-center transition-colors"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <Mail className="w-5 h-5 text-gray-600 transition-colors group-hover:text-[#999] dark:group-hover:text-[#888] dark:text-[#666]" />
          <span className="ml-2 text-lg text-gray-600 transition-colors group-hover:text-[#999] break-all sm:break-normal dark:group-hover:text-[#888] dark:text-[#666]">
            {content.email}
          </span>
        </a>
        <div className="flex items-center gap-4 sm:ml-20">
          <a
            href={content.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group p-2 rounded-full hover:bg-gray-100 transition-colors"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <Linkedin className="w-8 h-8 text-gray-600 transition-colors group-hover:text-[#999] dark:group-hover:text-[#666] dark:text-[#666]" />
            <span className="sr-only">LinkedIn Profile</span>
          </a>
          <a
            href={content.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group p-2 rounded-full hover:bg-gray-100 transition-colors"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <Github className="w-8 h-8 text-gray-600 transition-colors group-hover:text-[#999] dark:group-hover:text-[#666] dark:text-[#666]" />
            <span className="sr-only">GitHub Profile</span>
          </a>
        </div>
      </div>
    </section>
  )
}

export default Contact
