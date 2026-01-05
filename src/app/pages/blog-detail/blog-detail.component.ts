import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Observable, map, switchMap, tap } from 'rxjs';

import { BlogPost } from '../../models/blog-post';
import { BlogService } from '../../services/blog.service';
import { SeoService } from '../../services/seo.service';

@Component({
  selector: 'app-blog-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlogDetailComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly seoService = inject(SeoService);
  private readonly blogService = inject(BlogService);

  readonly post$: Observable<BlogPost | undefined> = this.route.paramMap.pipe(
    map((params) => Number(params.get('id'))),
    switchMap((id) => this.blogService.getPost(id)),
    tap((post) => {
      if (post) {
        const currentUrl = this.getCurrentUrl(post.id);
        const baseUrl = this.getBaseUrl();
        const publishedTime = new Date().toISOString(); // In real app, use actual publish date

        this.seoService.setSEOData({
          title: `${post.title} · Angular Universal SSR Starter`,
          description: post.body.slice(0, 160),
          keywords: 'Angular, Angular Universal, SSR, Server-Side Rendering, SEO',
          image: post.imageUrl,
          url: currentUrl,
          type: 'article',
          author: 'Angular Universal Team',
          publishedTime,
          modifiedTime: publishedTime,
        });

        // Set breadcrumb structured data
        this.seoService.setBreadcrumbStructuredData([
          { name: 'Home', url: baseUrl },
          { name: 'Blog', url: `${baseUrl}/blog` },
          { name: post.title, url: currentUrl },
        ]);
      } else {
        this.seoService.setSEOData({
          title: 'Blog post not found · Angular Universal SSR Starter',
          description: 'The requested blog post could not be located.',
          type: 'website',
          url: this.getCurrentUrl(),
        });
      }
    }),
  );

  ngOnInit(): void {
    // Work done inside the observable
  }

  private getCurrentUrl(postId?: number): string {
    if (typeof window !== 'undefined') {
      return window.location.href;
    }
    const baseUrl = this.getBaseUrl();
    return postId ? `${baseUrl}/blog/${postId}` : `${baseUrl}/blog`;
  }

  private getBaseUrl(): string {
    if (typeof window !== 'undefined') {
      return `${window.location.protocol}//${window.location.host}`;
    }
    return 'https://your-domain.com';
  }
}
