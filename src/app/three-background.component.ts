import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewChild,
  AfterViewInit,
  OnDestroy,
  PLATFORM_ID,
  inject,
  effect,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ThemeService } from './theme.service';

type PointsMaterial = { opacity: number };
type PointsObj = { material: PointsMaterial };
type CleanupFn = () => void;

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-three-background',
  standalone: true,
  template: `<div #canvasHost class="absolute inset-0 w-full h-full overflow-hidden"></div>`,
  styles: [`
    :host {
      display: block;
      position: absolute;
      inset: 0;
      z-index: 0;
      pointer-events: none;
    }
  `],
})
export class ThreeBackgroundComponent implements AfterViewInit, OnDestroy {
  @ViewChild('canvasHost', { static: true }) canvasHost!: ElementRef<HTMLDivElement>;

  private platformId = inject(PLATFORM_ID);
  private themeService = inject(ThemeService);
  private particles: PointsObj | null = null;
  private frameId = 0;
  private cleanup: CleanupFn | null = null;

  constructor() {
    effect(() => {
      const dark = this.themeService.isDarkMode();
      if (this.particles?.material) {
        this.particles.material.opacity = dark ? 0.4 : 0.25;
      }
    });
  }

  ngAfterViewInit() {
    if (!isPlatformBrowser(this.platformId)) return;

    import('three').then((THREE) => {
      const host = this.canvasHost.nativeElement;
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

      const isDark = this.themeService.isDarkMode();
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
        const r = ((primaryGreen >> 16) & 0xff) / 255 * (1 - t) + ((primaryYellow >> 16) & 0xff) / 255 * t;
        const g = ((primaryGreen >> 8) & 0xff) / 255 * (1 - t) + ((primaryYellow >> 8) & 0xff) / 255 * t;
        const b = (primaryGreen & 0xff) / 255 * (1 - t) + (primaryYellow & 0xff) / 255 * t;
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
        opacity: isDark ? 0.4 : 0.25,
        sizeAttenuation: true,
      });
      const particles = new THREE.Points(geometry, material);
      scene.add(particles);
      this.particles = particles as unknown as PointsObj;

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
        scrollProgress = (doc.scrollTop + window.innerHeight) / (doc.scrollHeight);
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

      const animate = () => {
        this.frameId = requestAnimationFrame(animate);
        mouseX += (targetMouseX - mouseX) * 0.05;
        mouseY += (targetMouseY - mouseY) * 0.05;

        // Mouse parallax: camera and particles react to cursor
        camera.position.x = (mouseX - 0.5) * 6;
        camera.position.y = (mouseY - 0.5) * -4;
        camera.lookAt(0, 0, 0);

        // Scroll parallax: depth and rotation
        const sp = Math.min(scrollProgress * 1.2, 1);
        camera.position.z = 30 + sp * 20;
        particles.rotation.y += 0.0005 + sp * 0.0003;
        particles.rotation.x += 0.0002 + sp * 0.0001;

        renderer.render(scene, camera);
      };
      animate();

      this.cleanup = () => {
        window.removeEventListener('resize', onResize);
        window.removeEventListener('mousemove', onMouseMove);
        window.removeEventListener('scroll', onScroll);
        cancelAnimationFrame(this.frameId);
        renderer.dispose();
        geometry.dispose();
        material.dispose();
        if (host.contains(renderer.domElement)) {
          host.removeChild(renderer.domElement);
        }
      };
    });
  }

  ngOnDestroy() {
    if (!isPlatformBrowser(this.platformId)) return;
    this.cleanup?.();
  }
}
