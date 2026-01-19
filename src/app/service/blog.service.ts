import { Injectable, inject, makeStateKey, TransferState, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { isPlatformServer } from '@angular/common';
import { Observable, of, tap, map } from 'rxjs'; // Removed unused imports

import { BlogPost } from '../models/blog-post';

@Injectable({ providedIn: 'root' })
export class BlogService {
  private http = inject(HttpClient);
  private transferState = inject(TransferState);
  private platformId = inject(PLATFORM_ID);

  private readonly POSTS_KEY = makeStateKey<BlogPost[]>('BLOG_POSTS');
  // Fetch top Angular articles from Dev.to
  private readonly API_URL = 'https://dev.to/api/articles?tag=angular&top=25';

  getPosts(): Observable<BlogPost[]> {
    if (this.transferState.hasKey(this.POSTS_KEY)) {
      const posts = this.transferState.get(this.POSTS_KEY, []);
      return of(posts);
    }

    return this.http.get<any[]>(this.API_URL).pipe(
      map(apiPosts => apiPosts.slice(0, 25).map(post => this.mapToBlogPost(post))),
      tap(posts => {
        if (isPlatformServer(this.platformId)) {
          this.transferState.set(this.POSTS_KEY, posts);
        }
      })
    );
  }

  getPost(id: number): Observable<BlogPost | undefined> {
    // Check if we have the full list cached first
    // Note: The list item usually only has 'description' (summary), not 'body_html' (full content).
    // If we want the full content, we should ALWAYS fetch the individual post if possible, 
    // or check if the cached item has the full body.
    
    // However, for this demo, to ensure we get the full body for the detail view, 
    // we will separate the caching strategy or force a fetch if the cached item body is too short.
    
    const POST_KEY = makeStateKey<BlogPost>(`BLOG_POST_${id}`);
    if (this.transferState.hasKey(POST_KEY)) {
      return of(this.transferState.get(POST_KEY, undefined));
    }

    return this.http.get<any>(`https://dev.to/api/articles/${id}`).pipe(
      map(post => this.mapToBlogPost(post)),
      tap(post => {
        if (isPlatformServer(this.platformId)) {
          this.transferState.set(POST_KEY, post);
        }
      })
    );
  }

  private mapToBlogPost(apiPost: any): BlogPost {
    return {
      id: apiPost.id,
      title: apiPost.title,
      // Prefer body_html (full content) > body_markdown > description > fallback
      // Note: Detail API returns body_html. List API returns description.
      body: apiPost.body_html || apiPost.description || 'No content available.',
      
      // Use the cover image if available, otherwise a fallback or the social image
      imageUrl: apiPost.cover_image || apiPost.social_image || 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200',
      category: apiPost.tag_list ? apiPost.tag_list[0] : 'Tech',
      author: apiPost.user.name,
      date: new Date(apiPost.published_at).toDateString(),
      readTime: `${apiPost.reading_time_minutes} min read`
    };
  }
}
