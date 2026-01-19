import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { SeoService } from '../../service/seo.service';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AboutComponent } from '../about/about.component';
import { FeaturesComponent } from '../features/features.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, AboutComponent, FeaturesComponent, NgOptimizedImage],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="relative bg-white dark:bg-black overflow-hidden selection:bg-indigo-500 selection:text-white transition-colors duration-500">
      
      <!-- Vivid Background Gradients (Aurora Effect) -->
      <div class="fixed inset-0 z-0 pointer-events-none">
        <div class="absolute top-[-10%] left-[-10%] w-[50rem] h-[50rem] bg-indigo-500/20 rounded-full mix-blend-multiply filter blur-[100px] opacity-50 dark:opacity-20 animate-blob"></div>
        <div class="absolute top-[10%] right-[-10%] w-[40rem] h-[40rem] bg-fuchsia-500/20 rounded-full mix-blend-multiply filter blur-[100px] opacity-50 dark:opacity-20 animate-blob animation-delay-2000"></div>
        <div class="absolute -bottom-32 left-[20%] w-[40rem] h-[40rem] bg-cyan-500/20 rounded-full mix-blend-multiply filter blur-[100px] opacity-50 dark:opacity-20 animate-blob animation-delay-4000"></div>
        <!-- Grid overlay for texture -->
        <div class="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150"></div>
      </div>

      <!-- Hero Section -->
      <div class="relative z-10 pt-24 pb-20 sm:pt-32 sm:pb-32 lg:pb-40">
        <div class="mx-auto max-w-7xl px-6 lg:px-8">
          <div class="lg:grid lg:grid-cols-12 lg:gap-x-12 lg:gap-y-20 items-center">
            
            <!-- Left Content -->
            <div class="lg:col-span-6 lg:pt-4 text-center lg:text-left">
              <div class="inline-flex items-center space-x-2 rounded-full px-4 py-1.5 text-sm font-medium leading-6 text-indigo-600 dark:text-indigo-400 ring-1 ring-indigo-600/10 dark:ring-indigo-400/20 bg-white/50 dark:bg-indigo-900/10 mb-8 backdrop-blur-md shadow-sm">
                <span class="animate-pulse mr-1">✨</span>
                <span>The Future of Frontend is Here</span>
              </div>
              
              <h1 class="text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-6xl md:text-7xl mb-8 leading-tight">
                Ship <span class="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400 animate-gradient-x">Better Apps</span> <br class="hidden lg:block"> Faster.
              </h1>
              
              <p class="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto lg:mx-0">
                Unlock the full potential of the modern web. From reactive architectures to pixel-perfect design, learn to build applications that stand out. Elevate your engineering skills today.
              </p>
              
              <div class="mt-10 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 sm:gap-x-6">
                <a routerLink="/blog" class="w-full sm:w-auto rounded-full bg-gray-900 dark:bg-white px-8 py-4 text-base font-semibold text-white dark:text-gray-900 shadow-xl hover:bg-gray-800 dark:hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-all hover:-translate-y-1 duration-300 text-center">
                  Start Learning
                </a>
                <a routerLink="/about" class="group text-base font-semibold leading-6 text-gray-900 dark:text-white flex items-center gap-2 px-6 py-4 rounded-full hover:bg-gray-100 dark:hover:bg-white/5 transition-all">
                  Our Mission <span aria-hidden="true" class="group-hover:translate-x-1 transition-transform">→</span>
                </a>
              </div>
            </div>

            <!-- Right Visual (Developer Image) -->
            <div class="relative mt-16 lg:col-span-6 lg:mt-0">
               <div class="relative w-full max-w-lg mx-auto transform hover:scale-[1.02] transition-transform duration-500">
                  <div class="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-pink-500 rounded-2xl blur opacity-30 animate-pulse-slow"></div>
                  <div class="relative rounded-2xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-800 bg-gray-800">
                     <img ngSrc="assets/developer-laptop.png" width="800" height="600" priority alt="Developer building the future" class="w-full h-auto object-cover" />
                  </div>
               </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Sections with Backdrop -->
      <div class="relative z-10 backdrop-blur-3xl bg-white/40 dark:bg-black/40 border-t border-white/50 dark:border-white/5">
        @defer (on viewport) {
          <app-features></app-features>
        } @placeholder {
          <div class="py-24 text-center">Loading Features...</div>
        }

        @defer (on viewport) {
          <app-about></app-about>
        } @placeholder {
          <div class="py-24 text-center">Loading About...</div>
        }
      </div>

    </div>
  `
})
export class HomeComponent {
  private seoService = inject(SeoService);

  ngOnInit(): void {
    this.seoService.setSEOData({
      title: 'DevPulse - The Modern Web Developer Guide',
      description: 'Master Angular and Tailwind CSS with our comprehensive guides and tutorials. Build the future.',
      keywords: 'Angular, Tailwind, Web Development, Tutorials, Modern Stack'
    });
  }
}
