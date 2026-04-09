import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Globe, Server, Database, Building2, Cpu, Bitcoin, 
  Code2, Palette, Activity, Terminal, Zap, Table2, 
  Braces, Users, Box, Cloud, LayoutDashboard, Brain, 
  Network, MessageSquare, GitMerge, FileText, Link2, 
  TestTube2, Milestone 
} from 'lucide-react';

interface Skill {
  name: string;
  level: number;
  icon: React.ReactNode;
}

interface SkillCategory {
  title: string;
  icon: React.ReactNode;
  skills: Skill[];
}

const Skills: React.FC = () => {
  const skillsSectionRef = useRef<HTMLDivElement>(null);

  const skillCategories: SkillCategory[] = [
    {
      title: 'Frontend Development',
      icon: <Globe />,
      skills: [
        { name: 'React / Next.js', level: 95, icon: <Code2 className="w-4 h-4" /> },
        { name: 'Angular', level: 90, icon: <Code2 className="w-4 h-4" /> },
        { name: 'Tailwind CSS', level: 95, icon: <Palette className="w-4 h-4" /> },
        { name: 'Framer Motion', level: 85, icon: <Activity className="w-4 h-4" /> }
      ]
    },
    {
      title: 'Backend Development',
      icon: <Server />,
      skills: [
        { name: 'Node.js / Express', level: 90, icon: <Terminal className="w-4 h-4" /> },
        { name: 'PHP / Laravel', level: 85, icon: <Terminal className="w-4 h-4" /> },
        { name: 'REST APIs', level: 95, icon: <Zap className="w-4 h-4" /> },
        { name: 'GraphQL', level: 80, icon: <Zap className="w-4 h-4" /> }
      ]
    },
    {
      title: 'Database Systems',
      icon: <Database />,
      skills: [
        { name: 'Firebase', level: 90, icon: <Table2 className="w-4 h-4" /> },
        { name: 'MySQL', level: 85, icon: <Table2 className="w-4 h-4" /> },
        { name: 'MongoDB', level: 85, icon: <Braces className="w-4 h-4" /> },
        { name: 'Redis', level: 75, icon: <Cpu className="w-4 h-4" /> }
      ]
    },
    {
      title: 'Enterprise Software',
      icon: <Building2 />,
      skills: [
        { name: 'CRM Development', level: 95, icon: <Users className="w-4 h-4" /> },
        { name: 'ERP Systems', level: 90, icon: <Box className="w-4 h-4" /> },
        { name: 'SaaS Platforms', level: 85, icon: <Cloud className="w-4 h-4" /> },
        { name: 'Admin Dashboards', level: 95, icon: <LayoutDashboard className="w-4 h-4" /> }
      ]
    },
    {
      title: 'AI & Automation',
      icon: <Cpu />,
      skills: [
        { name: 'AI Agents', level: 85, icon: <Brain className="w-4 h-4" /> },
        { name: 'n8n Automation', level: 90, icon: <Network className="w-4 h-4" /> },
        { name: 'Chatbot Systems', level: 85, icon: <MessageSquare className="w-4 h-4" /> },
        { name: 'Workflow Automation', level: 95, icon: <GitMerge className="w-4 h-4" /> }
      ]
    },
    {
      title: 'Blockchain & Future Tech',
      icon: <Bitcoin />,
      skills: [
        { name: 'Smart Contracts', level: 75, icon: <FileText className="w-4 h-4" /> },
        { name: 'Web3 Integration', level: 70, icon: <Link2 className="w-4 h-4" /> },
        { name: 'Research & Dev', level: 85, icon: <TestTube2 className="w-4 h-4" /> },
        { name: 'Scalable Arch', level: 90, icon: <Milestone className="w-4 h-4" /> }
      ]
    }
  ];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (skillsSectionRef.current) {
        const header = skillsSectionRef.current.querySelectorAll('.skill-header');
        const cards = skillsSectionRef.current.querySelectorAll('.skill-card');
        const progressBars = skillsSectionRef.current.querySelectorAll('.progress-bar');
        
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: skillsSectionRef.current,
            start: "top 80%",
          }
        });

        tl.fromTo([...header, ...cards], 
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power2.out" }
        );

        progressBars.forEach((bar: any) => {
          const targetWidth = bar.getAttribute('data-width') || '0%';
          tl.fromTo(bar, 
            { width: '0%' },
            { width: targetWidth, duration: 1.5, ease: "power2.out" },
            "-=0.4"
          );
        });
    }
  }, []);

  return (
    <section id="section-skills" className="py-24 bg-transparent relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={skillsSectionRef}>
        <div className="text-center mb-16 skill-header opacity-0">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-slate-900 dark:text-white mb-4">Technical Arsenal</h2>
          <div className="w-20 h-1 bg-primary-green mx-auto rounded-full"></div>
          <p className="mt-4 text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            A comprehensive overview of my technical skills and proficiency levels across different domains.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, i) => (
            <div key={i} className="skill-card opacity-0 group bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-800 hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-primary-green/10 flex items-center justify-center text-primary-green group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                  {category.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-primary-green transition-colors duration-300">{category.title}</h3>
              </div>

              <div className="space-y-5">
                {category.skills.map((skill) => (
                  <div key={skill.name} className="group/skill">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center gap-2 group-hover/skill:text-primary-green transition-colors duration-300">
                        {skill.icon}
                        {skill.name}
                      </span>
                      <span className="text-xs font-mono text-slate-500 group-hover/skill:text-primary-green transition-colors duration-300">{skill.level}%</span>
                    </div>
                    {/* SVG Progress Bar */}
                    <div className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden relative">
                      <div className="absolute inset-0 bg-primary-green/20 scale-x-0 group-hover/skill:scale-x-100 origin-left transition-transform duration-500 z-0"></div>
                      <svg className="w-full h-full relative z-10" preserveAspectRatio="none">
                        <rect 
                          className="progress-bar text-primary-green"
                          x="0" 
                          y="0" 
                          height="100%" 
                          fill="currentColor" 
                          data-width={skill.level + '%'}
                          width="0%"
                        />
                      </svg>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
