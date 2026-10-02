"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function Preloader() {
  const [removed, setRemoved] = useState(false);
  const preloaderRef = useRef(null);
  const pathRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    if (!preloaderRef.current) return;

    const tl = gsap.timeline({
      onComplete: () => {
        setRemoved(true);
      },
    });

    const curve = "M0 502S175 272 500 272s500 230 500 230V0H0Z";
    const flat = "M0 2S175 1 500 1s500 1 500 1V0H0Z";

    if (textRef.current) {
      tl.to(textRef.current, {
        delay: 0.3,
        y: -100,
        opacity: 0,
        duration: 0.5,
        ease: "power2.out",
      });
    }

    if (pathRef.current) {
      tl.to(pathRef.current, {
        duration: 0.3,
        attr: { d: curve },
        ease: "power2.in",
      }).to(pathRef.current, {
        duration: 0.5,
        attr: { d: flat },
        ease: "power2.out",
      });
    }

    tl.to(
      preloaderRef.current,
      {
        y: -1500,
        duration: 0.8,
        ease: "power2.inOut",
      },
      "-=0.2"
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
      }}
    >
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
        }}
      >
        <path
          ref={pathRef}
          id="svg"
          d="M0,1005S175,995,500,995s500,5,500,5V0H0Z"
        ></path>
      </svg>
      <div
        ref={textRef}
        className="preloader-text"
        style={{
          position: "relative",
          zIndex: 2,
          color: "#ffffff",
          fontWeight: 800,
          letterSpacing: "0.2em",
          fontSize: "2.5rem",
          textTransform: "uppercase",
          fontFamily: "'Cinzel', serif",
        }}
      >
        KAVISCRIPT
      </div>
    </div>
  );
}
