import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ThemeProvider } from './context/ThemeContext';
import { ToastProvider } from './context/ToastContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Services from './components/Services';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ThreeBackground from './components/ThreeBackground';
import ScrollTransition from './components/ScrollTransition';

const AppContent: React.FC = () => {
  const orbitCircleRef = useRef<HTMLDivElement>(null);
  const codeRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      if (!orbitCircleRef.current) return;

      gsap.set(orbitCircleRef.current, {
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

      tl.to(orbitCircleRef.current, {
        x: '-10vw',
        y: '15vh',
        scale: 0.9,
        filter: 'blur(4px)',
        opacity: 0.8,
        ease: "none"
      })
      .to(orbitCircleRef.current, {
        x: '10vw',
        y: '30vh',
        scale: 0.8,
        filter: 'blur(8px)',
        opacity: 0.6,
        ease: "none"
      })
      .to(orbitCircleRef.current, {
        x: '-15vw',
        y: '45vh',
        scale: 0.7,
        filter: 'blur(12px)',
        opacity: 0.4,
        ease: "none"
      })
      .to(orbitCircleRef.current, {
        x: '0vw',
        y: '60vh',
        scale: 0.6,
        filter: 'blur(16px)',
        opacity: 0.2,
        ease: "none"
      });

      const yOffsets = [80, -60, 100, -80];
      codeRefs.current.forEach((el, i) => {
        if (!el) return;
        gsap.to(el, {
          y: yOffsets[i],
          scrollTrigger: {
            trigger: "main",
            start: "top top",
            end: "bottom bottom",
            scrub: 1.5,
          ease: "none",
        });
      });

      return () => {
        tl.kill();
        ScrollTrigger.getAll().forEach(t => t.kill());
      };
    });

    mm.add("(max-width: 1023px)", () => {
      if (!orbitCircleRef.current) return;
      gsap.set(orbitCircleRef.current, {
        x: '0vw',
        y: '20vh',
        scale: 0.6,
        filter: 'blur(20px)',
        opacity: 0.25
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-white transition-colors duration-300 font-sans selection:bg-primary-green/30 selection:text-primary-green relative overflow-x-hidden">
      
      {/* Background Layer */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden select-none">
        <ThreeBackground />
        
        {/* Code Snippets */}
        <div ref={el => codeRefs.current[0] = el} className="absolute top-[45%] left-[2%] lg:left-[10%] opacity-40 blur-[2px] font-mono text-xs lg:text-sm bg-clip-text text-transparent bg-gradient-to-r from-primary-yellow to-amber-500">
          <pre><code>{`public function handle(Request $request) {
    $user = User::findOrFail($id);
    return response()->json($user);
}`}</code></pre>
        </div>

        <div ref={el => codeRefs.current[1] = el} className="absolute top-[10%] right-[10%] lg:right-[25%] opacity-40 blur-[1px] font-mono text-sm lg:text-base bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-500">
          <pre><code>{`def process_data(df):
    df = df.dropna()
    return df.groupby('category').mean()`}</code></pre>
        </div>

        <div ref={el => codeRefs.current[2] = el} className="absolute top-[75%] left-[10%] lg:left-[20%] opacity-30 blur-[2px] font-mono text-xs lg:text-sm bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
          <pre><code>{`app.get('/api/data', (req, res) => {
  res.status(200).send({ status: 'ok' });
});`}</code></pre>
        </div>
        
        <div ref={el => codeRefs.current[3] = el} className="absolute top-[30%] right-[5%] lg:right-[15%] opacity-30 blur-[2px] font-mono text-xs lg:text-sm bg-clip-text text-transparent bg-gradient-to-r from-red-400 to-orange-500">
          <pre><code>{`const App = () => {
  return <div className="app">React</div>
}`}</code></pre>
        </div>
      </div>

      {/* Orbit Section */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div ref={orbitCircleRef} className="absolute top-[45%] right-[-10%] w-[420px] h-[420px] lg:w-[750px] lg:h-[750px] orbit-circle pointer-events-auto">
          
          <div className="absolute w-full h-full border-[3px] border-primary-green/60 dark:border-primary-green/80 rounded-full animate-[spin_40s_linear_infinite] shadow-[0_0_40px_rgba(0,200,83,0.5)] dark:shadow-[0_0_60px_rgba(0,200,83,0.7)] group-hover:border-primary-green group-hover:shadow-[0_0_25px_rgba(0,200,83,1),0_0_60px_rgba(0,200,83,0.7),0_0_120px_rgba(0,200,83,0.4),inset_0_0_40px_rgba(0,200,83,0.15)]"></div>

          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 border-[3px] border-primary-yellow/60 dark:border-primary-yellow/80 rounded-full animate-[spin_25s_linear_infinite_reverse] shadow-[0_0_40px_rgba(255,215,0,0.5)] dark:shadow-[0_0_60px_rgba(255,215,0,0.7)] group-hover:border-primary-yellow group-hover:shadow-[0_0_25px_rgba(255,215,0,1),0_0_60px_rgba(255,215,0,0.7),0_0_120px_rgba(255,215,0,0.4),inset_0_0_40px_rgba(255,215,0,0.15)]"></div>

          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2 h-1/2 border-[3px] border-primary-green/70 dark:border-primary-green/90 rounded-full animate-[spin_15s_linear_infinite] shadow-[0_0_40px_rgba(0,200,83,0.5)] dark:shadow-[0_0_60px_rgba(0,200,83,0.7)] group-hover:border-primary-green group-hover:shadow-[0_0_25px_rgba(0,200,83,1),0_0_60px_rgba(0,200,83,0.7),0_0_120px_rgba(0,200,83,0.4),inset_0_0_40px_rgba(0,200,83,0.15)]"></div>

          {/* Central Logo */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-25 h-25 text-primary-green drop-shadow-[0_0_30px_rgba(0,200,83,1)] dark:drop-shadow-[0_0_50px_rgba(0,200,83,1)] animate-[spin_20s_linear_infinite,pulse_3s_ease-in-out_infinite]">
            <svg viewBox="-11.5 -10.23174 23 20.46348" xmlns="http://www.w3.org/2000/svg">
              <circle cx="0" cy="0" r="2.05" fill="currentColor"/>
              <g stroke="currentColor" strokeWidth="1" fill="none">
                <ellipse rx="11" ry="4.2"/>
                <ellipse rx="11" ry="4.2" transform="rotate(60)"/>
                <ellipse rx="11" ry="4.2" transform="rotate(120)"/>
              </g>
            </svg>
          </div>

          {/* Outer Ring Icons */}
          <div className="absolute w-full h-full animate-[spin_40s_linear_infinite]">
            {[
              { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", alt: "React", pos: "top-0 left-1/2 -translate-x-1/2 -translate-y-1/2" },
              { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg", alt: "Python", pos: "bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2" },
              { text: "n8n", pos: "top-1/2 left-0 -translate-x-1/2 -translate-y-1/2", isText: true },
              { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg", alt: "MongoDB", pos: "top-1/2 right-0 translate-x-1/2 -translate-y-1/2" },
              { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg", alt: "Firebase", pos: "top-[14.6%] left-[85.4%] -translate-x-1/2 -translate-y-1/2" },
              { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg", alt: "TypeScript", pos: "top-[85.4%] left-[14.6%] -translate-x-1/2 -translate-y-1/2", small: true }
            ].map((icon, idx) => (
              <div key={idx} className={`absolute ${icon.pos} w-12 h-12 lg:w-14 lg:h-14 bg-white dark:bg-slate-800 rounded-full flex items-center justify-center shadow-lg border-2 border-slate-200 dark:border-slate-600 animate-[spin_40s_linear_infinite_reverse]`}>
                {icon.isText ? (
                  <span className="font-bold text-sm lg:text-base text-slate-800 dark:text-slate-200">n8n</span>
                ) : (
                  <img src={icon.src} alt={icon.alt} className={`${icon.small ? 'w-5 h-5 lg:w-6 lg:h-6' : 'w-7 h-7 lg:w-9 lg:h-9'} drop-shadow-lg`} />
                )}
              </div>
            ))}
          </div>

          {/* Middle Ring Icons */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 animate-[spin_25s_linear_infinite_reverse]">
            {[
              { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg", alt: "PHP", pos: "top-1/2 right-0 translate-x-1/2 -translate-y-1/2" },
              { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-original.svg", alt: "Laravel", pos: "top-1/2 left-0 -translate-x-1/2 -translate-y-1/2" },
              { text: "AI", pos: "top-0 left-1/2 -translate-x-1/2 -translate-y-1/2", isAI: true },
              { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg", alt: "MySQL", pos: "bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2" },
              { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg", alt: "Docker", pos: "top-[14.6%] left-[85.4%] -translate-x-1/2 -translate-y-1/2" },
              { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg", alt: "PostgreSQL", pos: "top-[85.4%] left-[14.6%] -translate-x-1/2 -translate-y-1/2" }
            ].map((icon, idx) => (
              <div key={idx} className={`absolute ${icon.pos} w-12 h-12 lg:w-14 lg:h-14 bg-white dark:bg-slate-800 rounded-full flex items-center justify-center shadow-lg border-2 border-slate-200 dark:border-slate-600 animate-[spin_25s_linear_infinite]`}>
                {icon.isAI ? (
                  <span className="font-bold text-sm lg:text-base text-primary-green drop-shadow-md">AI</span>
                ) : (
                  <img src={icon.src} alt={icon.alt} className="w-7 h-7 lg:w-9 lg:h-9 drop-shadow-lg" />
                )}
              </div>
            ))}
          </div>

          {/* Inner Ring Icons */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2 h-1/2 animate-[spin_15s_linear_infinite]">
            {[
              { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg", alt: "Next.js", pos: "bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2", darkInvert: true },
              { text: "API", pos: "top-0 left-1/2 -translate-x-1/2 -translate-y-1/2", isAPI: true },
              { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg", alt: "Redis", pos: "top-1/2 right-0 translate-x-1/2 -translate-y-1/2" },
              { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg", alt: "Git", pos: "top-1/2 left-0 -translate-x-1/2 -translate-y-1/2" }
            ].map((icon, idx) => (
              <div key={idx} className={`absolute ${icon.pos} w-9 h-9 lg:w-11 lg:h-11 bg-white dark:bg-slate-800 rounded-full flex items-center justify-center shadow-lg border-2 border-slate-200 dark:border-slate-600 animate-[spin_15s_linear_infinite_reverse]`}>
                {icon.isAPI ? (
                  <span className="font-bold text-xs lg:text-sm text-primary-yellow">API</span>
                ) : (
                  <img src={icon.src} alt={icon.alt} className={`w-5 h-5 lg:w-7 lg:h-7 ${icon.darkInvert ? 'dark:invert' : ''} drop-shadow-lg`} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <Navbar />
      
      <main className="relative z-10">
        <Hero />
        <ScrollTransition title="Beyond Vision" subtitle="Discover" hint="Keep scrolling to continue the journey" />
        <About />
        <ScrollTransition title="Skills & Tools" subtitle="Expertise" hint="Technologies I work with" />
        <Skills />
        <ScrollTransition title="Featured Work" subtitle="Projects" hint="A selection of passionately crafted work" />
        <Projects />
        <ScrollTransition title="What I Offer" subtitle="Services" hint="Solutions tailored to your needs" />
        <Services />
        <ScrollTransition title="Let's Connect" subtitle="Contact" hint="Ready to build something together?" />
        <Contact />
      </main>
      
      <Footer />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <ToastProvider>
        <AppContent />
      </ToastProvider>
    </ThemeProvider>
  );
};

export default App;
