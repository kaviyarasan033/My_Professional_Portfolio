import { Component, ElementRef, ViewChild, AfterViewInit, inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MatIconModule } from '@angular/material/icon';

interface Skill {
  name: string;
  level: number;
  icon: string;
}

interface SkillCategory {
  title: string;
  icon: string;
  skills: Skill[];
}

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  template: `
    <section id="skills" class="py-24 bg-transparent relative">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" #skillsSection>
        <div class="text-center mb-16 skill-header opacity-0">
          <h2 class="text-3xl md:text-4xl font-display font-bold text-slate-900 dark:text-white mb-4">Technical Arsenal</h2>
          <div class="w-20 h-1 bg-primary-green mx-auto rounded-full"></div>
          <p class="mt-4 text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            A comprehensive overview of my technical skills and proficiency levels across different domains.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          @for (category of skillCategories; track category.title; let i = $index) {
            <div class="skill-card opacity-0 group bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-800 hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
              <div class="flex items-center gap-3 mb-6">
                <div class="w-10 h-10 rounded-lg bg-primary-green/10 flex items-center justify-center text-primary-green group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                  <mat-icon>{{ category.icon }}</mat-icon>
                </div>
                <h3 class="text-xl font-bold text-slate-900 dark:text-white group-hover:text-primary-green transition-colors duration-300">{{ category.title }}</h3>
              </div>

              <div class="space-y-5">
                @for (skill of category.skills; track skill.name) {
                  <div class="group/skill">
                    <div class="flex justify-between items-center mb-1">
                      <span class="text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center gap-2 group-hover/skill:text-primary-green transition-colors duration-300">
                        <mat-icon class="text-[16px] w-4 h-4 group-hover/skill:scale-125 group-hover/skill:rotate-6 transition-transform duration-300">{{ skill.icon }}</mat-icon>
                        {{ skill.name }}
                      </span>
                      <span class="text-xs font-mono text-slate-500 group-hover/skill:text-primary-green transition-colors duration-300">{{ skill.level }}%</span>
                    </div>
                    <!-- SVG Progress Bar -->
                    <div class="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden relative">
                      <div class="absolute inset-0 bg-primary-green/20 scale-x-0 group-hover/skill:scale-x-100 origin-left transition-transform duration-500 z-0"></div>
                      <svg class="w-full h-full relative z-10" preserveAspectRatio="none">
                        <rect 
                          class="progress-bar"
                          x="0" 
                          y="0" 
                          height="100%" 
                          fill="currentColor" 
                          class="text-primary-green"
                          [attr.data-width]="skill.level + '%'"
                          width="0%"
                        />
                      </svg>
                    </div>
                  </div>
                }
              </div>
            </div>
          }
        </div>
      </div>
    </section>
  `
})
export class SkillsComponent implements AfterViewInit {
  @ViewChild('skillsSection') skillsSectionRef!: ElementRef;
  private platformId = inject(PLATFORM_ID);

  skillCategories: SkillCategory[] = [
    {
      title: 'Frontend Development',
      icon: 'web',
      skills: [
        { name: 'React / Next.js', level: 95, icon: 'code' },
        { name: 'Angular', level: 90, icon: 'code' },
        { name: 'Tailwind CSS', level: 95, icon: 'brush' },
        { name: 'Framer Motion', level: 85, icon: 'animation' }
      ]
    },
    {
      title: 'Backend Development',
      icon: 'dns',
      skills: [
        { name: 'Node.js / Express', level: 90, icon: 'terminal' },
        { name: 'PHP / Laravel', level: 85, icon: 'terminal' },
        { name: 'REST APIs', level: 95, icon: 'api' },
        { name: 'GraphQL', level: 80, icon: 'api' }
      ]
    },
    {
      title: 'Database Systems',
      icon: 'storage',
      skills: [
        { name: 'Firebase', level: 90, icon: 'table_chart' },
        { name: 'MySQL', level: 85, icon: 'table_chart' },
        { name: 'MongoDB', level: 85, icon: 'data_object' },
        { name: 'Redis', level: 75, icon: 'memory' }
      ]
    },
    {
      title: 'Enterprise Software',
      icon: 'domain',
      skills: [
        { name: 'CRM Development', level: 95, icon: 'people' },
        { name: 'ERP Systems', level: 90, icon: 'inventory' },
        { name: 'SaaS Platforms', level: 85, icon: 'cloud' },
        { name: 'Admin Dashboards', level: 95, icon: 'dashboard' }
      ]
    },
    {
      title: 'AI & Automation',
      icon: 'smart_toy',
      skills: [
        { name: 'AI Agents', level: 85, icon: 'psychology' },
        { name: 'n8n Automation', level: 90, icon: 'account_tree' },
        { name: 'Chatbot Systems', level: 85, icon: 'chat' },
        { name: 'Workflow Automation', level: 95, icon: 'linear_scale' }
      ]
    },
    {
      title: 'Blockchain & Future Tech',
      icon: 'currency_bitcoin',
      skills: [
        { name: 'Smart Contracts', level: 75, icon: 'description' },
        { name: 'Web3 Integration', level: 70, icon: 'link' },
        { name: 'Research & Dev', level: 85, icon: 'science' },
        { name: 'Scalable Arch', level: 90, icon: 'architecture' }
      ]
    }
  ];

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      gsap.registerPlugin(ScrollTrigger);
      const header = this.skillsSectionRef.nativeElement.querySelectorAll('.skill-header');
      const cards = this.skillsSectionRef.nativeElement.querySelectorAll('.skill-card');
      const progressBars = this.skillsSectionRef.nativeElement.querySelectorAll('.progress-bar');
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: this.skillsSectionRef.nativeElement,
          start: "top 80%",
        }
      });

      tl.fromTo([...header, ...cards], 
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power2.out" }
      );

      progressBars.forEach((bar: SVGRectElement) => {
        const targetWidth = bar.getAttribute('data-width') || '0%';
        tl.fromTo(bar, 
          { width: '0%' },
          { width: targetWidth, duration: 1.5, ease: "power2.out" },
          "-=0.4" // overlap with previous animation
        );
      });
    }
  }
}
