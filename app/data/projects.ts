interface Project {
    id: number;
    title: string;
    category: string;
    techno: string;
    description: string;
    text: string;
    images: string[];
    websiteUrl: string | null;
}

export const projects: Project[] = [
    {
        id: 1,
        title: "Infographie Maincare",
        category: "Autre",
        techno: "Canva, Internet",
        description: "Réalisation d'une infographie sur une entreprise de notre choix.",
        text: "Une infographie sur l'entreprise Maincare.",
        images: ["/projets/affichemaincare.png"],
        websiteUrl: null
    },
    {
        id: 2,
        title: "Effet du numérique sur l'environnement",
        category: "Autre",
        techno: "Canva, Internet",
        description: "Recherche sur l'impact du numérique sur l'environnement et réalisation d'un poster.",
        text: "Un poster mettant en avant l'impact du numérique sur l'environnement.",
        images: ["/projets/affichenumerique.png"],
        websiteUrl: null
    },
    {
        id: 3,
        title: "Lowatem",
        category: "Algorithmique",
        techno: "Java, Netbeans",
        description: "Création de niveaux pour un jeu existant et conception d'une intelligence artificielle.",
        text: "Réalisation de 10 niveaux pour un jeu existant et mise en place d'une IA compétente capable de sélectionner des coups maximisant les dégâts infligés à l'adversaire.",
        images: ["/projets/lowatem.png"],
        websiteUrl: null
    },
    {
        id: 4,
        title: "Pong",
        category: "Algorithmique",
        techno: "Java, Processing, Mathématiques et Logique",
        description: "Réalisation d'un jeu Pong avec des fonctionnalités avancées.",
        text: "Développement d'un jeu Pong fonctionnel avec des fonctionnalités avancées telles qu'un mode 4 joueurs, un mode 4 balles, un mode pause, l'ajout d'obstacles et de vortex permettant aux balles de se téléporter. Et la création d'un menu.",
        images: ["/projets/pong.png"],
        websiteUrl: null
    },
    {
        id: 5,
        title: "Installation de Poste",
        category: "Réseaux",
        techno: "VMWare, Rust, Rust-analyzer, Bash, Git, Xubuntu, Vscode",
        description: "Installation complète d'une machine virtuelle Linux.",
        text: "Installation de logiciels tels que Vscode, Rust, un bureau XFCE, et Git sur une machine virtuelle Linux.",
        images: ["/projets/installationposte.png"],
        websiteUrl: null
    },
    {
        id: 6,
        title: "Automatisation de Page Web",
        category: "Réseaux",
        techno: "Bash, HTML5, CSS3",
        description: "Création d'un script automatisé générant des pages web à partir d'un storyboard préétabli.",
        text: "Réalisation d'un script Bash fonctionnel permettant la création automatisée de pages web. Le fonctionnement du script est représenté à l'aide d'un schéma explicatif.",
        images: ["/projets/automatisation.png"],
        websiteUrl: null
    },
    {
        id: 7,
        title: "Beer&Bear",
        category: "Web",
        techno: "Html, CSS",
        description: "Réalisation d'un site pour une entreprise fictive. Un site ergonomique, au goût du jour et adapté à toutes tailles d'écran.",
        text: "Réalisation d'un site pour une entreprise fictive, Beer&Bear, avec une page d'accueil, une page de présentation de l'entreprise, une page de présentation des produits et une page de contact.",
        images: ["/projets/b&b.png"],
        websiteUrl: "https://anna-briancon.github.io/Beer-Bear/"
    },
    {
        id: 8,
        title: "6 qui prend",
        category: "Algorithmique",
        techno: "C#, Visual Studio",
        description: 'Projet en groupe pour réaliser le jeu "6 qui prend !" avec une interface graphique.',
        text: "Jeu réalisé en C# avec la possibilité pour les joueurs de jouer à plusieurs sur un même ordinateur.",
        images: ["/projets/6quiprend.png"],
        websiteUrl: null
    },
    {
        id: 9,
        title: "Café Pierre",
        category: "Web",
        techno: "Html, CSS, Javascript, Python",
        description: "Conception d'un site web de schémas sur l'environnement en groupe.",
        text: "Réalisation d'un site web de schémas sur l'environnement en groupe. Création d'un script python générant des graphiques, organisation d'une équipe, gestion de projet.",
        images: ["/projets/cafepierre.png", "/projets/cafepierre2.png", "/projets/cafepierre3.png"],
        websiteUrl: null
    },
    {
        id: 10,
        title: "Grave & cie",
        category: "Base de donnée",
        techno: "Win design, SQL",
        description: "Projet visant à proposer une solution d'organisation d'inventaire pour une entreprise fictive de négoce Bordelais.",
        text: "Réalisation d'un Modèle Conceptuel des Données (MCD) et d'un script de création de base de données. Élaboration de requêtes SQL, conception d'une maquette d'application avec ses fonctionnalités.",
        images: ["/projets/graveetcie.png"],
        websiteUrl: null
    },
    {
        id: 11,
        title: "AndaLima",
        category: "Web",
        techno: "Html, CSS, Javascript",
        description: "Réalisation d'un site web vitrine en collaboration avec des élèves d'une école de restauration hôtellerie.",
        text: "Réalisation d'un site web vitrine pour un restaurant fictif, AndaLima, en collaboration avec des élèves d'une école de restauration hôtellerie.",
        images: ["/projets/andalima.png"],
        websiteUrl: "https://anna-briancon.github.io/AndaLima/"
    },
    {
        id: 12,
        title: "Labyrinthe",
        category: "Algorithmique",
        techno: "Java, Netbeans",
        description: "Projet de jeu de labyrinthe mettant en scène un joueur et des monstres.",
        text: "Réalisation d'un jeu interactif permettant au joueur de naviguer à travers un labyrinthe, avec la présence de monstres ajoutant un élément de défi au jeu.",
        images: ["/projets/labyrinthe.png"],
        websiteUrl: null
    },
    {
        id: 13,
        title: "Photos",
        category: "Web",
        techno: "HTML, Javascript, CSS",
        description: "Site web permettant à chaque utilisateur de découvrir mes photos et de me contacter.",
        text: "Site web fonctionnel permettant de parcourir une galerie de photos, de rentrer en contact avec moi et d'afficher les photos sur une carte.",
        images: ["/projets/photo.png", "/projets/photo2.png", "/projets/photo3.png"],
        websiteUrl: "https://anna-briancon.github.io/photo/"
    },
    {
        id: 14,
        title: "Bibliothèque",
        category: "Web",
        techno: "React, Axios",
        description: "Interrogation de l'API Google Books avec une application React permettant de rechercher des livres.",
        text: "Une application permettant de rechercher des livres sur l'API Google Books, affichage des résultats de la recherche par auteur, possibilité de voir les détails d'un livre, gestion de la pagination, possibilité de suivre des abonnés.",
        images: ["/projets/bibliotheque.png", "/projets/bibliotheque2.png", "/projets/bibliotheque3.png"],
        websiteUrl: null
    },
    {
        id: 15,
        title: "Netflop",
        category: "Web",
        techno: "Symfony, TailwindCSS, méthode scrum, UI/UX design",
        description: "Application web permettant à chaque utilisateur de suivre les séries qu'il regarde ou d'en découvrir.",
        text: "Application fonctionnant avec une base de données remplie grâce à l'API OMDB, affichage et ajout de données venant des utilisateurs, gestion des comptes utilisateurs.",
        images: ["/projets/netflop.png", "/projets/netflop2.png", "/projets/netflop3.png"],
        websiteUrl: null
    },
    {
        id: 16,
        title: "QueryBot",
        category: "Web",
        techno: "Next.js 14, React 18, TypeScript, Tailwind CSS, Groq API, Lucide React",
        description: "Assistant de recherche IA avec multiples spécialisations utilisant l'API Groq pour la génération de contenu.",
        text: "Application web utilisant Next.js 14 avec App Router, React 18, et TypeScript. Intègre l'API Groq pour le traitement du langage naturel et la génération de réponses. Utilise Tailwind CSS pour un design responsive, shadcn/ui pour des composants réutilisables, et Lucide React pour les icônes. Fonctionnalités incluent multiples assistants spécialisés, génération de contenu basée sur l'IA, et export des résultats en PDF.",
        images: ["/projets/querybot.png", "/projets/querybot2.png", "/projets/querybot3.png"],
        websiteUrl: "https://querybot-eight.vercel.app/"
    }
];

export default projects;