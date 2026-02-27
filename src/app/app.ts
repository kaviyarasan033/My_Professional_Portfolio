import { ChangeDetectionStrategy, Component, OnInit, AfterViewInit, inject, PLATFORM_ID, ElementRef, ViewChild } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { NavbarComponent } from './navbar';
import { HeroComponent } from './hero';
import { AboutComponent } from './about';
import { SkillsComponent } from './skills';
import { ProjectsComponent } from './projects';
import { ServicesComponent } from './services';
import { ContactComponent } from './contact';
import { FooterComponent } from './footer';
import { ThemeService } from './theme.service';
import { ToastContainerComponent } from './toast.component';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-root',
  imports: [
    NavbarComponent,
    HeroComponent,
    AboutComponent,
    SkillsComponent,
    ProjectsComponent,
    ServicesComponent,
    ContactComponent,
    FooterComponent,
    ToastContainerComponent
  ],
  template: `
    <div class="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-white transition-colors duration-300 font-sans selection:bg-primary-green/30 selection:text-primary-green relative overflow-x-hidden">
      
      <div class="fixed inset-0 z-0 pointer-events-none overflow-hidden select-none">

        <div class="absolute top-[45%] left-[2%] lg:left-[10%] opacity-40 blur-[2px] font-mono text-xs lg:text-sm bg-clip-text text-transparent bg-gradient-to-r from-primary-yellow to-amber-500 animate-[pulse_6s_ease-in-out_infinite_reverse]">
          <pre><code>public function handle(Request $request) &#123;
    $user = User::findOrFail($id);
    return response()->json($user);
&#125;</code></pre>
        </div>

        <div class="absolute top-[10%] right-[10%] lg:right-[25%] opacity-40 blur-[1px] font-mono text-sm lg:text-base bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-500 animate-[pulse_5s_ease-in-out_infinite]">
          <pre><code>def process_data(df):
    df = df.dropna()
    return df.groupby('category').mean()</code></pre>
        </div>

        <div class="absolute top-[75%] left-[10%] lg:left-[20%] opacity-30 blur-[2px] font-mono text-xs lg:text-sm bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500 animate-[pulse_7s_ease-in-out_infinite]">
          <pre><code>app.get('/api/data', (req, res) => &#123;
  res.status(200).send(&#123; status: 'ok' &#125;);
&#125;);</code></pre>
        </div>
        
        <div class="absolute top-[30%] right-[5%] lg:right-[15%] opacity-30 blur-[2px] font-mono text-xs lg:text-sm bg-clip-text text-transparent bg-gradient-to-r from-red-400 to-orange-500 animate-[pulse_8s_ease-in-out_infinite_reverse]">
          <pre><code>&#64;Component(&#123;
  selector: 'app-root',
  standalone: true
&#125;)</code></pre>
        </div>

      </div>

      <!-- Orbit Circle -->
      <div class="fixed inset-0 z-0 pointer-events-none" #orbitContainer>
        <div class="absolute top-[40%] right-[-10%] w-[600px] h-[600px] lg:w-[750px] lg:h-[750px] opacity-100" #orbitCircle>
          
          <div class="absolute w-full h-full border-[3px] border-primary-green/60 dark:border-primary-green/80 rounded-full animate-[spin_40s_linear_infinite] shadow-[0_0_40px_rgba(0,200,83,0.5)] dark:shadow-[0_0_60px_rgba(0,200,83,0.7)]"></div>

          <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 border-[3px] border-primary-yellow/60 dark:border-primary-yellow/80 rounded-full animate-[spin_25s_linear_infinite_reverse] shadow-[0_0_40px_rgba(255,215,0,0.5)] dark:shadow-[0_0_60px_rgba(255,215,0,0.7)]"></div>

          <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2 h-1/2 border-[3px] border-primary-green/70 dark:border-primary-green/90 rounded-full animate-[spin_15s_linear_infinite] shadow-[0_0_40px_rgba(0,200,83,0.5)] dark:shadow-[0_0_60px_rgba(0,200,83,0.7)]"></div>

          <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-28 h-28 lg:w-36 lg:h-36 text-primary-green drop-shadow-[0_0_30px_rgba(0,200,83,1)] dark:drop-shadow-[0_0_50px_rgba(0,200,83,1)] animate-[pulse_3s_ease-in-out_infinite]">
            <svg viewBox="-11.5 -10.23174 23 20.46348" xmlns="http://www.w3.org/2000/svg">
              <circle cx="0" cy="0" r="2.05" fill="currentColor"/>
              <g stroke="currentColor" stroke-width="1" fill="none">
                <ellipse rx="11" ry="4.2"/>
                <ellipse rx="11" ry="4.2" transform="rotate(60)"/>
                <ellipse rx="11" ry="4.2" transform="rotate(120)"/>
              </g>
            </svg>
          </div>

          <div class="absolute w-full h-full animate-[spin_40s_linear_infinite]">
            <div class="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 lg:w-24 lg:h-24 bg-white dark:bg-slate-800 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(0,0,0,0.3)] dark:shadow-[0_0_40px_rgba(255,255,255,0.2)] border-2 border-slate-200 dark:border-slate-600 animate-[spin_40s_linear_infinite_reverse]">
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg" alt="Angular" class="w-12 h-12 lg:w-16 lg:h-16 drop-shadow-lg"/>
            </div>
            <div class="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-20 h-20 lg:w-24 lg:h-24 bg-white dark:bg-slate-800 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(0,0,0,0.3)] dark:shadow-[0_0_40px_rgba(255,255,255,0.2)] border-2 border-slate-200 dark:border-slate-600 animate-[spin_40s_linear_infinite_reverse]">
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" alt="Python" class="w-12 h-12 lg:w-16 lg:h-16 drop-shadow-lg"/>
            </div>
            <div class="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 w-20 h-20 lg:w-24 lg:h-24 bg-white dark:bg-slate-800 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(0,0,0,0.3)] dark:shadow-[0_0_40px_rgba(255,255,255,0.2)] border-2 border-slate-200 dark:border-slate-600 animate-[spin_40s_linear_infinite_reverse]">
              <span class="font-bold text-xl lg:text-2xl text-slate-800 dark:text-slate-200 drop-shadow-lg">n8n</span>
            </div>
          </div>

          <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 animate-[spin_25s_linear_infinite_reverse]">
            <div class="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 w-20 h-20 lg:w-24 lg:h-24 bg-white dark:bg-slate-800 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(0,0,0,0.3)] dark:shadow-[0_0_40px_rgba(255,255,255,0.2)] border-2 border-slate-200 dark:border-slate-600 animate-[spin_25s_linear_infinite]">
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg" alt="PHP" class="w-12 h-12 lg:w-16 lg:h-16 drop-shadow-lg"/>
            </div>
            <div class="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 w-20 h-20 lg:w-24 lg:h-24 bg-white dark:bg-slate-800 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(0,0,0,0.3)] dark:shadow-[0_0_40px_rgba(255,255,255,0.2)] border-2 border-slate-200 dark:border-slate-600 animate-[spin_25s_linear_infinite]">
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-original.svg" alt="Laravel" class="w-12 h-12 lg:w-16 lg:h-16 drop-shadow-lg"/>
            </div>
            <div class="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 lg:w-24 lg:h-24 bg-white dark:bg-slate-800 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(0,0,0,0.3)] dark:shadow-[0_0_40px_rgba(255,255,255,0.2)] border-2 border-slate-200 dark:border-slate-600 animate-[spin_25s_linear_infinite]">
              <span class="font-bold text-xl lg:text-2xl text-primary-green drop-shadow-[0_0_10px_rgba(0,200,83,0.8)]">AI</span>
            </div>
          </div>

          <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2 h-1/2 animate-[spin_15s_linear_infinite]">
            <div class="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-16 h-16 lg:w-20 lg:h-20 bg-white dark:bg-slate-800 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(0,0,0,0.3)] dark:shadow-[0_0_40px_rgba(255,255,255,0.2)] border-2 border-slate-200 dark:border-slate-600 animate-[spin_15s_linear_infinite_reverse]">
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" alt="Next.js" class="w-10 h-10 lg:w-12 lg:h-12 dark:invert drop-shadow-lg"/>
            </div>
          </div>

        </div>
      </div>

      <app-toast-container></app-toast-container>
      <app-navbar></app-navbar>
      
      <main class="relative z-10">
        <app-hero id="section-hero"></app-hero>
        <app-about id="section-about"></app-about>
        <app-skills id="section-skills"></app-skills>
        <app-projects id="section-projects"></app-projects>
        <app-services id="section-services"></app-services>
        <app-contact id="section-contact"></app-contact>
      </main>
      
      <app-footer id="section-footer" class="relative z-10"></app-footer>
    </div>
  `,
  styles: []
})
export class App implements OnInit, AfterViewInit {
  @ViewChild('orbitCircle') orbitCircleRef!: ElementRef;
  
