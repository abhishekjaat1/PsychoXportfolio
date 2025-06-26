export interface PortfolioData {
  about: {
    text: string;
    skills: string[];
  };
  services: Service[];
  projects: Project[];
  contact: ContactInfo;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface Project {
  id: string;
  title: string;
  techStack: string[];
  description: string;
  link: string;
  github?: string; // Optional GitHub repository URL
}

export interface ContactInfo {
  whatsapp: string;
  email: string;
  github: string;
  youtube: string;
  instagram: string;
}