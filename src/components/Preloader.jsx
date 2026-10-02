"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function Preloader() {
  const [removed, setRemoved] = useState(false);
  const preloaderRef = useRef(null);
  const pathRef = useRef(null);
  const logoWrapperRef = useRef(null);
  const shineRef = useRef(null);

  useEffect(() => {
    if (!preloaderRef.current) return;

    const curve = "M0 502S175 272 500 272s500 230 500 230V0H0Z";
    const flat = "M0 2S175 1 500 1s500 1 500 1V0H0Z";

    const tl = gsap.timeline({
      onComplete: () => {
        setRemoved(true);
      },
    });

    // 1. Initial entrance: big logo appears calmly and settles
    if (logoWrapperRef.current) {
      tl.fromTo(
        logoWrapperRef.current,
        { scale: 0.88, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.75, ease: "power2.out" }
      );
    }

    // 2. Pause & wait before shine starts, letting user view the logo
    // 3. Optical Glass Glance Shine sweeps smoothly from left to right with high glowiness
    if (shineRef.current) {
      tl.fromTo(
        shineRef.current,
        { x: "-130%" },
        { x: "130%", duration: 1.8, ease: "power1.inOut" },
        "+=0.35"
      );
    }

    // 4. Momentary pause after shine, then small-to-big zoom with radiant bloom
    if (logoWrapperRef.current) {
      tl.to(
        logoWrapperRef.current,
        {
          scale: 1.35,
          filter:
            "brightness(2.2) drop-shadow(0 0 40px #ffffff) drop-shadow(0 0 70px rgba(255, 255, 255, 0.9)) drop-shadow(0 0 100px rgba(199, 156, 101, 0.8))",
          opacity: 0,
          duration: 0.7,
          ease: "power2.in",
        },
        "+=0.2"
      );
    }

    // 5. SVG wave curtain morphing
    if (pathRef.current) {
      tl.to(
        pathRef.current,
        {
          duration: 0.38,
          attr: { d: curve },
          ease: "power2.in",
        },
        "-=0.45"
      ).to(pathRef.current, {
        duration: 0.55,
        attr: { d: flat },
        ease: "power2.out",
      });
    }

    // 6. Preloader curtain slide up smoothly
    tl.to(
      preloaderRef.current,
      {
        y: -1500,
        duration: 0.9,
        ease: "power2.inOut",
      },
      "-=0.3"
    );
  }, []);

  if (removed) return null;

  return (
    <div
      ref={preloaderRef}
      className="preloader"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100vh",
        zIndex: 999999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#000000",
        overflow: "hidden",
      }}
    >
      {/* Background SVG Wave Curtain in Pure Solid Black — No background glow */}
      <svg
        viewBox="0 0 1000 1000"
        preserveAspectRatio="none"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          fill: "#000000",
          zIndex: 1,
        }}
      >
        <path
          ref={pathRef}
          id="svg"
          d="M0,1005S175,995,500,995s500,5,500,5V0H0Z"
        ></path>
      </svg>

      {/* Prominent Large Logo on Solid Black Backdrop */}
      <div
        ref={logoWrapperRef}
        style={{
          position: "relative",
          zIndex: 10,
          display: "inline-block",
        }}
      >
        {/* Large Crisp Logo */}
        <img
          src="/images/logokavi.png"
          alt="KaviScript Logo"
          style={{
            maxHeight: "150px",
            height: "auto",
            width: "clamp(340px, 46vw, 580px)",
            maxWidth: "92vw",
            objectFit: "contain",
            display: "block",
            filter: "drop-shadow(0 8px 24px rgba(0, 0, 0, 0.8))",
          }}
        />

        {/* Shine Layer — Strictly Masked to Logo Pixels Only */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            WebkitMaskImage: "url('/images/logokavi.png')",
            maskImage: "url('/images/logokavi.png')",
            WebkitMaskSize: "contain",
            maskSize: "contain",
            WebkitMaskRepeat: "no-repeat",
            maskRepeat: "no-repeat",
            WebkitMaskPosition: "center",
            maskPosition: "center",
            pointerEvents: "none",
            overflow: "hidden",
            mixBlendMode: "screen",
          }}
        >
          {/* Intense Radiant Glowing Beam Sweeping Left-to-Right */}
          <div
            ref={shineRef}
            style={{
              position: "absolute",
              top: "-60%",
              left: "-60%",
              width: "280%",
              height: "220%",
              background:
                "linear-gradient(110deg, transparent 15%, rgba(255, 255, 255, 0.05) 30%, rgba(255, 255, 255, 0.45) 43%, rgba(255, 255, 255, 1) 48.5%, #ffffff 50%, rgba(255, 255, 255, 1) 51.5%, rgba(255, 255, 255, 0.45) 57%, rgba(255, 255, 255, 0.05) 70%, transparent 85%)",
              filter:
                "drop-shadow(0 0 18px #ffffff) drop-shadow(0 0 36px #ffffff) drop-shadow(0 0 70px rgba(255, 255, 255, 0.95)) drop-shadow(0 0 110px rgba(212, 175, 55, 0.85))",
              transform: "translateX(-130%)",
            }}
          >
            {/* Ultra-luminous center laser streak for maximum shine glowiness */}
            <div
              style={{
                position: "absolute",
                top: 0,
                bottom: 0,
                left: "50%",
                width: "4px",
                transform: "translateX(-50%) rotate(20deg)",
                background: "#ffffff",
                boxShadow:
                  "0 0 25px 12px #ffffff, 0 0 50px 24px rgba(255, 255, 255, 0.9), 0 0 80px 36px rgba(212, 175, 55, 0.8)",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
