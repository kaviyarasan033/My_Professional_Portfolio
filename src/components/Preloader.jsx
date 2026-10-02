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

    // 1. Initial entrance: big logo appears smoothly
    if (logoWrapperRef.current) {
      tl.fromTo(
        logoWrapperRef.current,
        { scale: 0.88, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.65, ease: "power2.out" }
      );
    }

    // 2. Shine overlay sweeps left to right across the large logo
    if (shineRef.current) {
      tl.fromTo(
        shineRef.current,
        { x: "-110%" },
        { x: "110%", duration: 0.95, ease: "power2.inOut" },
        "+=0.1"
      );
    }

    // 3. After preload: smooth zoom and radiant shine bloom
    if (logoWrapperRef.current) {
      tl.to(
        logoWrapperRef.current,
        {
          scale: 1.3,
          filter: "brightness(2) drop-shadow(0 0 45px rgba(255, 255, 255, 0.95))",
          opacity: 0,
          duration: 0.65,
          ease: "power2.in",
        },
        "+=0.12"
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
        duration: 0.85,
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

      {/* Prominent Large Logo Wrapper — Pure black background, no card/border */}
      <div
        ref={logoWrapperRef}
        style={{
          position: "relative",
          zIndex: 10,
          display: "inline-block",
        }}
      >
        {/* Large High-Resolution Logo */}
        <img
          src="/images/logokavi.png"
          alt="KaviScript Logo"
          style={{
            maxHeight: "145px",
            height: "auto",
            width: "clamp(340px, 46vw, 560px)",
            maxWidth: "92vw",
            objectFit: "contain",
            display: "block",
            filter: "drop-shadow(0 6px 20px rgba(0, 0, 0, 0.7))",
          }}
        />

        {/* Shine Layer — Masked Strictly to the Big Logo Silhouette */}
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
              width: "250%",
              height: "200%",
              background:
                "linear-gradient(115deg, transparent 30%, rgba(255, 255, 255, 0.95) 50%, transparent 70%)",
              transform: "translateX(-110%)",
            }}
          />
        </div>
      </div>
    </div>
  );
}
