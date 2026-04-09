import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MoveDown } from 'lucide-react';

interface ScrollTransitionProps {
  title?: string;
  subtitle?: string;
  label?: string;
  hint?: string;
}

const ScrollTransition: React.FC<ScrollTransitionProps> = ({
  title = 'Beyond Vision',
  subtitle = 'Discover',
  label = 'transition',
  hint = 'Keep scrolling to continue the journey',
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    if (sectionRef.current && contentRef.current) {
      const section = sectionRef.current;
      const content = contentRef.current;
      const children = content.querySelectorAll('.transition-item');

      gsap.set(children, { y: 40, opacity: 0 });

      const st = ScrollTrigger.create({
        trigger: section,
        start: 'top 75%',
        end: 'top 25%',
        scrub: 1,
        onUpdate: (self) => {
          const p = self.progress;
          gsap.to(children, { y: 40 * (1 - p), opacity: p, duration: 0.1, stagger: 0.08 });
        },
      });

      return () => {
        st.kill();
      };
    }
  }, []);

  return (
    <section ref={sectionRef} className="relative py-16 md:py-24 min-h-[40vh] flex items-center justify-center overflow-hidden" data-label={label}>
      <div ref={contentRef} className="text-center">
        <p className="transition-item text-sm md:text-base font-mono tracking-[0.3em] uppercase text-primary-green opacity-0">{subtitle}</p>
        <h3 className="transition-item text-2xl md:text-4xl lg:text-5xl font-display font-bold text-slate-900 dark:text-white mt-2 opacity-0">{title}</h3>
        <p className="transition-item text-slate-500 dark:text-slate-400 mt-4 max-w-lg mx-auto opacity-0">{hint}</p>
        <div className="transition-item mt-8 flex justify-center opacity-0">
          <span className="inline-flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
            <MoveDown className="w-4 h-4 animate-bounce" />
            scroll to explore
          </span>
        </div>
      </div>
    </section>
  );
};

export default ScrollTransition;