  private themeService = inject(ThemeService);
  private platformId = inject(PLATFORM_ID);

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.themeService.isDarkMode();
    }
  }

ngAfterViewInit() {
  if (!isPlatformBrowser(this.platformId)) return;

  gsap.registerPlugin(ScrollTrigger);

  const mm = gsap.matchMedia();

  mm.add("(min-width: 1024px)", () => {

    gsap.set(this.orbitCircleRef.nativeElement, {
      x: '5vw',
      y: '-15vh',
      scale: 1,
      filter: 'blur(0px)',
      opacity: 1
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "main",
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
      }
    });

    tl.to(this.orbitCircleRef.nativeElement, {
      x: '-10vw',
      y: '15vh',
      scale: 0.9,
      filter: 'blur(4px)',
      opacity: 0.8,
      ease: "none"
    })
    .to(this.orbitCircleRef.nativeElement, {
      x: '10vw',
      y: '30vh',
      scale: 0.8,
      filter: 'blur(8px)',
      opacity: 0.6,
      ease: "none"
    })
    .to(this.orbitCircleRef.nativeElement, {
      x: '-15vw',
      y: '45vh',
      scale: 0.7,
      filter: 'blur(12px)',
      opacity: 0.4,
      ease: "none"
    })
    .to(this.orbitCircleRef.nativeElement, {
      x: '0vw',
      y: '60vh',
      scale: 0.6,
      filter: 'blur(16px)',
      opacity: 0.2,
      ease: "none"
    });

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  });

  mm.add("(max-width: 1023px)", () => {

    gsap.set(this.orbitCircleRef.nativeElement, {
      x: '0vw',
      y: '20vh',
      scale: 0.6,
      filter: 'blur(20px)',
      opacity: 0.25
    });

  });
}
}