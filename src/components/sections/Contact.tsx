import React from 'react';
import { MessageCircle, Mail, Github, Youtube, Instagram } from 'lucide-react';
import { PortfolioData } from '../../types';

interface ContactProps {
  data: PortfolioData;
}

const Contact: React.FC<ContactProps> = ({ data }) => {
  const socialLinks = [
    { icon: MessageCircle, url: data.contact.whatsapp, label: 'WhatsApp', color: 'hover:text-green-400' },
    { icon: Mail, url: data.contact.email, label: 'Email', color: 'hover:text-blue-400' },
    { icon: Github, url: data.contact.github, label: 'GitHub', color: 'hover:text-gray-300' },
    { icon: Youtube, url: data.contact.youtube, label: 'YouTube', color: 'hover:text-red-400' },
    { icon: Instagram, url: data.contact.instagram, label: 'Instagram', color: 'hover:text-pink-400' },
  ];

  return (
    <section id="contact" className="py-12 sm:py-16 md:py-20 bg-[#040404]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#22c825] mb-3 sm:mb-4">
            Let's Connect
          </h2>
          <div className="w-16 sm:w-20 md:w-24 h-1 bg-[#22c825] mx-auto"></div>
          <p className="text-[#c9c1c0] mt-4 sm:mt-6 text-base sm:text-lg max-w-2xl mx-auto px-2">
            I'm open for opportunities and collaborations!
          </p>
        </div>

        <div className="bg-gradient-to-br from-[#0a0a0a] to-[#1a1a1a] rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 border border-[#22c825]/20">
          <div className="text-center space-y-6 sm:space-y-8">
            <p className="text-base sm:text-lg md:text-xl text-[#c9c1c0] leading-relaxed">
              Ready to bring your ideas to life? Let's discuss your next project and create something amazing together.
            </p>

            <div className="flex flex-wrap justify-center gap-3 sm:gap-4 md:gap-6">
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group relative p-3 sm:p-4 bg-gradient-to-br from-[#22c825]/20 to-[#8b5cf6]/20 rounded-xl sm:rounded-2xl border border-[#22c825]/30 hover:border-[#22c825] transition-all duration-300 transform hover:scale-105 sm:hover:scale-110 hover:shadow-lg hover:shadow-[#22c825]/20 ${link.color}`}
                  aria-label={link.label}
                >
                  <link.icon className="h-6 w-6 sm:h-8 sm:w-8 text-[#c9c1c0] group-hover:text-current transition-colors duration-300" />
                  <span className="hidden sm:block absolute -bottom-10 left-1/2 transform -translate-x-1/2 bg-[#040404] text-[#c9c1c0] px-2 py-1 rounded text-xs sm:text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap border border-[#22c825]/30">
                    {link.label}
                  </span>
                </a>
              ))}
            </div>

            <div className="bg-gradient-to-r from-[#22c825]/10 to-[#8b5cf6]/10 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-[#22c825]/20">
              <p className="text-[#22c825] font-semibold text-base sm:text-lg md:text-xl">
                💡 Open to Freelance Projects & Full-time Opportunities
              </p>
              <p className="text-[#c9c1c0] mt-1 sm:mt-2 text-sm sm:text-base">
                Available for remote work and collaborations worldwide
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;