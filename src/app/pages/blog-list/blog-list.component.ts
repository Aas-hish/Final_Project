import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Observable } from 'rxjs';

import { BlogPost } from '../../models/blog-post';
import { BlogService } from '../../services/blog.service';
import { SeoService } from '../../services/seo.service';

@Component({
  selector: 'app-blog-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlogListComponent implements OnInit {
  private readonly seoService = inject(SeoService);
  private readonly blogService = inject(BlogService);

  readonly posts$: Observable<BlogPost[]> = this.blogService.getPosts();

  ngOnInit(): void {
    this.seoService.setSEOData({
      title: 'Blog · Angular Universal Starter',
      description:
        'Explore our blog posts about Angular Universal, Server-Side Rendering, SEO optimization, and best practices for building fast, SEO-friendly Angular applications.',
      keywords: 'Angular Universal, SSR, Server-Side Rendering, SEO, Angular Blog, Web Development',
      type: 'website',
      url: this.getCurrentUrl(),
    });

    // Set breadcrumb structured data
    this.seoService.setBreadcrumbStructuredData([
      { name: 'Home', url: this.getBaseUrl() },
      { name: 'Blog', url: this.getCurrentUrl() },
    ]);
  }

  trackById(_: number, post: BlogPost): number {
    return post.id;
  }

  private getCurrentUrl(): string {
    if (typeof window !== 'undefined') {
      return window.location.href;
    }
    return `${this.getBaseUrl()}/blog`;
  }

  private getBaseUrl(): string {
    if (typeof window !== 'undefined') {
      return `${window.location.protocol}//${window.location.host}`;
    }
    return 'https://your-domain.com';
  }
}
