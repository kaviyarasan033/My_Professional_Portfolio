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

    // 1. Initial entrance: logo appears gently
    if (logoWrapperRef.current) {
      tl.fromTo(
        logoWrapperRef.current,
        { scale: 0.85, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.6, ease: "power2.out" }
      );
    }

    // 2. Shine overlay sweeps left to right ONLY on the logo
    if (shineRef.current) {
      tl.fromTo(
        shineRef.current,
        { x: "-100%" },
        { x: "100%", duration: 0.9, ease: "power2.inOut" },
        "+=0.1"
      );
    }

    // 3. After preload: small to big zoom and intense shine bloom
    if (logoWrapperRef.current) {
      tl.to(
        logoWrapperRef.current,
        {
          scale: 1.4,
          filter: "brightness(2) drop-shadow(0 0 35px rgba(255, 255, 255, 0.95))",
          opacity: 0,
          duration: 0.65,
          ease: "power2.in",
        },
        "+=0.1"
      );
    }

    // 4. SVG wave curtain morphing
    if (pathRef.current) {
      tl.to(
        pathRef.current,
        {
          duration: 0.35,
          attr: { d: curve },
          ease: "power2.in",
        },
        "-=0.4"
      ).to(pathRef.current, {
        duration: 0.5,
        attr: { d: flat },
        ease: "power2.out",
      });
    }

    // 5. Preloader curtain slide up
    tl.to(
      preloaderRef.current,
      {
        y: -1500,
        duration: 0.8,
        ease: "power2.inOut",
      },
      "-=0.25"
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
      {/* Background SVG Wave Curtain in Pure Black */}
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

      {/* Pure Logo Wrapper — No card, no border, pure black backdrop */}
      <div
        ref={logoWrapperRef}
        style={{
          position: "relative",
          zIndex: 10,
          display: "inline-block",
        }}
      >
        {/* Base Logo Image */}
        <img
          src="/images/logokavi.png"
          alt="KaviScript Logo"
          style={{
            maxHeight: "72px",
            height: "72px",
            width: "auto",
            maxWidth: "280px",
            objectFit: "contain",
            display: "block",
          }}
        />

        {/* Shine Layer — Masked Strictly to the Logo Graphics Only */}
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
          }}
        >
          <div
            ref={shineRef}
            style={{
              position: "absolute",
              top: "-50%",
              left: "-50%",
              width: "200%",
              height: "200%",
              background:
                "linear-gradient(115deg, transparent 35%, rgba(255, 255, 255, 0.95) 50%, transparent 65%)",
              transform: "translateX(-100%)",
            }}
          />
        </div>
      </div>
    </div>
  );
}
