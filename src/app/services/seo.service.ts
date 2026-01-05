import { Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';

export interface SEOData {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  siteName?: string;
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
}

@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly document = inject(DOCUMENT);

  private readonly defaultSiteName = 'Angular Universal SSR Starter';
  private readonly defaultImage = '/favicon.ico';
  private readonly baseUrl = 'https://your-domain.com'; // Update with your actual domain

  /**
   * Sets comprehensive SEO meta tags including:
   * - Title and description
   * - Open Graph tags (Facebook, LinkedIn)
   * - Twitter Card tags
   * - Canonical URL
   * - Structured Data (JSON-LD)
   */
  setSEOData(data: SEOData): void {
    const {
      title,
      description,
      keywords,
      image,
      url,
      type = 'website',
      siteName = this.defaultSiteName,
      author,
      publishedTime,
      modifiedTime,
    } = data;

    // Set page title
    if (title) {
      this.title.setTitle(title);
    }

    // Basic meta tags
    if (description) {
      this.meta.updateTag({ name: 'description', content: description });
    }

    if (keywords) {
      this.meta.updateTag({ name: 'keywords', content: keywords });
    }

    if (author) {
      this.meta.updateTag({ name: 'author', content: author });
    }

    // Open Graph tags (Facebook, LinkedIn, etc.)
    this.meta.updateTag({ property: 'og:type', content: type });
    if (title) {
      this.meta.updateTag({ property: 'og:title', content: title });
    }
    if (description) {
      this.meta.updateTag({ property: 'og:description', content: description });
    }
    if (image) {
      this.meta.updateTag({ property: 'og:image', content: image });
      this.meta.updateTag({ property: 'og:image:secure_url', content: image });
    }
    if (url) {
      this.meta.updateTag({ property: 'og:url', content: url });
    }
    this.meta.updateTag({ property: 'og:site_name', content: siteName });

    // Twitter Card tags
    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    if (title) {
      this.meta.updateTag({ name: 'twitter:title', content: title });
    }
    if (description) {
      this.meta.updateTag({ name: 'twitter:description', content: description });
    }
    if (image) {
      this.meta.updateTag({ name: 'twitter:image', content: image });
    }

    // Article-specific meta tags
    if (type === 'article') {
      if (publishedTime) {
        this.meta.updateTag({ property: 'article:published_time', content: publishedTime });
      }
      if (modifiedTime) {
        this.meta.updateTag({ property: 'article:modified_time', content: modifiedTime });
      }
      if (author) {
        this.meta.updateTag({ property: 'article:author', content: author });
      }
    }

    // Set canonical URL
    this.setCanonicalUrl(url || this.getCurrentUrl());

    // Set structured data
    if (type === 'article' && title && description) {
      this.setArticleStructuredData({
        title,
        description,
        image,
        url: url || this.getCurrentUrl(),
        publishedTime,
        modifiedTime,
        author,
      });
    }
  }

  /**
   * Sets the canonical URL for the current page
   */
  setCanonicalUrl(url?: string): void {
    const canonicalUrl = url || this.getCurrentUrl();
    let link: HTMLLinkElement | null = this.document.querySelector('link[rel="canonical"]');

    if (!link) {
      link = this.document.createElement('link');
      link.setAttribute('rel', 'canonical');
      this.document.head.appendChild(link);
    }

    link.setAttribute('href', canonicalUrl);
  }

  /**
   * Sets JSON-LD structured data for articles
   */
  private setArticleStructuredData(data: {
    title: string;
    description: string;
    image?: string;
    url: string;
    publishedTime?: string;
    modifiedTime?: string;
    author?: string;
  }): void {
    // Remove existing structured data
    const existingScript = this.document.querySelector('script[type="application/ld+json"]');
    if (existingScript) {
      existingScript.remove();
    }

    const structuredData = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: data.title,
      description: data.description,
      image: data.image || `${this.baseUrl}${this.defaultImage}`,
      url: data.url,
      ...(data.publishedTime && { datePublished: data.publishedTime }),
      ...(data.modifiedTime && { dateModified: data.modifiedTime }),
      ...(data.author && {
        author: {
          '@type': 'Person',
          name: data.author,
        },
      }),
      publisher: {
        '@type': 'Organization',
        name: this.defaultSiteName,
        logo: {
          '@type': 'ImageObject',
          url: `${this.baseUrl}${this.defaultImage}`,
        },
      },
    };

    const script = this.document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(structuredData);
    this.document.head.appendChild(script);
  }

  /**
   * Sets JSON-LD structured data for the website
   */
  setWebsiteStructuredData(): void {
    const existingScript = this.document.querySelector('script[type="application/ld+json"][data-type="website"]');
    if (existingScript) {
      existingScript.remove();
    }

    const structuredData = {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: this.defaultSiteName,
      url: this.baseUrl,
      description: 'Server-side rendering with Angular, Express, and Angular Universal for fast, SEO-friendly SPAs.',
    };

    const script = this.document.createElement('script');
    script.type = 'application/ld+json';
    script.setAttribute('data-type', 'website');
    script.text = JSON.stringify(structuredData);
    this.document.head.appendChild(script);
  }

  /**
   * Sets breadcrumb structured data
   */
  setBreadcrumbStructuredData(items: Array<{ name: string; url: string }>): void {
    const existingScript = this.document.querySelector('script[type="application/ld+json"][data-type="breadcrumb"]');
    if (existingScript) {
      existingScript.remove();
    }

    const structuredData = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: items.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        item: item.url,
      })),
    };

    const script = this.document.createElement('script');
    script.type = 'application/ld+json';
    script.setAttribute('data-type', 'breadcrumb');
    script.text = JSON.stringify(structuredData);
    this.document.head.appendChild(script);
  }

  /**
   * Gets the current URL
   */
  private getCurrentUrl(): string {
    if (typeof window !== 'undefined') {
      return window.location.href;
    }
    return this.baseUrl;
  }
}

