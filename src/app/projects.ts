import { Component, ElementRef, ViewChild, AfterViewInit, inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MatIconModule } from '@angular/material/icon';

interface Project {
  title: string;
  description: string;
  image: string;
  tags: string[];
  demoUrl: string;
  githubUrl: string;
}

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  template: `
    <section id="projects" class="py-24 bg-transparent relative">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" #projectsSection>
        <div class="text-center mb-16 project-header opacity-0">
          <h2 class="text-3xl md:text-4xl font-display font-bold text-slate-900 dark:text-white mb-4">Featured Projects</h2>
          <div class="w-20 h-1 bg-primary-green mx-auto rounded-full"></div>
          <p class="mt-4 text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            A selection of enterprise-grade applications, AI automation tools, and scalable platforms I've built.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          @for (project of projects; track project.title) {
            <div class="project-card opacity-0 group relative bg-white dark:bg-slate-900 rounded-2xl overflow-hidden shadow-sm border border-slate-200 dark:border-slate-800 hover:shadow-xl hover:-translate-y-2 transition-all duration-500">
              
              <!-- Image Container -->
              <div class="relative h-48 overflow-hidden">
                <div class="absolute inset-0 bg-slate-900/20 group-hover:bg-transparent transition-colors duration-500 z-10"></div>
                <img [src]="project.image" [alt]="project.title" class="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" referrerPolicy="no-referrer" />
                
                <!-- Overlay Actions -->
                <div class="absolute inset-0 bg-slate-900/80 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                  <a [href]="project.demoUrl" target="_blank" class="w-10 h-10 rounded-full bg-primary-green flex items-center justify-center text-white hover:scale-110 transition-transform shadow-lg" aria-label="Live Demo">
                    <mat-icon>launch</mat-icon>
                  </a>
                  <a [href]="project.githubUrl" target="_blank" class="w-10 h-10 rounded-full bg-white text-slate-900 flex items-center justify-center hover:scale-110 transition-transform shadow-lg" aria-label="GitHub Repository">
                    <mat-icon>code</mat-icon>
                  </a>
                </div>
              </div>

              <!-- Content -->
              <div class="p-6">
                <h3 class="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-primary-green transition-colors">{{ project.title }}</h3>
                <p class="text-sm text-slate-600 dark:text-slate-400 mb-4 line-clamp-3">
                  {{ project.description }}
                </p>
                
                <!-- Tags -->
                <div class="flex flex-wrap gap-2 mt-auto">
                  @for (tag of project.tags; track tag) {
                    <span class="px-2.5 py-1 text-xs font-medium rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                      {{ tag }}
                    </span>
                  }
                </div>
              </div>
              
              <!-- Bottom Accent Line -->
              <div class="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-primary-green to-primary-yellow group-hover:w-full transition-all duration-500"></div>
            </div>
          }
        </div>
      </div>
    </section>
  `
})
export class ProjectsComponent implements AfterViewInit {
  @ViewChild('projectsSection') projectsSectionRef!: ElementRef;
  private platformId = inject(PLATFORM_ID);

  projects: Project[] = [
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
      tags: ['Angular', 'Node.js', 'PostgreSQL', 'Socket.io'],
      demoUrl: '#',
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
      title: 'Global ERP System',
      description: 'Comprehensive Enterprise Resource Planning solution handling inventory, HR, finance, and supply chain management for multinational corporations.',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80',
      tags: ['Angular', 'Spring Boot', 'Oracle', 'Docker'],
      demoUrl: '#',
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

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      gsap.registerPlugin(ScrollTrigger);
      const header = this.projectsSectionRef.nativeElement.querySelectorAll('.project-header');
      const cards = this.projectsSectionRef.nativeElement.querySelectorAll('.project-card');
      
      gsap.fromTo([...header, ...cards], 
        { opacity: 0, y: 40 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.7, 
          stagger: 0.1, 
          ease: "power2.out",
          scrollTrigger: {
            trigger: this.projectsSectionRef.nativeElement,
            start: "top 80%",
          }
        }
      );
    }
  }
}
