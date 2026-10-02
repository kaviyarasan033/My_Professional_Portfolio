"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function Preloader() {
  const [removed, setRemoved] = useState(false);
  const preloaderRef = useRef(null);
  const pathRef = useRef(null);
  const logoWrapperRef = useRef(null);
  const shineRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    if (!preloaderRef.current) return;

    const curve = "M0 502S175 272 500 272s500 230 500 230V0H0Z";
    const flat = "M0 2S175 1 500 1s500 1 500 1V0H0Z";

    const tl = gsap.timeline({
      onComplete: () => {
        setRemoved(true);
      },
    });

    // 1. Initial logo entrance: gentle scale from small
    if (logoWrapperRef.current) {
      tl.fromTo(
        logoWrapperRef.current,
        { scale: 0.7, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.7, ease: "power2.out" }
      );
    }

    // 2. Surrounding ring spin & pulse
    if (ringRef.current) {
      gsap.to(ringRef.current, {
        rotate: 360,
        duration: 4,
        repeat: -1,
        ease: "linear",
      });
    }

    // 3. Image overlay shine sweeping from left to right
    if (shineRef.current) {
      tl.fromTo(
        shineRef.current,
        { x: "-130%", opacity: 0 },
        { x: "160%", opacity: 1, duration: 0.85, ease: "power2.inOut" },
        "-=0.2"
      );
    }

    // 4. After preload: small to big zoom with radiant shine bloom
    if (logoWrapperRef.current) {
      tl.to(
        logoWrapperRef.current,
        {
          scale: 1.35,
          filter: "brightness(1.6) drop-shadow(0 0 35px rgba(255, 255, 255, 0.95)) drop-shadow(0 0 60px rgba(199, 156, 101, 0.8))",
          opacity: 0,
          duration: 0.65,
          ease: "power2.in",
        },
        "+=0.15"
      );
    }

    // 5. SVG wave morphing
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

    // 6. Preloader container slide up
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
        backgroundColor: "#111013",
        overflow: "hidden",
      }}
    >
      {/* Background SVG Wave Curtain */}
      <svg
        viewBox="0 0 1000 1000"
        preserveAspectRatio="none"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          fill: "#111013",
          zIndex: 1,
        }}
      >
        <path
          ref={pathRef}
          id="svg"
          d="M0,1005S175,995,500,995s500,5,500,5V0H0Z"
        ></path>
      </svg>

      {/* Center Logo Area with Surrounding Animation and Shine */}
      <div
        ref={logoWrapperRef}
        style={{
          position: "relative",
          zIndex: 10,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "30px 45px",
        }}
      >
        {/* Ambient Halo Glow */}
        <div
          style={{
            position: "absolute",
            width: "320px",
            height: "180px",
            borderRadius: "50%",
            background:
              "radial-gradient(ellipse at center, rgba(199, 156, 101, 0.35) 0%, rgba(255, 107, 107, 0.15) 45%, transparent 70%)",
            filter: "blur(24px)",
            pointerEvents: "none",
            animation: "pulseHalo 2s ease-in-out infinite alternate",
          }}
        />

        {/* Rotating Surrounding Accent Ring */}
        <div
          ref={ringRef}
          style={{
            position: "absolute",
            width: "280px",
            height: "140px",
            borderRadius: "40px",
            border: "1.5px solid transparent",
            background:
              "linear-gradient(#111013, #111013) padding-box, linear-gradient(135deg, rgba(199,156,101,0.8), rgba(255,107,107,0.3), rgba(199,156,101,0.8)) border-box",
            boxShadow:
              "0 0 25px rgba(199, 156, 101, 0.25), inset 0 0 15px rgba(199, 156, 101, 0.15)",
            pointerEvents: "none",
          }}
        />

        {/* Logo Container with Left-to-Right Shine Sweep */}
        <div
          style={{
            position: "relative",
            display: "inline-block",
            overflow: "hidden",
            borderRadius: "16px",
            padding: "8px 16px",
          }}
        >
          <img
            src="/images/logokavi.png"
            alt="KaviScript Logo"
            style={{
              maxHeight: "68px",
              height: "68px",
              width: "auto",
              maxWidth: "260px",
              objectFit: "contain",
              display: "block",
              filter: "drop-shadow(0 4px 12px rgba(0, 0, 0, 0.6))",
            }}
          />

          {/* Overlay Metallic / Glass Shine Sweep Left to Right */}
          <div
            ref={shineRef}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              background:
                "linear-gradient(110deg, transparent 20%, rgba(255, 255, 255, 0.65) 45%, rgba(255, 255, 255, 0.95) 50%, rgba(255, 255, 255, 0.65) 55%, transparent 80%)",
              pointerEvents: "none",
              mixBlendMode: "screen",
              transform: "skewX(-20deg)",
            }}
          />
        </div>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
            @keyframes pulseHalo {
              0% { transform: scale(0.92); opacity: 0.6; }
              100% { transform: scale(1.15); opacity: 0.95; }
            }
          `,
        }}
      />
    </div>
  );
}
