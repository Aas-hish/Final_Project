import { Injectable, inject } from '@angular/core';
import { BlogService } from './blog.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

export interface SitemapUrl {
  loc: string;
  lastmod?: string;
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
}

@Injectable({ providedIn: 'root' })
export class SitemapService {
  private readonly blogService = inject(BlogService);
  private readonly baseUrl = 'https://your-domain.com'; // Update with your actual domain

  /**
   * Generates sitemap URLs for all routes
   */
  getSitemapUrls(): Observable<SitemapUrl[]> {
    const staticRoutes: SitemapUrl[] = [
      {
        loc: `${this.baseUrl}/`,
        lastmod: new Date().toISOString(),
        changefreq: 'weekly',
        priority: 1.0,
      },
      {
        loc: `${this.baseUrl}/blog`,
        lastmod: new Date().toISOString(),
        changefreq: 'daily',
        priority: 0.8,
      },
    ];

    return this.blogService.getPosts().pipe(
      map((posts) => {
        const blogPostUrls: SitemapUrl[] = posts.map((post) => ({
          loc: `${this.baseUrl}/blog/${post.id}`,
          lastmod: new Date().toISOString(),
          changefreq: 'monthly' as const,
          priority: 0.6,
        }));

        return [...staticRoutes, ...blogPostUrls];
      }),
    );
  }

  /**
   * Generates XML sitemap string
   */
  generateSitemapXml(urls: SitemapUrl[]): string {
    const urlElements = urls
      .map((url) => {
        let xml = `  <url>\n    <loc>${this.escapeXml(url.loc)}</loc>`;
        if (url.lastmod) {
          xml += `\n    <lastmod>${url.lastmod}</lastmod>`;
        }
        if (url.changefreq) {
          xml += `\n    <changefreq>${url.changefreq}</changefreq>`;
        }
        if (url.priority !== undefined) {
          xml += `\n    <priority>${url.priority}</priority>`;
        }
        xml += `\n  </url>`;
        return xml;
      })
      .join('\n');

    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlElements}
</urlset>`;
  }

  private escapeXml(unsafe: string): string {
    return unsafe
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&apos;');
  }
}

