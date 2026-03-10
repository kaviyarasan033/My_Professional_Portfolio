import { Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class SeoService {
  private meta = inject(Meta);
  private title = inject(Title);
  private document = inject(DOCUMENT);

  setDefaultSeo(): void {
    const pageTitle = 'Kaviyarasan M | Full Stack Developer & AI Automation Engineer';
    const description = 'Kaviyarasan M is a Full Stack Developer & AI Automation Engineer with 5+ years of experience building scalable ERP, CRM, and SaaS platforms using Angular, React, Laravel, Node.js, and n8n AI agents.';
    const url = 'https://kaviyarasan033.github.io/My_Professional_Portfolio/';
    const image = 'https://kaviyarasan033.github.io/My_Professional_Portfolio/og-image.png';

    this.title.setTitle(pageTitle);

    // Primary
    this.meta.updateTag({ name: 'description', content: description });
    this.meta.updateTag({ name: 'keywords', content: 'Kaviyarasan M, Full Stack Developer, AI Automation Engineer, Angular Developer, React Developer, Laravel Developer, ERP Developer, CRM Developer, n8n Automation, Web Developer India, Portfolio' });
    this.meta.updateTag({ name: 'author', content: 'Kaviyarasan M' });
    this.meta.updateTag({ name: 'robots', content: 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1' });

    // Open Graph
    this.meta.updateTag({ property: 'og:type', content: 'website' });
    this.meta.updateTag({ property: 'og:title', content: pageTitle });
    this.meta.updateTag({ property: 'og:description', content: description });
    this.meta.updateTag({ property: 'og:url', content: url });
    this.meta.updateTag({ property: 'og:image', content: image });
    this.meta.updateTag({ property: 'og:site_name', content: 'Kaviyarasan M — Portfolio' });
    this.meta.updateTag({ property: 'og:locale', content: 'en_US' });

    // Twitter Card
    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:title', content: pageTitle });
    this.meta.updateTag({ name: 'twitter:description', content: description });
    this.meta.updateTag({ name: 'twitter:image', content: image });
    this.meta.updateTag({ name: 'twitter:creator', content: '@kaviyarasan033' });

    // Canonical link
    this.setCanonicalUrl(url);
  }

  private setCanonicalUrl(url: string): void {
    const head = this.document.head;
    let link = this.document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!link) {
      link = this.document.createElement('link') as HTMLLinkElement;
      link.setAttribute('rel', 'canonical');
      head.appendChild(link);
    }
    link.setAttribute('href', url);
  }
}
