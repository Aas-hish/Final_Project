import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { switchMap, map, catchError, of, startWith } from 'rxjs';
import { BlogService } from '../../service/blog.service';
import { BlogPost } from '../../models/blog-post';

interface BlogDetailState {
  post: BlogPost | null;
  loading: boolean;
  error: string | null;
}

@Component({
  selector: 'app-blog-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <!-- Loading State -->
    <div *ngIf="(state$ | async)?.loading" class="bg-white dark:bg-black min-h-screen flex items-center justify-center">
      <div class="flex flex-col items-center">
        <div class="animate-spin rounded-full h-16 w-16 border-b-2 border-primary"></div>
        <p class="mt-4 text-gray-600 dark:text-gray-400">Loading article...</p>
      </div>
    </div>

    <!-- Error State -->
    <div *ngIf="(state$ | async)?.error as error" class="bg-white dark:bg-black min-h-screen flex items-center justify-center px-6">
      <div class="max-w-md">
        <div class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6">
          <div class="flex items-center gap-3 mb-4">
            <svg class="h-8 w-8 text-red-600 dark:text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 class="text-xl font-semibold text-red-900 dark:text-red-100">Article Not Found</h3>
          </div>
          <p class="text-red-700 dark:text-red-300 mb-6">{{ error }}</p>
          <a routerLink="/blog" class="inline-flex items-center text-red-700 dark:text-red-300 hover:text-red-900 dark:hover:text-red-100 font-medium transition-colors">
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
            Back to Articles
          </a>
        </div>
      </div>
    </div>

    <!-- Content -->
    <div *ngIf="(state$ | async)?.post as post" class="bg-white dark:bg-black min-h-screen pb-20">
      
      <!-- Immersive Header with Image -->
      <div class="relative h-[60vh] w-full overflow-hidden">
        <div class="absolute inset-0 bg-gray-900/50 z-10"></div>
        <img [src]="post.imageUrl" class="absolute inset-0 h-full w-full object-cover transform scale-105 motion-safe:animate-subtle-zoom" alt="">
        
        <div class="absolute inset-0 z-20 flex flex-col justify-end pb-20 px-6 sm:px-12 lg:px-24 max-w-7xl mx-auto">
          <a routerLink="/blog" class="inline-flex items-center text-gray-300 hover:text-white mb-6 transition-colors font-medium text-sm">
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
            Back to Articles
          </a>
          <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold text-white font-display max-w-4xl leading-tight">
            {{ post.title }}
          </h1>
        </div>
      </div>

      <!-- Content -->
      <article class="relative z-30 -mt-10 mx-auto max-w-4xl bg-white dark:bg-zinc-900 rounded-t-3xl p-8 sm:p-12 lg:p-16 shadow-2xl">
        <div class="prose prose-lg prose-indigo dark:prose-invert mx-auto">
          <p class="lead text-xl text-gray-700 dark:text-gray-300 mb-8 border-l-4 border-primary pl-6 italic">
            Overview of {{ post.title }}
          </p>
          <div class="text-gray-600 dark:text-gray-300 leading-relaxed space-y-6">
             <!-- Simulating multiple paragraphs for the body -->
             <p>{{ post.body }}</p>
             <p>
               Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
               Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
             </p>
             <h3 class="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Key Takeaways</h3>
             <ul class="list-disc pl-5 space-y-2">
               <li>Performance is critical for user retention.</li>
               <li>Server-Side Rendering improves perceived load time.</li>
               <li>Interactive UIs create better engagement.</li>
             </ul>
             <p class="mt-6">
               Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
               Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
             </p>
          </div>
        </div>
        
        <div class="mt-16 pt-8 border-t border-gray-200 dark:border-gray-800 flex justify-between items-center">
           <div class="flex items-center gap-x-4">
             <div class="h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-sm font-bold text-gray-600 dark:text-gray-300">
                {{ post.author.charAt(0) }}
             </div>
             <div class="text-sm leading-6">
               <p class="font-semibold text-gray-900 dark:text-white">{{ post.author }}</p>
               <p class="text-gray-500 dark:text-gray-400">{{ post.date }} · {{ post.readTime }}</p>
             </div>
           </div>
           <div class="flex space-x-4">
             <!-- Social Share Icons (Mock) -->
             <button class="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition">
               <span class="sr-only">Share</span>
               <svg class="w-5 h-5 text-gray-600 dark:text-gray-300" fill="currentColor" viewBox="0 0 24 24"><path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z"/></svg>
             </button>
           </div>
        </div>
      </article>

    </div>
  `
})
export class BlogDetailComponent {
  private route = inject(ActivatedRoute);
  private blogService = inject(BlogService);

  state$ = this.route.paramMap.pipe(
    switchMap(params => {
      const id = Number(params.get('id'));
      return this.blogService.getPost(id).pipe(
        map(post => {
          if (!post) {
            return {
              post: null,
              loading: false,
              error: 'The article you are looking for does not exist or has been removed.'
            };
          }
          return { post, loading: false, error: null };
        }),
        startWith({ post: null, loading: true, error: null }),
        catchError(error => {
          console.error('Error loading blog post:', error);
          return of({
            post: null,
            loading: false,
            error: 'Failed to load the article. Please try again later.'
          });
        })
      );
    })
  );
}

