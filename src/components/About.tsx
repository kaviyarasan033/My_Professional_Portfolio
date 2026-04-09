import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Award, Code, Cpu, Building, Layers, GraduationCap } from 'lucide-react';

const About: React.FC = () => {
  const aboutSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (aboutSectionRef.current) {
        const items = aboutSectionRef.current.querySelectorAll('.about-item');
        
        gsap.fromTo(items, 
          { opacity: 0, y: 30 },
          { 
            opacity: 1, 
            y: 0, 
            duration: 0.8, 
            stagger: 0.15, 
            ease: "power2.out",
            scrollTrigger: {
              trigger: aboutSectionRef.current,
              start: "top 80%",
            }
          }
        );
    }
  }, []);

  return (
    <section id="section-about" aria-labelledby="about-heading" className="py-24 bg-transparent relative">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 rounded-full bg-primary-green/5 blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-primary-yellow/5 blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10" ref={aboutSectionRef}>
        <div className="text-center mb-16 about-item opacity-0">
          <h2 id="about-heading" className="text-3xl md:text-4xl font-display font-bold text-slate-900 dark:text-white mb-4">About Me</h2>
          <div className="w-20 h-1 bg-primary-green mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="about-item opacity-0">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl group">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary-green/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
              <img src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80" alt="Kaviyarasan M — Full Stack Developer working at a computer" width="800" height="600" loading="lazy" className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700" />
              
              {/* Floating badge */}
              <div className="absolute bottom-6 left-6 right-6 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md p-4 rounded-xl shadow-lg border border-white/20 dark:border-slate-700/50 z-20 flex items-center gap-4 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                <div className="w-12 h-12 rounded-full bg-primary-green/20 flex items-center justify-center text-primary-green">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-bold text-slate-900 dark:text-white">2+ Years</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Professional Experience</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-2xl font-display font-bold text-slate-800 dark:text-slate-100 about-item opacity-0">
              Innovating at the intersection of <span className="text-primary-green">Software</span> & <span className="text-primary-yellow">AI</span>
            </h3>
            
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed about-item opacity-0">
              I am <strong className="text-slate-800 dark:text-slate-200">Kaviyarasan M</strong>, an <strong className="text-slate-800 dark:text-slate-200">MCA (Master of Computer Applications)</strong> graduate and passionate Full Stack Developer & AI Automation Engineer with 2+ years of experience building scalable enterprise solutions. My expertise lies in architecting robust CRM and ERP systems that drive business efficiency.
            </p>
            
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed about-item opacity-0">
              I have been pioneering the integration of AI agents and workflow automation (n8n) into traditional SaaS platforms, helping businesses transition into the intelligent era.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 about-item opacity-0">
              <div className="flex items-start gap-3 p-4 rounded-xl bg-white dark:bg-slate-800 shadow-sm border border-slate-100 dark:border-slate-700">
                <Code className="text-primary-green w-5 h-5 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-slate-900 dark:text-white">Full Stack Dev</h4>
                  <p className="text-sm text-slate-500 dark:text-slate-400">React, Angular, Node.js</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-4 rounded-xl bg-white dark:bg-slate-800 shadow-sm border border-slate-100 dark:border-slate-700">
                <Cpu className="text-primary-yellow w-5 h-5 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-slate-900 dark:text-white">AI & Automation</h4>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Agents, n8n, Chatbots</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-4 rounded-xl bg-white dark:bg-slate-800 shadow-sm border border-slate-100 dark:border-slate-700">
                <Building className="text-primary-green w-5 h-5 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-slate-900 dark:text-white">Enterprise Arch</h4>
                  <p className="text-sm text-slate-500 dark:text-slate-400">ERP & CRM Systems</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-4 rounded-xl bg-white dark:bg-slate-800 shadow-sm border border-slate-100 dark:border-slate-700">
                <Layers className="text-primary-yellow w-5 h-5 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-slate-900 dark:text-white">API Integration</h4>
                  <p className="text-sm text-slate-500 dark:text-slate-400">REST, GraphQL, Webhooks</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-xl bg-white dark:bg-slate-800 shadow-sm border border-slate-100 dark:border-slate-700">
                <GraduationCap className="text-primary-green w-5 h-5 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-slate-900 dark:text-white">Education</h4>
                  <p className="text-sm text-slate-500 dark:text-slate-400">MCA — Master of Computer Applications</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
