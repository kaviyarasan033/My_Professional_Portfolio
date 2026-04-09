import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { useTheme } from '../context/ThemeContext';

const ThreeBackground: React.FC = () => {
  const canvasHostRef = useRef<HTMLDivElement>(null);
  const { isDarkMode } = useTheme();
  const particlesRef = useRef<THREE.Points | null>(null);

  useEffect(() => {
    if (!canvasHostRef.current) return;

    const host = canvasHostRef.current;
    const width = host.offsetWidth;
    const height = host.offsetHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 30;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    host.appendChild(renderer.domElement);

    const count = 800;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const primaryGreen = 0x00c853;
    const primaryYellow = 0xffd700;

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 120;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 120;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 80;

      const t = Math.random();
      const r = (((primaryGreen >> 16) & 0xff) / 255) * (1 - t) + (((primaryYellow >> 16) & 0xff) / 255) * t;
      const g = (((primaryGreen >> 8) & 0xff) / 255) * (1 - t) + (((primaryYellow >> 8) & 0xff) / 255) * t;
      const b = ((primaryGreen & 0xff) / 255) * (1 - t) + ((primaryYellow & 0xff) / 255) * t;
      colors[i * 3] = r;
      colors[i * 3 + 1] = g;
      colors[i * 3 + 2] = b;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    const material = new THREE.PointsMaterial({
      size: 0.3,
      vertexColors: true,
      transparent: true,
      opacity: isDarkMode ? 0.4 : 0.25,
      sizeAttenuation: true,
    });
    const particles = new THREE.Points(geometry, material);
    scene.add(particles);
    particlesRef.current = particles;

    let mouseX = 0.5;
    let mouseY = 0.5;
    let targetMouseX = 0.5;
    let targetMouseY = 0.5;
    let scrollProgress = 0;

    const onMouseMove = (e: MouseEvent) => {
      targetMouseX = e.clientX / window.innerWidth;
      targetMouseY = e.clientY / window.innerHeight;
    };
    const onScroll = () => {
      const doc = document.documentElement;
      scrollProgress = (doc.scrollTop + window.innerHeight) / doc.scrollHeight;
    };
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    const onResize = () => {
      const w = host.offsetWidth;
      const h = host.offsetHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', onResize);

    let frameId: number;
    const animate = () => {
      frameId = requestAnimationFrame(animate);
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      camera.position.x = (mouseX - 0.5) * 6;
      camera.position.y = (mouseY - 0.5) * -4;
      camera.lookAt(0, 0, 0);

      const sp = Math.min(scrollProgress * 1.2, 1);
      camera.position.z = 30 + sp * 20;
      particles.rotation.y += 0.0005 + sp * 0.0003;
      particles.rotation.x += 0.0002 + sp * 0.0001;

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      window.removeEventListener('resize', onResize);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(frameId);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      if (host.contains(renderer.domElement)) {
        host.removeChild(renderer.domElement);
      }
    };
  }, []);

  useEffect(() => {
    if (particlesRef.current) {
        (particlesRef.current.material as THREE.PointsMaterial).opacity = isDarkMode ? 0.4 : 0.25;
    }
  }, [isDarkMode]);

  return <div ref={canvasHostRef} className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0" />;
};

export default ThreeBackground;
