import { Component, inject } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common'; // Optimize Images
import { ActivatedRoute, RouterLink } from '@angular/router';
import { switchMap, map, catchError, of, startWith } from 'rxjs';
import { BlogService } from '../../service/blog.service';
import { SeoService } from '../../service/seo.service';
import { BlogPost } from '../../models/blog-post';

interface BlogDetailState {
  post: BlogPost | null;
  loading: boolean;
  error: string | null;
}

@Component({
  selector: 'app-blog-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, NgOptimizedImage],
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
        <img [ngSrc]="post.imageUrl" fill priority class="absolute inset-0 h-full w-full object-cover transform scale-105 motion-safe:animate-subtle-zoom" alt="">
        
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
      <article class="relative z-30 -mt-10 mx-auto max-w-7xl bg-white dark:bg-zinc-900 rounded-t-3xl p-8 sm:p-12 lg:p-16 shadow-2xl">
        <div class="prose prose-lg prose-indigo dark:prose-invert max-w-none mx-auto
          prose-headings:font-display prose-headings:font-bold prose-h2:text-3xl prose-h2:mt-12 prose-h3:text-2xl 
          prose-p:leading-relaxed prose-p:text-lg prose-p:text-gray-700 dark:prose-p:text-gray-300
          prose-a:text-primary prose-a:no-underline hover:prose-a:underline
          prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:bg-gray-50 dark:prose-blockquote:bg-gray-800/50 prose-blockquote:py-2 prose-blockquote:px-6 prose-blockquote:rounded-r-lg prose-blockquote:not-italic
          prose-code:text-pink-600 dark:prose-code:text-pink-400 prose-code:bg-gray-100 dark:prose-code:bg-gray-800 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:before:content-none prose-code:after:content-none
          prose-pre:bg-gray-900 prose-pre:text-gray-100 prose-pre:rounded-xl prose-pre:shadow-lg
          prose-img:rounded-xl prose-img:shadow-md prose-img:w-full">
          
          <div [innerHTML]="post.body"></div>
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
           <div class="relative">
             <!-- Share Button -->
             <button 
               (click)="toggleShareMenu()"
               class="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all hover:scale-110"
               aria-label="Share article"
             >
               <svg class="w-5 h-5 text-gray-600 dark:text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                 <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z"/>
               </svg>
             </button>

             <!-- Backdrop overlay to close menu when clicking outside -->
             <div 
               *ngIf="showShareMenu"
               (click)="showShareMenu = false"
               class="fixed inset-0 z-40"
               aria-hidden="true"
             ></div>

             <!-- Share Dropdown Menu -->
             <div 
               *ngIf="showShareMenu"
               class="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 z-50 overflow-hidden animate-fade-in"
             >
               <div class="p-3 border-b border-gray-200 dark:border-gray-700">
                 <h3 class="text-sm font-semibold text-gray-900 dark:text-white">Share this article</h3>
               </div>
               
               <div class="p-2">
                 <!-- Twitter -->
                 <button 
                   (click)="shareOnTwitter(post)"
                   class="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-left group"
                 >
                   <div class="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center group-hover:scale-110 transition-transform">
                     <svg class="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                       <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                     </svg>
                   </div>
                   <div>
                     <p class="text-sm font-medium text-gray-900 dark:text-white">Twitter</p>
                     <p class="text-xs text-gray-500 dark:text-gray-400">Share on Twitter</p>
                   </div>
                 </button>

                 <!-- Facebook -->
                 <button 
                   (click)="shareOnFacebook()"
                   class="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-left group"
                 >
                   <div class="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center group-hover:scale-110 transition-transform">
                     <svg class="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                       <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                     </svg>
                   </div>
                   <div>
                     <p class="text-sm font-medium text-gray-900 dark:text-white">Facebook</p>
                     <p class="text-xs text-gray-500 dark:text-gray-400">Share on Facebook</p>
                   </div>
                 </button>

                 <!-- LinkedIn -->
                 <button 
                   (click)="shareOnLinkedIn(post)"
                   class="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-left group"
                 >
                   <div class="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center group-hover:scale-110 transition-transform">
                     <svg class="w-5 h-5 text-blue-700" fill="currentColor" viewBox="0 0 24 24">
                       <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                     </svg>
                   </div>
                   <div>
                     <p class="text-sm font-medium text-gray-900 dark:text-white">LinkedIn</p>
                     <p class="text-xs text-gray-500 dark:text-gray-400">Share on LinkedIn</p>
                   </div>
                 </button>

                 <!-- WhatsApp -->
                 <button 
                   (click)="shareOnWhatsApp(post)"
                   class="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-left group"
                 >
                   <div class="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center group-hover:scale-110 transition-transform">
                     <svg class="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                       <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                     </svg>
                   </div>
                   <div>
                     <p class="text-sm font-medium text-gray-900 dark:text-white">WhatsApp</p>
                     <p class="text-xs text-gray-500 dark:text-gray-400">Share on WhatsApp</p>
                   </div>
                 </button>

                 <!-- Copy Link -->
                 <button 
                   (click)="copyLink()"
                   class="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-left group"
                 >
                   <div class="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center group-hover:scale-110 transition-transform">
                     <svg *ngIf="!copySuccess" class="w-5 h-5 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                       <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/>
                     </svg>
                     <svg *ngIf="copySuccess" class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                       <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                     </svg>
                   </div>
                   <div>
                     <p class="text-sm font-medium text-gray-900 dark:text-white">
                       {{ copySuccess ? 'Link Copied!' : 'Copy Link' }}
                     </p>
                     <p class="text-xs text-gray-500 dark:text-gray-400">
                       {{ copySuccess ? 'Ready to paste' : 'Copy to clipboard' }}
                     </p>
                   </div>
                 </button>
               </div>
             </div>
           </div>

        </div>
      </article>

    </div>
  `
})
export class BlogDetailComponent {
  private route = inject(ActivatedRoute);
  private blogService = inject(BlogService);
  private seoService = inject(SeoService);

  // Share functionality state
  showShareMenu = false;
  copySuccess = false;

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
          
          // Set SEO metadata for the blog post
          this.seoService.setSEOData({
            title: post.title,
            description: post.body.substring(0, 160).replace(/<[^>]*>/g, ''), // Strip HTML tags
            keywords: `${post.category}, blog, article`,
            image: post.imageUrl,
            type: 'article',
            author: post.author
          });
          
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

  toggleShareMenu() {
    this.showShareMenu = !this.showShareMenu;
  }

  // Get current page URL
  getCurrentUrl(): string {
    if (typeof window !== 'undefined') {
      return window.location.href;
    }
    return '';
  }

  // Native Web Share API (works on mobile devices)
  async shareNative(post: BlogPost) {
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title: post.title,
          text: `Check out this article: ${post.title}`,
          url: this.getCurrentUrl()
        });
        this.showShareMenu = false;
      } catch (err) {
        console.log('Error sharing:', err);
      }
    }
  }

  // Share on Twitter
  shareOnTwitter(post: BlogPost) {
    const url = this.getCurrentUrl();
    const text = encodeURIComponent(`${post.title} by ${post.author}`);
    const twitterUrl = `https://twitter.com/intent/tweet?text=${text}&url=${encodeURIComponent(url)}`;
    this.openShareWindow(twitterUrl);
  }

  // Share on Facebook
  shareOnFacebook() {
    const url = this.getCurrentUrl();
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
    this.openShareWindow(facebookUrl);
  }

  // Share on LinkedIn
  shareOnLinkedIn(post: BlogPost) {
    const url = this.getCurrentUrl();
    const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
    this.openShareWindow(linkedInUrl);
  }

  // Share on WhatsApp
  shareOnWhatsApp(post: BlogPost) {
    const url = this.getCurrentUrl();
    const text = encodeURIComponent(`${post.title}\n${url}`);
    const whatsappUrl = `https://wa.me/?text=${text}`;
    this.openShareWindow(whatsappUrl);
  }

  // Copy link to clipboard
  async copyLink() {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(this.getCurrentUrl());
        this.copySuccess = true;
        setTimeout(() => {
          this.copySuccess = false;
          this.showShareMenu = false;
        }, 2000);
      } catch (err) {
        console.error('Failed to copy:', err);
      }
    }
  }

  // Helper to open share window
  private openShareWindow(url: string) {
    if (typeof window !== 'undefined') {
      window.open(url, '_blank', 'width=600,height=400');
      this.showShareMenu = false;
    }
  }
}

