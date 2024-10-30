import { Code, FileCode, Terminal, GitBranch, Image, Monitor, Database, Server } from "lucide-react"

export const toolCategories = [
    {
        name: "Frontend",
        tools: [
            { name: "HTML", icon: FileCode },
            { name: "CSS", icon: FileCode },
            { name: "JavaScript", icon: FileCode },
            { name: "React", icon: Code },
            { name: "Vue.js", icon: Code },
        ]
    },
    {
        name: "Backend",
        tools: [
            { name: "Java", icon: FileCode },
            { name: "C#", icon: FileCode },
            { name: "PHP", icon: FileCode },
            { name: "Python", icon: FileCode },
            { name: "SQL", icon: Database },
            { name: "Node.js", icon: Server },
        ]
    },
    {
        name: "Autres langages",
        tools: [
            { name: "C++", icon: FileCode },
            { name: "C", icon: FileCode },
            { name: "Bash", icon: Terminal },
        ]
    },
    {
        name: "Outils",
        tools: [
            { name: "GIT", icon: GitBranch },
            { name: "VS Code", icon: Code },
            { name: "NetBeans", icon: Monitor },
            { name: "VMware", icon: Server },
            { name: "Photoshop", icon: Image },
            { name: "Processing", icon: Code },
        ]
    }
]