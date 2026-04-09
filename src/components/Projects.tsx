import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink, Code } from 'lucide-react';

interface Project {
  title: string;
  description: string;
  image: string;
  tags: string[];
  demoUrl: string;
  githubUrl: string;
}

const Projects: React.FC = () => {
  const projectsSectionRef = useRef<HTMLDivElement>(null);

  const projects: Project[] = [
    {
      title: 'AGRI NEXT | AI Smart Agriculture',
      description: 'Empowering farmers through Artificial Intelligence. Features AI crop recommendation, disease detection, and smart farming advisory.',
      image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=600&q=80',
      tags: ['React', 'Tailwind', 'Framer Motion', 'GSAP'],
      demoUrl: 'https://agri.techtigers.in/',
      githubUrl: '#'
    },
    {
      title: 'Matrimony Platform',
      description: 'A full-stack matchmaking platform with advanced search algorithms, real-time chat, and secure user verification systems.',
      image: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=600&q=80',
      tags: ['Laraval', 'Node.js', 'MySQL', 'Socket.io'],
      demoUrl: 'https://kettimelammatrimony.com/',
      githubUrl: '#'
    },
    {
      title: 'Enterprise CRM Software',
      description: 'Custom Customer Relationship Management system featuring lead tracking, automated follow-ups, and detailed analytics dashboards.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80',
      tags: ['React', 'Laravel', 'MySQL', 'Tailwind'],
      demoUrl: '#',
      githubUrl: '#'
    },
    {
      title: 'AI Automation Platform',
      description: 'An intelligent workflow automation tool integrating n8n with custom AI agents to streamline business operations and data processing.',
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=600&q=80',
      tags: ['Next.js', 'Python', 'n8n', 'OpenAI'],
      demoUrl: '#',
      githubUrl: '#'
    },
    {
      title: 'ERP System',
      description: 'Comprehensive Enterprise Resource Planning solution handling inventory, HR, finance, and supply chain management for multinational corporations.',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80',
      tags: ['Angular', 'Spring Boot', 'Oracle', 'Docker'],
      demoUrl: 'https://kalvierp.com/',
      githubUrl: '#'
    },
    {
      title: 'SaaS Multi-Tenant App',
      description: 'A scalable multi-tenant architecture supporting customized branding, isolated databases, and tiered subscription management.',
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&q=80',
      tags: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      demoUrl: '#',
      githubUrl: '#'
    }
  ];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (projectsSectionRef.current) {
        const header = projectsSectionRef.current.querySelectorAll('.project-header');
        const cards = projectsSectionRef.current.querySelectorAll('.project-card');
        
        gsap.fromTo([...header, ...cards], 
          { opacity: 0, y: 40 },
          { 
            opacity: 1, 
            y: 0, 
            duration: 0.7, 
            stagger: 0.1, 
            ease: "power2.out",
            scrollTrigger: {
              trigger: projectsSectionRef.current,
              start: "top 80%",
            }
          }
        );
    }
  }, []);

  return (
    <section id="section-projects" aria-labelledby="projects-heading" className="py-24 bg-transparent relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={projectsSectionRef}>
        <div className="text-center mb-16 project-header opacity-0">
          <h2 id="projects-heading" className="text-3xl md:text-4xl font-display font-bold text-slate-900 dark:text-white mb-4">Featured Projects</h2>
          <div className="w-20 h-1 bg-primary-green mx-auto rounded-full"></div>
          <p className="mt-4 text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            A selection of enterprise-grade applications, AI automation tools, and scalable platforms I've built.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div key={project.title} className="project-card opacity-0 group relative bg-white dark:bg-slate-900 rounded-2xl overflow-hidden shadow-sm border border-slate-200 dark:border-slate-800 hover:shadow-xl hover:-translate-y-2 transition-all duration-500">
              
              {/* Image Container */}
              <div className="relative h-48 overflow-hidden">
                <div className="absolute inset-0 bg-slate-900/20 group-hover:bg-transparent transition-colors duration-500 z-10"></div>
                <img src={project.image} alt={project.title + ' — Project by Kaviyarasan M'} loading="lazy" width="600" height="400" className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" />
                
                {/* Overlay Actions */}
                <div className="absolute inset-0 bg-slate-900/80 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                  <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-primary-green flex items-center justify-center text-white hover:scale-110 transition-transform shadow-lg" aria-label="Live Demo">
                    <ExternalLink className="w-5 h-5" />
                  </a>
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white text-slate-900 flex items-center justify-center hover:scale-110 transition-transform shadow-lg" aria-label="GitHub Repository">
                    <Code className="w-5 h-5" />
                  </a>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-primary-green transition-colors">{project.title}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 line-clamp-3">
                  {project.description}
                </p>
                
                {/* Tags */}
                <div className="flex flex-wrap gap-2 mt-auto">
                  {project.tags.map((tag) => (
                    <span key={tag} className="px-2.5 py-1 text-xs font-medium rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              
              {/* Bottom Accent Line */}
              <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-primary-green to-primary-yellow group-hover:w-full transition-all duration-500"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
