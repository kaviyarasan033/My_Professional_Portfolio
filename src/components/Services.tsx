import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Globe, Briefcase, Cpu, LayoutDashboard, Zap, Bitcoin } from 'lucide-react';

interface Service {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const Services: React.FC = () => {
  const servicesSectionRef = useRef<HTMLDivElement>(null);

  const services: Service[] = [
    {
      title: 'Full Stack Web Development',
      description: 'Building responsive, high-performance web applications using modern frameworks like React and Angular, backed by robust Node.js or PHP architectures.',
      icon: <Globe className="w-8 h-8" />
    },
    {
      title: 'Enterprise Software Development',
      description: 'Architecting scalable, secure, and maintainable software solutions tailored for large organizations, ensuring high availability and data integrity.',
      icon: <Briefcase className="w-8 h-8" />
    },
    {
      title: 'AI Automation Solutions',
      description: 'Integrating intelligent AI agents and automating complex workflows using tools like n8n to optimize business processes and reduce manual effort.',
      icon: <Cpu className="w-8 h-8" />
    },
    {
      title: 'Custom CRM & ERP',
      description: 'Designing and developing specialized Customer Relationship Management and Enterprise Resource Planning systems to fit unique business needs.',
      icon: <LayoutDashboard className="w-8 h-8" />
    },
    {
      title: 'API Development',
      description: 'Creating secure, well-documented RESTful and GraphQL APIs for seamless integration between diverse systems and third-party services.',
      icon: <Zap className="w-8 h-8" />
    },
    {
      title: 'Blockchain Research',
      description: 'Exploring and implementing Web3 technologies, smart contracts, and decentralized applications to future-proof enterprise solutions.',
      icon: <Bitcoin className="w-8 h-8" />
    }
  ];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (servicesSectionRef.current) {
        const header = servicesSectionRef.current.querySelectorAll('.service-header');
        const cards = servicesSectionRef.current.querySelectorAll('.service-card');
        
        gsap.fromTo([...header, ...cards], 
          { opacity: 0, y: 30 },
          { 
            opacity: 1, 
            y: 0, 
            duration: 0.6, 
            stagger: 0.1, 
            ease: "power2.out",
            scrollTrigger: {
              trigger: servicesSectionRef.current,
              start: "top 80%",
            }
          }
        );
    }
  }, []);

  return (
    <section id="section-services" className="py-24 bg-transparent relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 rounded-full bg-primary-green/5 blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10" ref={servicesSectionRef}>
        <div className="text-center mb-16 service-header opacity-0">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-slate-900 dark:text-white mb-4">What I Do</h2>
          <div className="w-20 h-1 bg-primary-green mx-auto rounded-full"></div>
          <p className="mt-4 text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Providing end-to-end software solutions, from conceptualization to deployment, focusing on scalability and user experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div key={service.title} className="service-card opacity-0 group bg-slate-50 dark:bg-slate-900 rounded-2xl p-8 shadow-sm border border-slate-100 dark:border-slate-800 hover:shadow-xl hover:border-primary-green/50 hover:-translate-y-2 transition-all duration-300 relative overflow-hidden">
              
              {/* Hover Gradient Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary-green/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <div className="relative z-10">
                <div className="w-14 h-14 rounded-xl bg-white dark:bg-slate-800 shadow-sm flex items-center justify-center text-primary-green mb-6 group-hover:scale-110 transition-transform duration-300">
                  {service.icon}
                </div>
                
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-primary-green transition-colors">{service.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
