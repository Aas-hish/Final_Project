import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { SeoService } from '../../service/seo.service';
import { BlogService } from '../../service/blog.service';
import { BlogPost } from '../../models/blog-post';
import { map } from 'rxjs';

@Component({
    selector: 'app-features',
    standalone: true,
    imports: [CommonModule, NgOptimizedImage],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
    <div class="py-24 sm:py-32 bg-gray-50 dark:bg-black/50">
      <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <div class="mx-auto max-w-2xl text-center">
          <h2 class="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">Trending Stories</h2>
          <p class="mt-2 text-lg leading-8 text-gray-600 dark:text-gray-300">
            Deep dives into the technologies shaping the web.
          </p>
        </div>
        <div class="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          <article *ngFor="let post of blogPosts$ | async" class="flex flex-col items-start justify-between group p-6 rounded-3xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/50 hover:shadow-xl hover:border-indigo-500/30 transition-all duration-300">
            <div class="relative w-full overflow-hidden rounded-2xl mb-4 aspect-[16/9] sm:aspect-[2/1] lg:aspect-[3/2]">
              <img [ngSrc]="post.imageUrl" [alt]="post.title" fill class="bg-gray-100 object-cover transition-transform duration-500 group-hover:scale-105">
              <div class="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10 dark:ring-white/10"></div>
            </div>
            <div class="max-w-xl">
              <div class="mt-8 flex items-center gap-x-4 text-xs">
                <time [attr.datetime]="post.date" class="text-gray-500 dark:text-gray-400">{{ post.date }}</time>
                <span class="relative z-10 rounded-full bg-indigo-50 dark:bg-indigo-900/30 px-3 py-1.5 font-medium text-indigo-600 dark:text-indigo-300 hover:bg-indigo-100 dark:hover:bg-indigo-900/50 transition-colors">{{ post.category }}</span>
              </div>
              <div class="group relative">
                <h3 class="mt-3 text-lg font-semibold leading-6 text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  <a [href]="'/blog/' + post.id">
                    <span class="absolute inset-0"></span>
                    {{ post.title }}
                  </a>
                </h3>
                <p class="mt-5 line-clamp-3 text-sm leading-6 text-gray-600 dark:text-gray-400">{{ post.description }}</p>
              </div>
              <div class="relative mt-8 flex items-center gap-x-4">
                <div class="text-sm leading-6">
                  <p class="font-semibold text-gray-900 dark:text-white">
                    <span class="absolute inset-0"></span>
                    By {{ post.author }}
                  </p>
                  <p class="text-gray-600 dark:text-gray-500">{{ post.readTime }}</p>
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>
  `
})
export class FeaturesComponent {
    private seoService = inject(SeoService);
    private blogService = inject(BlogService);

    // Fetch and take top 3 posts for the home feature section
    blogPosts$ = this.blogService.getPosts().pipe(
        map(posts => posts.slice(0, 3))
    );

    ngOnInit(): void {
      this.seoService.setSEOData({
        title: 'Latest Updates - Angular & Tailwind',
        description: 'Read the latest team articles and insights on Angular development and Tailwind CSS styling.',
        keywords: 'blog, angular, tailwind css, web development, insights'
      });
    }
}
