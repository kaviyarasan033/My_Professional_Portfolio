"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const outerRef = useRef(null);
  const innerRef = useRef(null);

  useEffect(() => {
    if (!outerRef.current || !innerRef.current) return;

    const xOuter = gsap.quickTo(outerRef.current, "x", { duration: 0.25, ease: "power2.out" });
    const yOuter = gsap.quickTo(outerRef.current, "y", { duration: 0.25, ease: "power2.out" });
    const xInner = gsap.quickTo(innerRef.current, "x", { duration: 0.08, ease: "power2.out" });
    const yInner = gsap.quickTo(innerRef.current, "y", { duration: 0.08, ease: "power2.out" });

    const onMouseMove = (e) => {
      xOuter(e.clientX);
      yOuter(e.clientY);
      xInner(e.clientX);
      yInner(e.clientY);
    };

    const onMouseOver = (e) => {
      if (e.target.closest("a, button, .cursor-pointer, .theme-btn-main, .project-btn, input, textarea")) {
        outerRef.current?.classList.add("cursor-hover");
        innerRef.current?.classList.add("cursor-hover");
      }
    };

    const onMouseOut = (e) => {
      if (e.target.closest("a, button, .cursor-pointer, .theme-btn-main, .project-btn, input, textarea")) {
        outerRef.current?.classList.remove("cursor-hover");
        innerRef.current?.classList.remove("cursor-hover");
      }
    };

    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseover", onMouseOver);
    document.addEventListener("mouseout", onMouseOut);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseover", onMouseOver);
      document.removeEventListener("mouseout", onMouseOut);
    };
  }, []);

  return (
    <>
      <div
        ref={outerRef}
        className="mouseCursor cursor-outer d-none d-lg-block"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          pointerEvents: "none",
          zIndex: 999999,
          backgroundColor: "#C79C65",
          width: 30,
          height: 30,
          borderRadius: "50%",
          transform: "translate(-50%, -50%)",
          mixBlendMode: "normal",
          opacity: 0.85,
        }}
      />
      <div
        ref={innerRef}
        className="mouseCursor cursor-inner d-none d-lg-block"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          pointerEvents: "none",
          zIndex: 999999,
          backgroundColor: "#FFFFFF",
          width: 8,
          height: 8,
          borderRadius: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />
    </>
  );
}
