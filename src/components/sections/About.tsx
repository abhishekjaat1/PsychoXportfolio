import React, { useState, useEffect, useRef } from 'react';
import { Code, Zap, Target, Award, TrendingUp, Users } from 'lucide-react';
import { PortfolioData } from '../../types';

interface AboutProps {
  data: PortfolioData;
}

const About: React.FC<AboutProps> = ({ data }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('skills');
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const tabs = [
    { id: 'skills', label: 'Skills', icon: Code },
    { id: 'experience', label: 'Experience', icon: TrendingUp },
    { id: 'achievements', label: 'Achievements', icon: Award }
  ];

  const experiences = [
    { year: '2023-Present', role: 'Senior Full Stack Developer', company: 'Tech Solutions Inc.' },
    { year: '2022-2023', role: 'Frontend Developer', company: 'Digital Agency' },
    { year: '2021-2022', role: 'Junior Developer', company: 'StartUp Hub' }
  ];

  const achievements = [
    { title: 'Best Developer Award', year: '2023', description: 'Outstanding performance in full-stack development' },
    { title: 'Security Certification', year: '2022', description: 'Certified Ethical Hacker (CEH)' },
    { title: 'Open Source Contributor', year: '2021', description: 'Active contributor to major React projects' }
  ];

  return (
    <section id="about" ref={sectionRef} className="py-24 bg-gradient-to-br from-[#0a0a0a] via-[#040404] to-[#0a0a0a] relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#22c825]/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className={`text-center mb-20 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="inline-flex items-center space-x-2 bg-[#22c825]/10 px-4 py-2 rounded-full border border-[#22c825]/30 mb-6">
            <Users className="h-4 w-4 text-[#22c825]" />
            <span className="text-[#22c825] font-medium">Get to know me</span>
          </div>
          
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-[#22c825] via-[#22c825] to-[#1ea01f] bg-clip-text text-transparent">
              About Me
            </span>
          </h2>
          
          <div className="w-32 h-1 bg-gradient-to-r from-[#22c825] to-[#1ea01f] mx-auto rounded-full"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left Column - Story */}
          <div className={`space-y-8 transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}>
            <div className="space-y-6">
              <h3 className="text-3xl font-bold text-[#c9c1c0] flex items-center space-x-3">
                <Target className="h-8 w-8 text-[#22c825]" />
                <span>My Journey</span>
              </h3>
              
              <div className="prose prose-lg text-gray-300 leading-relaxed space-y-4">
                <p className="text-lg">
                  {data.about.text}
                </p>
                
                <p className="text-lg">
                  My passion lies in creating <span className="text-[#22c825] font-semibold">seamless digital experiences</span> 
                  that solve real-world problems. I believe in writing clean, maintainable code and staying updated 
                  with the latest technologies.
                </p>
              </div>
            </div>

            {/* Key Highlights */}
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-[#22c825]/20 to-[#22c825]/5 p-6 rounded-2xl border border-[#22c825]/30 hover:border-[#22c825]/50 transition-all duration-300 group">
                <Zap className="h-8 w-8 text-[#22c825] mb-3 group-hover:scale-110 transition-transform duration-300" />
                <h4 className="text-xl font-bold text-[#c9c1c0] mb-2">Fast Learner</h4>
                <p className="text-gray-400 text-sm">Quick to adapt to new technologies and frameworks</p>
              </div>
              
              <div className="bg-gradient-to-br from-purple-500/20 to-purple-500/5 p-6 rounded-2xl border border-purple-500/30 hover:border-purple-500/50 transition-all duration-300 group">
                <Code className="h-8 w-8 text-purple-400 mb-3 group-hover:scale-110 transition-transform duration-300" />
                <h4 className="text-xl font-bold text-[#c9c1c0] mb-2">Clean Code</h4>
                <p className="text-gray-400 text-sm">Writing maintainable and scalable solutions</p>
              </div>
            </div>
          </div>

          {/* Right Column - Interactive Tabs */}
          <div className={`transform transition-all duration-1000 delay-500 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}>
            <div className="bg-gradient-to-br from-[#0a0a0a] to-[#1a1a1a] rounded-3xl border border-[#22c825]/20 overflow-hidden">
              {/* Tab Navigation */}
              <div className="flex border-b border-[#22c825]/20">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex-1 flex items-center justify-center space-x-2 py-4 px-6 transition-all duration-300 ${
                      activeTab === tab.id
                        ? 'bg-[#22c825] text-[#040404] font-semibold'
                        : 'text-[#c9c1c0] hover:text-[#22c825] hover:bg-[#22c825]/10'
                    }`}
                  >
                    <tab.icon className="h-4 w-4" />
                    <span className="hidden sm:inline">{tab.label}</span>
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <div className="p-4 sm:p-6 md:p-8">
                {activeTab === 'skills' && (
                  <div className="space-y-4 sm:space-y-6 animate-fade-in">
                    <h4 className="text-xl sm:text-2xl font-bold text-[#22c825] mb-4 sm:mb-6">Technical Skills</h4>
                    <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-3 gap-2 sm:gap-3">
                      {data.about.skills.map((skill, index) => (
                        <div
                          key={index}
                          className="group bg-gradient-to-r from-[#22c825]/20 to-[#8b5cf6]/20 px-2 sm:px-3 py-2 sm:py-3 rounded-lg sm:rounded-xl text-center border border-[#22c825]/30 hover:border-[#22c825] transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-[#22c825]/20"
                          style={{ animationDelay: `${index * 50}ms` }}
                        >
                          <span className="text-xs xs:text-sm sm:text-base text-[#c9c1c0] font-medium group-hover:text-[#22c825] transition-colors duration-300">
                            {skill}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'experience' && (
                  <div className="space-y-6 animate-fade-in">
                    <h4 className="text-2xl font-bold text-[#22c825] mb-6">Work Experience</h4>
                    <div className="space-y-4">
                      {experiences.map((exp, index) => (
                        <div
                          key={index}
                          className="flex items-start space-x-4 p-4 bg-[#040404]/50 rounded-xl border border-[#22c825]/20 hover:border-[#22c825]/40 transition-all duration-300"
                        >
                          <div className="w-3 h-3 bg-[#22c825] rounded-full mt-2 animate-pulse"></div>
                          <div>
                            <div className="text-[#22c825] font-semibold">{exp.year}</div>
                            <div className="text-[#c9c1c0] font-medium">{exp.role}</div>
                            <div className="text-gray-400 text-sm">{exp.company}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'achievements' && (
                  <div className="space-y-6 animate-fade-in">
                    <h4 className="text-2xl font-bold text-[#22c825] mb-6">Achievements</h4>
                    <div className="space-y-4">
                      {achievements.map((achievement, index) => (
                        <div
                          key={index}
                          className="p-4 bg-gradient-to-r from-[#22c825]/10 to-purple-500/10 rounded-xl border border-[#22c825]/20 hover:border-[#22c825]/40 transition-all duration-300"
                        >
                          <div className="flex items-start justify-between mb-2">
                            <h5 className="text-[#c9c1c0] font-semibold">{achievement.title}</h5>
                            <span className="text-[#22c825] text-sm font-medium">{achievement.year}</span>
                          </div>
                          <p className="text-gray-400 text-sm">{achievement.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;