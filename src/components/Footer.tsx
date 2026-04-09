import React from 'react';
import { Github, Linkedin } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-white dark:bg-slate-950 border-t-4 border-primary-green pt-16 pb-8 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div 
            className="flex flex-col items-center md:items-start group cursor-pointer" 
            onClick={scrollToTop}
          >
            <span className="font-display font-bold text-2xl tracking-tight text-primary-green mb-2 inline-block transition-transform duration-300 group-hover:scale-105 group-hover:-rotate-2">Dev_kavi</span>
            <p className="text-slate-500 dark:text-slate-400 text-sm text-center md:text-left max-w-sm transition-colors duration-300 group-hover:text-slate-700 dark:group-hover:text-slate-300">
              Building scalable enterprise software, intelligent AI automation systems, and modern web applications.
            </p>
          </div>
          
          <div className="flex gap-6">
            <a href="https://github.com/kaviyarasan033" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-primary-green transition-colors">
              <span className="sr-only">GitHub</span>
              <Github className="w-6 h-6" />
            </a>
            <a href="https://www.linkedin.com/in/kaviyarasan-m-172542299" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-primary-green transition-colors">
              <span className="sr-only">LinkedIn</span>
              <Linkedin className="w-6 h-6" />
            </a>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            &copy; {currentYear} Kaviyarasan M. All rights reserved.
          </p>
          <div className="flex gap-4 text-sm text-slate-500 dark:text-slate-400">
            <a href="#" className="hover:text-primary-green transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary-green transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
