import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Github, Linkedin, Mail } from 'lucide-react';

const Hero: React.FC = () => {
  const typingTextRef = useRef<HTMLParagraphElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);

  const phrases = [
    "Full Stack Developer",
    "AI Automation",
    "ERP & CRM , CMS Architect"
  ];

  useEffect(() => {
    // Content animation
    if (heroContentRef.current) {
        const items = heroContentRef.current.querySelectorAll('.hero-item');
        gsap.fromTo(items, 
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power2.out" }
        );
    }

    // Typing effect
    let typingInterval: NodeJS.Timeout;
    const el = typingTextRef.current;
    if (el) {
      let phraseIndex = 0;
      let charIndex = 0;
      let isDeleting = false;
      let typingSpeed = 100;

      const type = () => {
        const currentPhrase = phrases[phraseIndex];
        
        if (isDeleting) {
          el.textContent = currentPhrase.substring(0, charIndex - 1);
          charIndex--;
          typingSpeed = 50;
        } else {
          el.textContent = currentPhrase.substring(0, charIndex + 1);
          charIndex++;
          typingSpeed = 100;
        }

        if (!isDeleting && charIndex === currentPhrase.length) {
          isDeleting = true;
          typingSpeed = 2000; 
        } else if (isDeleting && charIndex === 0) {
          isDeleting = false;
          phraseIndex = (phraseIndex + 1) % phrases.length;
          typingSpeed = 500; 
        }

        typingInterval = setTimeout(type, typingSpeed);
      };

      typingInterval = setTimeout(type, typingSpeed);
    }

    return () => {
      if (typingInterval) clearTimeout(typingInterval);
    };
  }, []);

  return (
    <section id="section-home" aria-label="Hero - Introduction" className="relative min-h-screen flex items-center pt-20">
      {/* Background Animated SVG Lines */}
      <div className="absolute inset-0 z-0 opacity-20 dark:opacity-10 pointer-events-none">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-primary-green"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Content */}
          <div className="text-left" ref={heroContentRef}>
            <div className="hero-item inline-flex items-center px-4 py-2 rounded-full bg-primary-green/10 text-primary-green text-sm font-medium mb-8 border border-primary-green/20 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-primary-green mr-2 animate-pulse"></span>
              Available for new opportunities
            </div>
            
            <h1 className="hero-item text-5xl md:text-7xl font-display font-bold tracking-tight mb-6 text-slate-900 dark:text-white leading-tight">
              Hi, I'm <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-green to-primary-yellow">Kaviyarasan M</span>
            </h1>
            
            <div className="hero-item h-12 md:h-16 mb-6">
              <p className="text-xl md:text-3xl font-medium text-slate-600 dark:text-slate-300" ref={typingTextRef}></p>
            </div>
            
            <p className="hero-item max-w-xl text-lg text-slate-600 dark:text-slate-400 mb-10 leading-relaxed">
              Building scalable enterprise software, intelligent AI automation systems, and modern web applications with a focus on performance and user experience.
            </p>
            
            <div className="hero-item flex flex-col sm:flex-row items-start gap-4">
              <a href="#section-projects" className="px-8 py-4 rounded-full bg-primary-green text-white font-medium hover:bg-primary-green/90 transition-all shadow-lg shadow-primary-green/30 hover:shadow-primary-green/50 hover:-translate-y-1 text-center">
                View Projects
              </a>
              <a href="#section-contact" className="px-8 py-4 rounded-full bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-medium border border-slate-200 dark:border-slate-800 hover:border-primary-green transition-all shadow-sm hover:shadow-md hover:-translate-y-1 text-center">
                Contact Me 
              </a>
            </div>

            <div className="hero-item mt-12 flex items-center gap-6">
              <a href="https://github.com/kaviyarasan033" target="_blank" rel="noopener noreferrer" aria-label="Visit Kaviyarasan M on GitHub" className="text-slate-500 hover:text-primary-green transition-colors">
                <Github className="w-6 h-6" />
              </a>
              <a href="https://www.linkedin.com/in/kaviyarasan-m-172542299" target="_blank" rel="noopener noreferrer" aria-label="Connect with Kaviyarasan M on LinkedIn" className="text-slate-500 hover:text-primary-green transition-colors">
                <Linkedin className="w-6 h-6" />
              </a>
              <a href="mailto:mkaviyarasan003@gmail.com" aria-label="Send email to Kaviyarasan M" className="text-slate-500 hover:text-primary-green transition-colors">
                <Mail className="w-6 h-6" />
              </a>
            </div>
          </div>
          
          {/* Right Side: Empty space for the global orbiting circle */}
          <div className="hidden lg:block h-full min-h-[500px]">
            {/* The orbiting circle from App.tsx will appear here */}
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default Hero;
