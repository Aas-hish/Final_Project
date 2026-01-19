import { Injectable, Inject } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';

export interface SeoData {
  title: string;
  description: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  author?: string;
}

@Injectable({
  providedIn: 'root'
})
export class SeoService {
  private readonly defaultTitle = 'Angular Universal SSR Starter';
  private readonly defaultDescription = 'A production-ready Angular application with Server-Side Rendering (SSR) using Angular Universal.';
  private readonly defaultImage = 'https://angular.io/assets/images/logos/angular/angular.png'; 
  private readonly siteName = 'Angular Universal Starter';
  private readonly baseUrl = 'http://localhost:4000'; // Change this in production

  constructor(
    private titleService: Title,
    private metaService: Meta,
    @Inject(DOCUMENT) private document: Document
  ) {}

  setSEOData(data: SeoData): void {
    // Set Title
    const title = data.title ? `${data.title} | ${this.siteName}` : this.defaultTitle;
    this.titleService.setTitle(title);

    // Set Meta Description
    const description = data.description || this.defaultDescription;
    this.metaService.updateTag({ name: 'description', content: description });

    // Set Keywords
    if (data.keywords) {
      this.metaService.updateTag({ name: 'keywords', content: data.keywords });
    }

    // Set Author
    if (data.author) {
      this.metaService.updateTag({ name: 'author', content: data.author });
    }

    // Open Graph (Facebook, LinkedIn)
    this.metaService.updateTag({ property: 'og:title', content: title });
    this.metaService.updateTag({ property: 'og:description', content: description });
    this.metaService.updateTag({ property: 'og:image', content: data.image || this.defaultImage });
    this.metaService.updateTag({ property: 'og:url', content: data.url || this.document.location.href });
    this.metaService.updateTag({ property: 'og:type', content: data.type || 'website' });
    this.metaService.updateTag({ property: 'og:site_name', content: this.siteName });

    // Twitter Card
    this.metaService.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.metaService.updateTag({ name: 'twitter:title', content: title });
    this.metaService.updateTag({ name: 'twitter:description', content: description });
    this.metaService.updateTag({ name: 'twitter:image', content: data.image || this.defaultImage });

    // Canonical link
    this.updateCanonicalUrl(data.url || this.document.location.href);
  }

  private updateCanonicalUrl(url: string) {
    let link: HTMLLinkElement | null = this.document.querySelector("link[rel='canonical']") as HTMLLinkElement;
    if (!link) {
      link = this.document.createElement('link');
      link.setAttribute('rel', 'canonical');
      this.document.head.appendChild(link);
    }
    link.setAttribute('href', url);
  }
}
