import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { SeoService } from '../../services/seo.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  private readonly seoService = inject(SeoService);

  ngOnInit(): void {
    this.seoService.setSEOData({
      title: 'Angular Universal SSR Starter',
      description:
        'Server-side rendering with Angular, Express, and Angular Universal for fast, SEO-friendly SPAs. Improve initial load performance, SEO compatibility, and content indexing.',
      keywords: 'Angular, Angular Universal, SSR, Server-Side Rendering, SEO, Node.js, Express, TypeScript',
      type: 'website',
      url: this.getCurrentUrl(),
    });

    // Set website structured data
    this.seoService.setWebsiteStructuredData();
  }

  private getCurrentUrl(): string {
    if (typeof window !== 'undefined') {
      return window.location.href;
    }
    return 'https://your-domain.com';
  }
}
