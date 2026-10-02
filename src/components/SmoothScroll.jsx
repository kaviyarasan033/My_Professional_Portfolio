"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";

export default function SmoothScroll({ children }) {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // 1. Initialize modern butter-smooth Lenis scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
    });

    // Synchronize Lenis with GSAP ScrollTrigger ticker
    lenis.on("scroll", ScrollTrigger.update);

    const updateLenis = (time) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(0);

    // 2. Smooth anchor navigation
    const handleAnchorClick = (e) => {
      const anchor = e.target.closest('a[href^="#"]');
      if (anchor) {
        const href = anchor.getAttribute("href");
        if (href && href !== "#") {
          const target = document.querySelector(href);
          if (target) {
            e.preventDefault();
            lenis.scrollTo(target, { offset: -70 });
          }
        }
      }
    };
    document.addEventListener("click", handleAnchorClick);

    // 3. Sticky Header on Scroll
    const header = document.getElementById("sticky-header");
    const headerHeight = document.getElementById("header-fixed-height");
    if (header) {
      ScrollTrigger.create({
        start: "top -100",
        onUpdate: (self) => {
          if (
            document.querySelector(".mobile-menu-overlay.active") ||
            document.querySelector(".offcanvas-overlay.active")
          ) {
            return;
          }
          if (self.scroll() > 100) {
            header.classList.add("sticky-menu");
            headerHeight?.classList.add("active-height");
          } else {
            header.classList.remove("sticky-menu");
            headerHeight?.classList.remove("active-height");
          }
        },
      });
    }

    // 4. Back to top floating button
    const backTop = document.getElementById("back-top");
    if (backTop) {
      ScrollTrigger.create({
        start: 350,
        onUpdate: (self) => {
          if (self.scroll() > 350) {
            backTop.classList.add("show");
          } else {
            backTop.classList.remove("show");
          }
        },
      });

      backTop.onclick = () => {
        lenis.scrollTo(0, { duration: 1.2 });
      };
    }

    // 5. WOW / fadeInUp Elements Reveal
    const wowElements = document.querySelectorAll(".wow, .fadeInUp");
    wowElements.forEach((el) => {
      const delay = parseFloat(el.getAttribute("data-wow-delay")) || 0;
      gsap.fromTo(
        el,
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 0.85,
          delay: delay,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            toggleActions: "play none none none",
          },
        }
      );
    });

    // 5b. Project Cards Symmetrical On-Scroll Staggered Fade Up (One by One)
    const projectCards = document.querySelectorAll(".project-card-equal");
    projectCards.forEach((card, idx) => {
      const isRightCol = idx % 2 === 1;
      gsap.fromTo(
        card,
        {
          opacity: 0,
          y: 75,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          delay: isRightCol ? 0.18 : 0,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            start: "top 86%",
            toggleActions: "play none none none",
          },
        }
      );
    });

    // 6. Number Counter Animation (.count)
    const countElements = document.querySelectorAll(".count");
    countElements.forEach((el) => {
      const rawText = el.innerText.trim();
      const targetNum = parseInt(rawText.replace(/[^0-9]/g, ""), 10);
      if (!isNaN(targetNum) && targetNum > 0) {
        const counter = { val: 0 };
        gsap.to(counter, {
          val: targetNum,
          duration: 2.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 90%",
            toggleActions: "play none none none",
          },
          onUpdate: () => {
            el.innerText = Math.floor(counter.val);
          },
        });
      }
    });

    // 7. Text Invert Scrub Animation (.text_invert-2)
    const textInverts = document.querySelectorAll(".text_invert-2");
    textInverts.forEach((el) => {
      try {
        const split = new SplitType(el, { types: "lines" });
        if (split.lines && split.lines.length) {
          split.lines.forEach((line) => {
            gsap.to(line, {
              backgroundPositionX: 0,
              ease: "none",
              scrollTrigger: {
                trigger: line,
                scrub: 1,
                start: "top 85%",
                end: "bottom center",
              },
            });
          });
        }
      } catch (err) {}
    });

    // 8. Sub-title Character Animation (.tz-sub-tilte)
    const subTitles = document.querySelectorAll(".tz-sub-tilte");
    subTitles.forEach((el) => {
      try {
        const split = new SplitType(el, { types: "chars,words" });
        if (split.chars && split.chars.length) {
          gsap.set(split.chars, { opacity: 0, x: 8 });
          gsap.to(split.chars, {
            scrollTrigger: {
              trigger: el,
              start: "top 90%",
              end: "top 65%",
              scrub: 1,
            },
            x: 0,
            opacity: 1,
            duration: 0.7,
            stagger: 0.04,
          });
        }
      } catch (err) {}
    });

    // 9. Split Title Reveal Animation (.split-title)
    const splitTitles = document.querySelectorAll(".split-title");
    splitTitles.forEach((el) => {
      try {
        const split = new SplitType(el, { types: "lines" });
        if (split.lines && split.lines.length) {
          gsap.set(el, { perspective: 400 });
          gsap.from(split.lines, {
            duration: 1,
            delay: 0.15,
            opacity: 0,
            rotationX: -60,
            y: 20,
            force3D: true,
            transformOrigin: "top center -50",
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 90%",
              toggleActions: "play none none reverse",
            },
          });
        }
      } catch (err) {}
    });

    // 10. 9-Mask Clip Animation (.clip-animation, .tp-clip-anim)
    const initialClipPaths = [
      "polygon(0% 0%, 0% 0%, 0% 0%, 0% 0%)",
      "polygon(33.33% 0%, 33.33% 0%, 33.33% 0%, 33.33% 0%)",
      "polygon(65.66% 0%, 66.66% 0%, 66.66% 0%, 66.66% 0%)",
      "polygon(0% 33.33%, 0% 33.33%, 0% 33.33%, 0% 33.33%)",
      "polygon(33.33% 33.33%, 33.33% 33.33%, 33.33% 33.33%, 33.33% 33.33%)",
      "polygon(65.66% 33.33%, 66.66% 33.33%, 66.66% 33.33%, 66.66% 33.33%)",
      "polygon(0% 66.66%, 0% 66.66%, 0% 66.66%, 0% 66.66%)",
      "polygon(33.33% 66.66%, 33.33% 66.66%, 33.33% 66.66%, 33.33% 66.66%)",
      "polygon(65.66% 66.66%, 66.66% 66.66%, 66.66% 66.66%, 66.66% 66.66%)",
    ];

    const finalClipPaths = [
      "polygon(0% 0%, 34.33% 0%, 34.33% 34.33%, 0% 34.33%)",
      "polygon(32.33% 0%, 66.66% 0%, 66.66% 33.33%, 33.33% 34.33%)",
      "polygon(65.66% 0%, 100% 0%, 100% 33.33%, 65.66% 34.33%)",
      "polygon(0% 33.33%, 33.33% 33.33%, 33.33% 66.66%, 0% 66.66%)",
      "polygon(30.33% 33.33%, 66.66% 33.33%, 66.66% 66.66%, 33.33% 66.66%)",
      "polygon(65.66% 33.33%, 100% 32.33%, 100% 66.66%, 65.66% 66.66%)",
      "polygon(0% 65.66%, 33.33% 66.66%, 33.33% 100%, 0% 100%)",
      "polygon(30.33% 66.66%, 66.66% 65.66%, 66.66% 100%, 33.33% 100%)",
      "polygon(65.66% 66.66%, 100% 65.66%, 100% 100%, 65.66% 100%)",
    ];

    const clipWrappers = document.querySelectorAll(".clip-animation, .tp-clip-anim");
    clipWrappers.forEach((wrapper) => {
      const img = wrapper.querySelector(
        ".clip-animation-img[data-animate='true'], .tp-anim-img[data-animate='true']"
      );
      if (!img) return;
      const url = img.getAttribute("src");
      if (!url) return;

      if (getComputedStyle(wrapper).position === "static") {
        wrapper.style.position = "relative";
      }

      wrapper.querySelectorAll(".mask").forEach((m) => m.remove());

      const masks = [];
      for (let i = 0; i < 9; i++) {
        const mask = document.createElement("div");
        mask.className = `mask mask-${i + 1}`;
        mask.style.cssText = `
          background-image: url(${url});
          background-size: cover;
          background-position: center;
          position: absolute;
          inset: 0;
          z-index: 2;
        `;
        wrapper.appendChild(mask);
        masks.push(mask);
      }

      gsap.set(masks, {
        clipPath: (i) => initialClipPaths[i],
      });

      const order = [
        [masks[0]],
        [masks[1], masks[3]],
        [masks[2], masks[4], masks[6]],
        [masks[5], masks[7]],
        [masks[8]],
      ];

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapper,
          start: "top 80%",
        },
      });

      order.forEach((group, i) => {
        tl.to(
          group,
          {
            clipPath: (j, el) => finalClipPaths[masks.indexOf(el)],
            duration: 0.9,
            ease: "power4.out",
            stagger: 0.08,
          },
          i * 0.12
        );
      });
    });

    // 11. Magnetic Button Hover (.wt-hover-btn-wrapper)
    const hoverBtns = document.querySelectorAll(".wt-hover-btn-wrapper");
    hoverBtns.forEach((btn) => {
      const item = btn.classList.contains("wt-hover-btn-item")
        ? btn
        : btn.querySelector(".wt-hover-btn-item");
      if (!item) return;

      const handleMove = (e) => {
        const rect = btn.getBoundingClientRect();
        const relX = e.clientX - rect.left;
        const relY = e.clientY - rect.top;
        gsap.to(item, {
          duration: 0.5,
          x: ((relX - rect.width / 2) / rect.width()) * 50,
          y: ((relY - rect.height / 2) / rect.height()) * 50,
          ease: "power2.out",
        });
      };

      const handleLeave = () => {
        gsap.to(item, {
          duration: 0.6,
          x: 0,
          y: 0,
          ease: "power2.out",
        });
      };

      btn.addEventListener("mousemove", handleMove);
      btn.addEventListener("mouseleave", handleLeave);
    });

    // 12. Skills entrance on desktop (.design-choose-item-wrap)
    if (window.innerWidth >= 1200) {
      document.querySelectorAll(".design-choose-item-wrap").forEach((wrap) => {
        const items1 = wrap.querySelectorAll(".design-choose-item-1");
        const items2 = wrap.querySelectorAll(".design-choose-item-2");
        items1.forEach((item1, i) => {
          const item2 = items2[i];
          if (item1 && item2) {
            gsap.set(item1, { x: -150, opacity: 0.5 });
            gsap.set(item2, { x: 150, opacity: 0.5 });
            const tl = gsap.timeline({
              scrollTrigger: {
                trigger: wrap,
                start: "top 85%",
                end: "bottom 65%",
                scrub: 1,
              },
            });
            tl.to(item1, { x: 0, opacity: 1, ease: "power2.out" }).to(
              item2,
              { x: 0, opacity: 1, ease: "power2.out" },
              "<"
            );
          }
        });
      });
    }

    // 13. CTA Banner Scale-Up Parallax (.scale-up-img .scale-up)
    document.querySelectorAll(".scale-up-img .scale-up").forEach((img) => {
      gsap.fromTo(
        img,
        { scale: 1 },
        {
          scale: 1.15,
          ease: "none",
          scrollTrigger: {
            trigger: img,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    });

    // 14. Pinned panels on large screens (.oit-panel-pin)
    if (window.innerWidth >= 1200) {
      document.querySelectorAll(".oit-panel-pin").forEach((section) => {
        ScrollTrigger.create({
          trigger: section,
          pin: section,
          start: section.dataset.start || "top 25%",
          endTrigger: ".oit-panel-pin-area",
          end: section.dataset.end || "bottom 55%",
          scrub: 1,
          pinSpacing: false,
        });
      });
    }

    // Refresh ScrollTrigger once everything is computed
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 400);

    return () => {
      document.removeEventListener("click", handleAnchorClick);
      gsap.ticker.remove(updateLenis);
      lenis.destroy();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return <>{children}</>;
}
