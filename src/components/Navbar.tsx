import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Code2, Home, User, Briefcase, FolderOpen, Mail, Volume2, VolumeX } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  
  // Initialize audio on component mount
  useEffect(() => {
    // Create audio element
    audioRef.current = new Audio('/onmyway.mp3');
    audioRef.current.preload = 'auto';
    audioRef.current.volume = 0.5; // Set volume to 50%
    
    // Play promise handling for browsers that require user interaction
    const playPromise = () => {
      if (audioRef.current) {
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise.catch(error => {
            console.log('Playback failed:', error);
            // Auto-play was prevented
            // Show a UI element to let the user manually start playback
          });
        }
      }
    };
    
    // Cleanup on unmount
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);
  
  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        // Try to play and handle any errors
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise.catch(error => {
            console.log('Playback failed:', error);
            // Auto-play was prevented, show UI to let user know they need to interact first
          });
        }
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      // Update active section based on scroll position
      const sections = ['home', 'about', 'services', 'projects', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
    setIsOpen(false);
    setActiveSection(sectionId);
  };

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'about', label: 'About', icon: User },
    { id: 'services', label: 'Services', icon: Briefcase },
    { id: 'projects', label: 'Projects', icon: FolderOpen },
    { id: 'contact', label: 'Contact', icon: Mail },
  ];



  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      <nav 
        ref={navRef}
        className={`relative w-full transition-all duration-500 ${
          isScrolled 
            ? 'bg-[#040404]/95 dark:bg-[#0a0a0a]/95 backdrop-blur-md shadow-2xl shadow-[#22c825]/10 border-b border-[#22c825]/20' 
            : 'bg-transparent'
        }`}
      >
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Subtle right-side highlight */}
        <motion.div 
          className="absolute right-0 top-0 h-full w-1/3 bg-gradient-to-l from-[#22c825]/5 to-transparent pointer-events-none"
          initial={{ opacity: 0, x: '100%' }}
          animate={{ 
            opacity: isScrolled ? 0.5 : 0,
            x: isScrolled ? '0%' : '50%',
            width: isScrolled ? '33%' : '0%'
          }}
          transition={{ 
            duration: 0.6, 
            ease: [0.16, 1, 0.3, 1],
            opacity: { duration: 0.4 }
          }}
        />
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Logo */}
          <div className="flex items-center space-x-2 sm:space-x-3 group cursor-pointer">
            <div className="relative">
              <Code2 className="h-8 w-8 sm:h-10 sm:w-10 text-[#22c825] group-hover:rotate-12 transition-transform duration-300" />
              <div className="absolute -top-1 -right-1 w-2 h-2 sm:w-3 sm:h-3 bg-[#22c825] rounded-full animate-pulse"></div>
            </div>
            <div className="hidden sm:block">
              <span className="text-[#22c825] font-mono text-xl sm:text-2xl font-bold tracking-wider">
                &lt; Rohit_hcr2 /&gt;
              </span>
              <div className="text-xs text-gray-400 font-mono">Full Stack Developer</div>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:block">
            <div className="flex items-center space-x-1 bg-[#0a0a0a]/50 backdrop-blur-sm rounded-full px-1 sm:px-2 py-1 sm:py-2 border border-[#22c825]/20">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`flex items-center space-x-1 sm:space-x-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 group ${
                    activeSection === item.id
                      ? 'bg-[#22c825] text-[#040404] shadow-lg shadow-[#22c825]/30'
                      : 'text-[#c9c1c0] hover:text-[#22c825] hover:bg-[#22c825]/10'
                  }`}
                >
                  <item.icon className={`h-3 w-3 sm:h-4 sm:w-4 transition-transform duration-300 ${
                    activeSection === item.id ? 'scale-110' : 'group-hover:scale-110'
                  }`} />
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Music Player */}
          <div className="hidden md:flex items-center space-x-2 mr-4 overflow-hidden">
            <motion.button
              onClick={toggleMusic}
              className="flex items-center justify-center p-2 rounded-full text-[#c9c1c0] hover:bg-[#22c825]/10 hover:text-[#22c825] transition-all duration-300"
              whileTap={{ scale: 0.9 }}
              animate={isPlaying ? { scale: [1, 1.1, 1] } : {}}
              transition={{ duration: 1, repeat: Infinity, repeatType: 'loop' }}
              aria-label={isPlaying ? 'Pause music' : 'Play music'}
            >
              {isPlaying ? <Volume2 className="h-5 w-5" /> : <VolumeX className="h-5 w-5" />}
            </motion.button>
            <motion.div 
              ref={titleRef}
              className="whitespace-nowrap text-sm text-[#c9c1c0] overflow-hidden"
              initial={{ width: 0, opacity: 0 }}
              animate={isPlaying ? { width: 'auto', opacity: 1 } : { width: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className="inline-block whitespace-nowrap"
                animate={isPlaying ? { x: [0, -100] } : { x: 0 }}
                transition={{ 
                  x: { 
                    duration: 5, 
                    repeat: Infinity, 
                    ease: 'linear',
                    repeatType: 'loop' as const
                  } 
                }}
              >
                On My Way - Alan Walker • Farruko 
              </motion.div>
            </motion.div>
          </div>
          
          {/* Hidden audio element */}
          <audio ref={audioRef} src="/onmyway.mp3" loop />

          {/* Mobile menu button */}
          <div className="flex items-center space-x-2 lg:hidden">
            <button
              onClick={toggleMusic}
              className="p-2 text-[#c9c1c0] hover:text-[#22c825] transition-colors duration-300"
              aria-label={isPlaying ? 'Pause music' : 'Play music'}
            >
              {isPlaying ? <Volume2 className="h-5 w-5" /> : <VolumeX className="h-5 w-5" />}
            </button>
          </div>
          
          <div className="lg:hidden ml-2">
            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              className="relative p-2 text-[#c9c1c0] hover:text-[#22c825] transition-colors duration-300 focus:outline-none"
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
              whileTap={{ scale: 0.9 }}
            >
              <div className="w-6 h-6 relative">
                <motion.div
                  animate={isOpen ? { rotate: 180 } : { rotate: 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0"
                >
                  <Menu className={`absolute inset-0 transition-opacity duration-300 ${isOpen ? 'opacity-0' : 'opacity-100'}`} />
                  <X className={`absolute inset-0 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`} />
                </motion.div>
              </div>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ 
              opacity: 1, 
              height: 'auto',
              transition: { 
                duration: 0.3,
                ease: 'easeInOut'
              } 
            }}
            exit={{ 
              opacity: 0, 
              height: 0,
              transition: { 
                duration: 0.2,
                ease: 'easeInOut'
              } 
            }}
            className="lg:hidden overflow-hidden bg-[#040404]/95 dark:bg-[#0a0a0a]/95 backdrop-blur-md border-t border-[#22c825]/20"
          >
            <div className="px-4 py-3 space-y-2">
              {navItems.map((item, index) => (
                <motion.button
                  key={item.id}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ 
                    x: 0, 
                    opacity: 1,
                    transition: { 
                      delay: 0.1 * index,
                      duration: 0.3
                    } 
                  }}
                  exit={{ 
                    x: -20, 
                    opacity: 0,
                    transition: { 
                      delay: 0,
                      duration: 0.2
                    } 
                  }}
                  onClick={() => scrollToSection(item.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-base font-medium transition-all duration-300 ${
                    activeSection === item.id
                      ? 'bg-[#22c825] text-[#040404] shadow-md shadow-[#22c825]/30'
                      : 'text-[#c9c1c0] hover:bg-[#22c825]/10 hover:text-[#22c825]'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </motion.button>
              ))}

            </div>
          </motion.div>
        )}
      </AnimatePresence>
      </nav>
    </div>
  );
};

export default Navbar;