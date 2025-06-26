import React from 'react';
import { Globe, Smartphone, Shield, DivideIcon as LucideIcon } from 'lucide-react';
import { PortfolioData } from '../../types';

interface ServicesProps {
  data: PortfolioData;
}

const iconMap: Record<string, LucideIcon> = {
  Globe,
  Smartphone,
  Shield,
};

const Services: React.FC<ServicesProps> = ({ data }) => {
  return (
    <section id="services" className="py-20 bg-[#040404]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[#22c825] mb-4">
            Services
          </h2>
          <div className="w-24 h-1 bg-[#22c825] mx-auto"></div>
          <p className="text-[#c9c1c0] mt-6 text-lg max-w-2xl mx-auto">
            Delivering exceptional solutions across multiple domains
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {data.services.map((service, index) => {
            const IconComponent = iconMap[service.icon] || Globe;
            return (
              <div
                key={service.id}
                className="group relative bg-gradient-to-br from-[#0a0a0a] to-[#1a1a1a] p-8 rounded-2xl border border-[#22c825]/20 hover:border-[#22c825]/50 transition-all duration-500 hover:transform hover:scale-105 hover:shadow-2xl hover:shadow-[#22c825]/10"
              >
                <div className="text-center space-y-6">
                  <div className="relative">
                    <div className="w-20 h-20 mx-auto bg-gradient-to-br from-[#22c825]/20 to-[#8b5cf6]/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <IconComponent className="h-10 w-10 text-[#22c825]" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-[#22c825] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-ping"></div>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-[#c9c1c0] group-hover:text-[#22c825] transition-colors duration-300">
                    {service.title}
                  </h3>
                  
                  <p className="text-gray-400 leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;