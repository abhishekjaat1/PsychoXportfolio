import React, { useState, useEffect } from 'react';
import { Eye, EyeOff, Save, Download, Plus, Trash2, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PortfolioData, Service, Project } from '../types';
import { getPortfolioData, savePortfolioData } from '../data/portfolio-data';

const ADMIN_PASSWORD = 'Rohit@2927'; // In production, use proper authentication

const Admin: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState<PortfolioData | null>(null);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');

  useEffect(() => {
    if (isAuthenticated) {
      setData(getPortfolioData());
    }
  }, [isAuthenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setPassword('');
    } else {
      alert('Incorrect password');
    }
  };

  const handleSave = () => {
    if (!data) return;
    
    setSaveStatus('saving');
    try {
      savePortfolioData(data);
      setSaveStatus('saved');
      setTimeout(() => setSaveStatus('idle'), 2000);
    } catch (error) {
      setSaveStatus('error');
      setTimeout(() => setSaveStatus('idle'), 2000);
    }
  };

  const handleExport = () => {
    if (!data) return;
    
    const dataStr = JSON.stringify(data, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'portfolio-data.json';
    link.click();
    URL.revokeObjectURL(url);
  };

  const addService = () => {
    if (!data) return;
    const newService: Service = {
      id: `service-${Date.now()}`,
      title: 'New Service',
      description: 'Service description',
      icon: 'Globe'
    };
    setData({ ...data, services: [...data.services, newService] });
  };

  const removeService = (id: string) => {
    if (!data) return;
    setData({ ...data, services: data.services.filter(s => s.id !== id) });
  };

  const addProject = () => {
    if (!data) return;
    const newProject: Project = {
      id: `project-${Date.now()}`,
      title: 'New Project',
      techStack: ['React'],
      description: 'Project description',
      link: 'https://github.com'
    };
    setData({ ...data, projects: [...data.projects, newProject] });
  };

  const removeProject = (id: string) => {
    if (!data) return;
    setData({ ...data, projects: data.projects.filter(p => p.id !== id) });
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#040404] flex items-center justify-center">
        <div className="bg-gradient-to-br from-[#0a0a0a] to-[#1a1a1a] p-8 rounded-2xl border border-[#22c825]/20 max-w-md w-full mx-4">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-[#22c825] mb-2">Admin Panel</h1>
            <p className="text-[#c9c1c0]">Enter password to continue</p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password"
                className="w-full bg-[#040404] border border-[#22c825]/30 rounded-lg px-4 py-3 text-[#c9c1c0] placeholder-gray-500 focus:border-[#22c825] focus:outline-none transition-colors duration-200"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-[#22c825] transition-colors duration-200"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
            
            <button
              type="submit"
              className="w-full bg-[#22c825] hover:bg-[#1ea01f] text-[#040404] font-semibold py-3 rounded-lg transition-colors duration-200"
            >
              Login
            </button>
          </form>
          
          <div className="mt-6 text-center">
            <Link to="/" className="text-[#22c825] hover:text-[#1ea01f] transition-colors duration-200">
              ← Back to Portfolio
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-[#040404] flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#22c825]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#040404] text-[#c9c1c0] py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-[#22c825] mb-2">Admin Panel</h1>
            <p className="text-gray-400">Manage your portfolio content</p>
          </div>
          <div className="flex space-x-4">
            <Link 
              to="/" 
              className="flex items-center space-x-2 bg-gray-600 hover:bg-gray-500 text-white px-4 py-2 rounded-lg transition-colors duration-200"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back</span>
            </Link>
            <button
              onClick={handleExport}
              className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg transition-colors duration-200"
            >
              <Download className="h-4 w-4" />
              <span>Export</span>
            </button>
            <button
              onClick={handleSave}
              disabled={saveStatus === 'saving'}
              className="flex items-center space-x-2 bg-[#22c825] hover:bg-[#1ea01f] text-[#040404] px-4 py-2 rounded-lg font-semibold transition-colors duration-200 disabled:opacity-50"
            >
              <Save className="h-4 w-4" />
              <span>{saveStatus === 'saving' ? 'Saving...' : saveStatus === 'saved' ? 'Saved!' : 'Save'}</span>
            </button>
          </div>
        </div>

        <div className="space-y-8">
          {/* About Section */}
          <div className="bg-gradient-to-br from-[#0a0a0a] to-[#1a1a1a] p-6 rounded-2xl border border-[#22c825]/20">
            <h2 className="text-2xl font-bold text-[#22c825] mb-6">About Section</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#c9c1c0] mb-2">About Text</label>
                <textarea
                  value={data.about.text}
                  onChange={(e) => setData({ ...data, about: { ...data.about, text: e.target.value } })}
                  rows={4}
                  className="w-full bg-[#040404] border border-[#22c825]/30 rounded-lg px-4 py-3 text-[#c9c1c0] focus:border-[#22c825] focus:outline-none transition-colors duration-200"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-[#c9c1c0] mb-2">Skills (comma-separated)</label>
                <input
                  value={data.about.skills.join(', ')}
                  onChange={(e) => setData({ ...data, about: { ...data.about, skills: e.target.value.split(', ').filter(s => s.trim()) } })}
                  className="w-full bg-[#040404] border border-[#22c825]/30 rounded-lg px-4 py-3 text-[#c9c1c0] focus:border-[#22c825] focus:outline-none transition-colors duration-200"
                />
              </div>
            </div>
          </div>

          {/* Services Section */}
          <div className="bg-gradient-to-br from-[#0a0a0a] to-[#1a1a1a] p-6 rounded-2xl border border-[#22c825]/20">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-[#22c825]">Services</h2>
              <button
                onClick={addService}
                className="flex items-center space-x-2 bg-[#22c825] hover:bg-[#1ea01f] text-[#040404] px-4 py-2 rounded-lg font-semibold transition-colors duration-200"
              >
                <Plus className="h-4 w-4" />
                <span>Add Service</span>
              </button>
            </div>
            
            <div className="space-y-4">
              {data.services.map((service, index) => (
                <div key={service.id} className="bg-[#040404] p-4 rounded-lg border border-[#22c825]/20">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-lg font-semibold text-[#c9c1c0]">Service {index + 1}</h3>
                    <button
                      onClick={() => removeService(service.id)}
                      className="text-red-400 hover:text-red-300 transition-colors duration-200"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-[#c9c1c0] mb-1">Title</label>
                      <input
                        value={service.title}
                        onChange={(e) => {
                          const updatedServices = data.services.map(s => 
                            s.id === service.id ? { ...s, title: e.target.value } : s
                          );
                          setData({ ...data, services: updatedServices });
                        }}
                        className="w-full bg-[#1a1a1a] border border-[#22c825]/30 rounded px-3 py-2 text-[#c9c1c0] focus:border-[#22c825] focus:outline-none transition-colors duration-200"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-[#c9c1c0] mb-1">Icon</label>
                      <select
                        value={service.icon}
                        onChange={(e) => {
                          const updatedServices = data.services.map(s => 
                            s.id === service.id ? { ...s, icon: e.target.value } : s
                          );
                          setData({ ...data, services: updatedServices });
                        }}
                        className="w-full bg-[#1a1a1a] border border-[#22c825]/30 rounded px-3 py-2 text-[#c9c1c0] focus:border-[#22c825] focus:outline-none transition-colors duration-200"
                      >
                        <option value="Globe">Globe</option>
                        <option value="Smartphone">Smartphone</option>
                        <option value="Shield">Shield</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-[#c9c1c0] mb-1">Description</label>
                    <textarea
                      value={service.description}
                      onChange={(e) => {
                        const updatedServices = data.services.map(s => 
                          s.id === service.id ? { ...s, description: e.target.value } : s
                        );
                        setData({ ...data, services: updatedServices });
                      }}
                      rows={2}
                      className="w-full bg-[#1a1a1a] border border-[#22c825]/30 rounded px-3 py-2 text-[#c9c1c0] focus:border-[#22c825] focus:outline-none transition-colors duration-200"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Projects Section */}
          <div className="bg-gradient-to-br from-[#0a0a0a] to-[#1a1a1a] p-6 rounded-2xl border border-[#22c825]/20">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-[#22c825]">Projects</h2>
              <button
                onClick={addProject}
                className="flex items-center space-x-2 bg-[#22c825] hover:bg-[#1ea01f] text-[#040404] px-4 py-2 rounded-lg font-semibold transition-colors duration-200"
              >
                <Plus className="h-4 w-4" />
                <span>Add Project</span>
              </button>
            </div>
            
            <div className="space-y-4">
              {data.projects.map((project, index) => (
                <div key={project.id} className="bg-[#040404] p-4 rounded-lg border border-[#22c825]/20">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-lg font-semibold text-[#c9c1c0]">Project {index + 1}</h3>
                    <button
                      onClick={() => removeProject(project.id)}
                      className="text-red-400 hover:text-red-300 transition-colors duration-200"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-[#c9c1c0] mb-1">Title</label>
                      <input
                        value={project.title}
                        onChange={(e) => {
                          const updatedProjects = data.projects.map(p => 
                            p.id === project.id ? { ...p, title: e.target.value } : p
                          );
                          setData({ ...data, projects: updatedProjects });
                        }}
                        className="w-full bg-[#1a1a1a] border border-[#22c825]/30 rounded px-3 py-2 text-[#c9c1c0] focus:border-[#22c825] focus:outline-none transition-colors duration-200"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-[#c9c1c0] mb-1">Link</label>
                      <input
                        value={project.link}
                        onChange={(e) => {
                          const updatedProjects = data.projects.map(p => 
                            p.id === project.id ? { ...p, link: e.target.value } : p
                          );
                          setData({ ...data, projects: updatedProjects });
                        }}
                        className="w-full bg-[#1a1a1a] border border-[#22c825]/30 rounded px-3 py-2 text-[#c9c1c0] focus:border-[#22c825] focus:outline-none transition-colors duration-200"
                      />
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-[#c9c1c0] mb-1">Tech Stack (comma-separated)</label>
                    <input
                      value={project.techStack.join(', ')}
                      onChange={(e) => {
                        const updatedProjects = data.projects.map(p => 
                          p.id === project.id ? { ...p, techStack: e.target.value.split(', ').filter(s => s.trim()) } : p
                        );
                        setData({ ...data, projects: updatedProjects });
                      }}
                      className="w-full bg-[#1a1a1a] border border-[#22c825]/30 rounded px-3 py-2 text-[#c9c1c0] focus:border-[#22c825] focus:outline-none transition-colors duration-200"
                    />
                  </div>
                  
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-[#c9c1c0] mb-1">Description</label>
                    <textarea
                      value={project.description}
                      onChange={(e) => {
                        const updatedProjects = data.projects.map(p => 
                          p.id === project.id ? { ...p, description: e.target.value } : p
                        );
                        setData({ ...data, projects: updatedProjects });
                      }}
                      rows={2}
                      className="w-full bg-[#1a1a1a] border border-[#22c825]/30 rounded px-3 py-2 text-[#c9c1c0] focus:border-[#22c825] focus:outline-none transition-colors duration-200"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Section */}
          <div className="bg-gradient-to-br from-[#0a0a0a] to-[#1a1a1a] p-6 rounded-2xl border border-[#22c825]/20">
            <h2 className="text-2xl font-bold text-[#22c825] mb-6">Contact Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[#c9c1c0] mb-1">WhatsApp URL</label>
                <input
                  value={data.contact.whatsapp}
                  onChange={(e) => setData({ ...data, contact: { ...data.contact, whatsapp: e.target.value } })}
                  className="w-full bg-[#040404] border border-[#22c825]/30 rounded px-3 py-2 text-[#c9c1c0] focus:border-[#22c825] focus:outline-none transition-colors duration-200"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-[#c9c1c0] mb-1">Email</label>
                <input
                  value={data.contact.email}
                  onChange={(e) => setData({ ...data, contact: { ...data.contact, email: e.target.value } })}
                  className="w-full bg-[#040404] border border-[#22c825]/30 rounded px-3 py-2 text-[#c9c1c0] focus:border-[#22c825] focus:outline-none transition-colors duration-200"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-[#c9c1c0] mb-1">GitHub URL</label>
                <input
                  value={data.contact.github}
                  onChange={(e) => setData({ ...data, contact: { ...data.contact, github: e.target.value } })}
                  className="w-full bg-[#040404] border border-[#22c825]/30 rounded px-3 py-2 text-[#c9c1c0] focus:border-[#22c825] focus:outline-none transition-colors duration-200"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-[#c9c1c0] mb-1">YouTube URL</label>
                <input
                  value={data.contact.youtube}
                  onChange={(e) => setData({ ...data, contact: { ...data.contact, youtube: e.target.value } })}
                  className="w-full bg-[#040404] border border-[#22c825]/30 rounded px-3 py-2 text-[#c9c1c0] focus:border-[#22c825] focus:outline-none transition-colors duration-200"
                />
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-[#c9c1c0] mb-1">Instagram URL</label>
                <input
                  value={data.contact.instagram}
                  onChange={(e) => setData({ ...data, contact: { ...data.contact, instagram: e.target.value } })}
                  className="w-full bg-[#040404] border border-[#22c825]/30 rounded px-3 py-2 text-[#c9c1c0] focus:border-[#22c825] focus:outline-none transition-colors duration-200"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;