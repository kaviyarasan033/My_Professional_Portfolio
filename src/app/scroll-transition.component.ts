import { ChangeDetectionStrategy, Component, ElementRef, ViewChild, AfterViewInit, PLATFORM_ID, inject, input } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-scroll-transition',
  standalone: true,
  template: `
    <section #section class="relative py-16 md:py-24 min-h-[40vh] flex items-center justify-center overflow-hidden" [attr.data-label]="label()">
      <div #content class="text-center">
        <p class="transition-item text-sm md:text-base font-mono tracking-[0.3em] uppercase text-primary-green opacity-0">{{ subtitle() }}</p>
        <h3 class="transition-item text-2xl md:text-4xl lg:text-5xl font-display font-bold text-slate-900 dark:text-white mt-2 opacity-0">{{ title() }}</h3>
        <p class="transition-item text-slate-500 dark:text-slate-400 mt-4 max-w-lg mx-auto opacity-0">{{ hint() }}</p>
        <div class="transition-item mt-8 flex justify-center opacity-0">
          <span class="inline-flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
            <svg class="w-4 h-4 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path></svg>
            scroll to explore
          </span>
        </div>
      </div>
    </section>
  `,
  styles: [`:host { display: block; }`],
})
export class ScrollTransitionComponent implements AfterViewInit {
  @ViewChild('section') sectionRef!: ElementRef<HTMLElement>;
  @ViewChild('content') contentRef!: ElementRef<HTMLElement>;

  title = input('Beyond Vision');
  subtitle = input('Discover');
  label = input('transition');
  hint = input('Keep scrolling to continue the journey');

  private platformId = inject(PLATFORM_ID);

  ngAfterViewInit() {
    if (!isPlatformBrowser(this.platformId)) return;

    gsap.registerPlugin(ScrollTrigger);
    const section = this.sectionRef.nativeElement;
    const content = this.contentRef.nativeElement;
    const children = content.querySelectorAll('.transition-item');

    gsap.set(children, { y: 40, opacity: 0 });

    ScrollTrigger.create({
      trigger: section,
      start: 'top 75%',
      end: 'top 25%',
      scrub: 1,
      onUpdate: (self) => {
        const p = self.progress;
        gsap.to(children, { y: 40 * (1 - p), opacity: p, duration: 0.1, stagger: 0.08 });
      },
    });
  }
}
