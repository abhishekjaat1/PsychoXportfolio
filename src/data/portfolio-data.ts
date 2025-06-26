import { PortfolioData } from '../types';

export const initialPortfolioData: PortfolioData = {
  about: {
    text: "Hey, I'm Rohit Sharma (Coderrohit). Based in Delhi, my web development journey started in 8th grade. Fascinated by hacker movies, I discovered web programming and turned that curiosity into a passion for creating digital experiences.",
    skills: [
      "React", "Next.js", "React Native", "Node.js", "TypeScript",
      "Python", "Flask", "MongoDB",
      "Git", "Figma", "WordPress",
     "Web Scraping", "Firebase", "SaaS Development",
      "SEO Optimization", "UI/UX Design", "Automation Scripting",
      "Linux",
    ]
    
  },
  services: [
    {
      id: "web-dev",
      title: "Web Development",
      description: "Creating responsive, modern websites and web applications using cutting-edge technologies.",
      icon: "Globe"
    },
    {
      id: "app-dev", 
      title: "App Development",
      description: "Building cross-platform mobile applications with seamless user experiences.",
      icon: "Smartphone"
    },
    {
      id: "security",
      title: "Security & Networking",
      description: "Specialized in network security, penetration testing, and cybersecurity solutions.",
      icon: "Shield"
    }
  ],
  projects: [
    {
      id: "project-1",
      title: "Introcate",
      techStack: ["Next.js"],
      description: "A SMMA (Social Media Marketing Agency) website built with Next.js.",
      link: "https://www.introcate.com/",
      github: "https://github.com/hackhaveli/Introcate" // Add this line
    },
    {
      id: "project-2",
      title: "Rebel Up",
      techStack: ["Framer"],
      description: "A SMMA (Social Media Marketing Agency) website built with Framer.",
      link: "https://rebel-up.vercel.app/",
      github: "https://github.com/hackhaveli/RebelUp" // Add this line
    },
    {
      id: "project-3",
      title: "Wall of Gardens",
      techStack: ["WordPress"],
      description: "A company website focused on vertical gardening, landscaping, and terrace gardening, built using WordPress.",
      link: "https://wallofgardens.com"
    },
    {
      id: "project-4",
      title: "Lumex Store",
      techStack: ["WordPress"],
      description: "An e-commerce platform for selling tech products and fashion items, built using WordPress.",
      link: "https://lumexstore.in"
    },
    {
      id: "project-5",
      title: "WebKarigar",
      techStack: ["Next.js", "Custom Backend", "Payment Integration"],
      description: "A SaaS product built with Next.js and a custom backend, featuring payment integration.",
      link: "https://webkarigar.vercel.app",
      github: "https://github.com/hackhaveli/WebKarigar" // Add this line
    },
    {
      id: "project-6",
      title: "Page3 Shadisaga Wedding",
      techStack: ["WordPress"],
      description: "An event organization website built with WordPress.",
      link: "https://page3shadisagawedding.com"
    },
    {
      id: "project-7",
      title: "Tushar Pant PMT Classes",
      techStack: ["WordPress"],
      description: "A coaching website for PMT classes, built using WordPress.",
      link: "https://tusharpantpmtclasses.in"
    },
    {
      id: "project-8",
      title: "Rohit Sport (Portfolio)",
      techStack: ["React.js"],
      description: "A personal portfolio website built using React.js.",
      link: "https://rohitsport.vercel.app",
      github: "https://github.com/hackhaveli/RohitSport" // Add this line
    },
    {
      id: "project-9",
      title: "Premium App Downloader",
      techStack: ["React Native", "Expo"],
      description: "An app that allows users to browse and download premium apps across categories. Built using React Native with a modern UI and preview feature.",
      link: "https://www.mediafire.com/file/451i03ahpyzw20n/YouHub.apk/file?fbclid=PAZXh0bgNhZW0CMTEAAae9Pof5VAA7nVXJb5UrBBnzQzEaa4MEbzOUztEvHbwwUUFJdp_ulgbdTtBSdA_aem_PxBksza_KkWXlhZZEdsgBg",
      github: "https://github.com/hackhaveli/youhub"
    },
    {
      id: "project-10",
      title: "Photography Site",
      techStack: ["HTML", "CSS", "JavaScript"],
      description: "A clean and aesthetic photography showcase website built using HTML, CSS, and JS.",
      link: "https://photosgraphy-site.vercel.app/index.html",
      github: "https://github.com/hackhaveli/photosgraphy-site"
    },
    {
      id: "project-11",
      title: "Mountain Spring App",
      techStack: ["React Native", "Expo"],
      description: "A mobile wellness app built with Expo, focusing on hydration reminders and clean UI.",
      link: "https://example.com/mountain-spring-app", // Add the actual live demo URL here
      github: "https://github.com/hackhaveli/Well-app"
    },
    {
      id: "project-12",
      title: "BTrader",
      techStack: ["Next.js"],
      description: "A modern trading platform targeted at helping solo traders who are often left behind.",
      link: "https://btrader.vercel.app/",
      github: "https://github.com/hackhaveli/B-trader"
    }
  ],
  contact: {
    whatsapp: "https://wa.me/+919311459543",
    email: "mailto:coderrohit2927@gmail.com",
    github: "https://github.com/hackhaveli",
    youtube: "https://www.youtube.com/@codewithrohit2927",
    instagram: "https://instagram.com/rohit.env"
  },
  
};

// Simple storage functions
export const getPortfolioData = (): PortfolioData => {
  const stored = localStorage.getItem('portfolioData');
  return stored ? JSON.parse(stored) : initialPortfolioData;
};

export const savePortfolioData = (data: PortfolioData): void => {
  localStorage.setItem('portfolioData', JSON.stringify(data));
};
