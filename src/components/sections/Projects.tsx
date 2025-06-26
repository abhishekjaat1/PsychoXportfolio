import React from 'react';
import { ExternalLink, Github } from 'lucide-react';
import { PortfolioData } from '../../types';

interface ProjectsProps {
  data: PortfolioData;
}

const Projects: React.FC<ProjectsProps> = ({ data }) => {
  return (
    <section id="projects" className="py-20 bg-gradient-to-br from-[#0a0a0a] to-[#040404]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[#22c825] mb-4">
            Projects
          </h2>
          <div className="w-24 h-1 bg-[#22c825] mx-auto"></div>
          <p className="text-[#c9c1c0] mt-6 text-lg max-w-2xl mx-auto">
            A showcase of my recent work and contributions
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.projects.map((project) => (
            <div
              key={project.id}
              className="group bg-gradient-to-br from-[#0a0a0a] to-[#1a1a1a] rounded-2xl border border-[#22c825]/20 hover:border-[#22c825]/50 transition-all duration-500 overflow-hidden hover:transform hover:scale-105 hover:shadow-2xl hover:shadow-[#22c825]/10"
            >
              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-[#c9c1c0] group-hover:text-[#22c825] transition-colors duration-300">
                    {project.title}
                  </h3>
                  <div className="flex space-x-2">
                    {project.github && (
                      <a 
                        href={project.github} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-[#22c825] transition-colors duration-200"
                        aria-label="View on GitHub"
                      >
                        <Github className="h-5 w-5" />
                      </a>
                    )}
                    <a 
                      href={project.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-[#22c825] transition-colors duration-200"
                      aria-label="View Live Project"
                    >
                      <ExternalLink className="h-5 w-5" />
                    </a>
                  </div>
                </div>

                <p className="text-gray-400 text-sm leading-relaxed">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-3 py-1 bg-[#22c825]/20 text-[#22c825] rounded-full text-xs font-medium border border-[#22c825]/30"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="pt-4">
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 bg-gradient-to-r from-[#22c825] to-[#1ea01f] text-[#040404] px-4 py-2 rounded-lg font-medium hover:shadow-lg hover:shadow-[#22c825]/30 transition-all duration-300 transform hover:scale-105"
                  >
                    <span>View Project</span>
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;