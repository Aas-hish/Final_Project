import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { BlogService } from '../../service/blog.service';
import { TiltDirective } from '../../directives/tilt.directive';
import { catchError, map, of, startWith } from 'rxjs';

interface BlogListState {
  posts: any[];
  loading: boolean;
  error: string | null;
}

@Component({
  selector: 'app-blog-list',
  standalone: true,
  imports: [CommonModule, RouterLink, TiltDirective],
  template: `
    <div class="bg-gray-50 dark:bg-black min-h-screen">
       <!-- Hero Section -->
      <div class="relative isolate overflow-hidden bg-gray-900 py-24 sm:py-32">
        <img src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&crop=focalpoint&fp-y=.8&w=2830&h=1500&q=80&blend=111827&sat=-100&exp=15&blend-mode=multiply" alt="" class="absolute inset-0 -z-10 h-full w-full object-cover">
        
        <div class="hidden sm:absolute sm:-top-10 sm:right-1/2 sm:-z-10 sm:mr-10 sm:block sm:transform-gpu sm:blur-3xl" aria-hidden="true">
          <div class="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-[#ff4694] to-[#776fff] opacity-20" style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"></div>
        </div>
        
        <div class="mx-auto max-w-7xl px-6 lg:px-8 text-center">
          <div class="mx-auto max-w-2xl">
            <h2 class="text-4xl font-bold tracking-tight text-white sm:text-6xl font-display">Our Latest Insights</h2>
            <p class="mt-6 text-lg leading-8 text-gray-300 font-light">
              Explore the cutting-edge of web development, server-side rendering, and performance optimization.
            </p>
          </div>
        </div>
      </div>

      <!-- Blog List -->
      <div class="mx-auto max-w-5xl px-6 lg:px-8 py-24">
        <div class="flex flex-col gap-y-12">
          
          <!-- Loading State -->
          <div *ngIf="(state$ | async)?.loading" class="flex flex-col items-center justify-center py-24">
            <div class="animate-spin rounded-full h-16 w-16 border-b-2 border-primary"></div>
            <p class="mt-4 text-gray-600 dark:text-gray-400">Loading articles...</p>
          </div>

          <!-- Error State -->
          <div *ngIf="(state$ | async)?.error as error" class="flex flex-col items-center justify-center py-24">
            <div class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6 max-w-md">
              <div class="flex items-center gap-3 mb-2">
                <svg class="h-6 w-6 text-red-600 dark:text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 class="text-lg font-semibold text-red-900 dark:text-red-100">Error Loading Articles</h3>
              </div>
              <p class="text-red-700 dark:text-red-300">{{ error }}</p>
            </div>
          </div>

          <!-- List Item -->
          <article *ngFor="let post of (state$ | async)?.posts" 
                   appTilt 
                   class="flex flex-col md:flex-row gap-8 bg-white dark:bg-zinc-900 rounded-2xl p-6 shadow-xl ring-1 ring-gray-900/5 dark:ring-white/10 transition-all duration-300 cursor-pointer overflow-hidden group hover:shadow-2xl"
                   [routerLink]="['/blog', post.id]">
            
            <!-- Image (30%) -->
            <div class="w-full md:w-[30%] shrink-0">
              <div class="relative h-full overflow-hidden rounded-xl">
                <img [src]="post.imageUrl" alt="" class="aspect-[16/9] md:aspect-[4/3] w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110">
                <div class="absolute inset-0 ring-1 ring-inset ring-gray-900/10 rounded-xl"></div>
              </div>
            </div>

            <!-- Content (70%) -->
            <div class="w-full md:w-[70%] flex flex-col justify-center">
              
              <div class="flex items-center gap-x-3 text-sm mb-3">
                 <span class="inline-flex items-center rounded-full bg-blue-50 dark:bg-blue-900/30 px-2.5 py-0.5 text-xs font-medium text-blue-700 dark:text-blue-300 ring-1 ring-inset ring-blue-700/10">
                   {{ post.category }}
                 </span>
                 <time [attr.datetime]="post.date" class="text-gray-500 dark:text-gray-500">{{ post.date }}</time>
                 <span class="text-gray-300">•</span>
                 <span class="text-gray-500 dark:text-gray-500 font-medium">{{ post.readTime }}</span>
              </div>

              <h3 class="text-2xl font-bold leading-tight text-gray-900 dark:text-white group-hover:text-primary transition-colors font-display mb-3">
                {{ post.title }}
              </h3>
              <p class="text-base leading-relaxed text-gray-600 dark:text-gray-400 line-clamp-2 mb-6">
                {{ post.body }}
              </p>
              
              <div class="mt-auto flex items-center justify-between">
                 <div class="flex items-center gap-x-2">
                    <div class="h-6 w-6 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-[10px] font-bold text-gray-600 dark:text-gray-300">
                      {{ post.author.charAt(0) }}
                    </div>
                    <span class="text-sm font-medium text-gray-900 dark:text-white">{{ post.author }}</span>
                 </div>
                 <div class="flex items-center text-primary font-medium text-sm">
                   Read Article <span aria-hidden="true" class="ml-2 transition-transform group-hover:translate-x-1">&rarr;</span>
                 </div>
              </div>
            </div>

          </article>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class BlogListComponent {
  private blogService = inject(BlogService);

  state$ = this.blogService.getPosts().pipe(
    map(posts => ({ posts, loading: false, error: null })),
    startWith({ posts: [], loading: true, error: null }),
    catchError(error => {
      console.error('Error loading blog posts:', error);
      return of({
        posts: [],
        loading: false,
        error: 'Failed to load articles. Please try again later.'
      });
    })
  );
}

