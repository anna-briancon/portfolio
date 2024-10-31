import React from 'react'
import { Mail, Linkedin, Github } from 'lucide-react'

interface ContactProps {
    setIsHovering: (isHovering: boolean) => void
}

const Contact: React.FC<ContactProps> = ({ setIsHovering }) => {
    return (
        <section className="mb-20">
            <h2 className="text-4xl mb-8 tracking-tighter">Contactez-moi</h2>
            <p className="text-lg mb-6 w-full md:w-2/3 lg:w-1/2">
                Je suis toujours ouverte à de nouvelles opportunités et collaborations. N&apos;hésitez pas à me contacter
                si vous souhaitez travailler ensemble ou simplement dire bonjour.
            </p>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
                <a
                    href="mailto:anna.briancon33@gmail.com"
                    className="group inline-flex items-center transition-colors"
                    onMouseEnter={() => setIsHovering(true)}
                    onMouseLeave={() => setIsHovering(false)}
                >
                    <Mail className="w-5 h-5 text-gray-600 transition-colors group-hover:text-[#999] dark:group-hover:text-[#888] dark:text-[#666]" />
                    <span className="ml-2 text-lg text-gray-600 transition-colors group-hover:text-[#999] break-all sm:break-normal dark:group-hover:text-[#888] dark:text-[#666]">
                        anna.briancon33@gmail.com
                    </span>
                </a>
                <div className="flex items-center gap-4 sm:ml-20">
                    <a
                        href="https://www.linkedin.com/in/anna-briancon"
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
                        href="https://github.com/anna-briancon"
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