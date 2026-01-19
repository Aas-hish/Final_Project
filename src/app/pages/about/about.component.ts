import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { SeoService } from '../../service/seo.service';

@Component({
    selector: 'app-about',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
    <div class="relative bg-white dark:bg-black py-24 sm:py-32">
      <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <div class="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          <div class="lg:pr-8 lg:pt-4">
            <div class="lg:max-w-lg">
              <h2 class="text-base font-semibold leading-7 text-indigo-600 dark:text-indigo-400">Our Mission</h2>
              <p class="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">Empowering Developers Worldwide</p>
              <p class="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
                We believe in the power of open-source education. Our platform is dedicated to providing high-quality, practical resources for Angular and Tailwind CSS, helping developers build better software, faster.
              </p>
              <div class="mt-10 max-w-xl text-base leading-7 text-gray-700 dark:text-gray-400">
                <p>
                   Whether you're just starting out or looking to master advanced concepts, we provide the tools and knowledge you need to succeed in the modern web landscape.
                </p>
              </div>
            </div>
          </div>
          <div class="flex flex-col justify-center">
             <dl class="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-2">
                <div class="mx-auto flex max-w-xs flex-col gap-y-4">
                  <dt class="text-base leading-7 text-gray-600 dark:text-gray-400">Tutorials & Guides</dt>
                  <dd class="order-first text-3xl font-semibold tracking-tight text-gray-900 dark:text-white sm:text-5xl">50+</dd>
                </div>
                <div class="mx-auto flex max-w-xs flex-col gap-y-4">
                  <dt class="text-base leading-7 text-gray-600 dark:text-gray-400">Community Members</dt>
                  <dd class="order-first text-3xl font-semibold tracking-tight text-gray-900 dark:text-white sm:text-5xl">10k+</dd>
                </div>
                <div class="mx-auto flex max-w-xs flex-col gap-y-4">
                  <dt class="text-base leading-7 text-gray-600 dark:text-gray-400">Open Source</dt>
                  <dd class="order-first text-3xl font-semibold tracking-tight text-gray-900 dark:text-white sm:text-5xl">100%</dd>
                </div>
                <div class="mx-auto flex max-w-xs flex-col gap-y-4">
                  <dt class="text-base leading-7 text-gray-600 dark:text-gray-400">Uptime</dt>
                  <dd class="order-first text-3xl font-semibold tracking-tight text-gray-900 dark:text-white sm:text-5xl">99.9%</dd>
                </div>
              </dl>
          </div>
        </div>
      </div>
    </div>
  `
})
export class AboutComponent {
  private seoService = inject(SeoService);

  ngOnInit(): void {
    this.seoService.setSEOData({
      title: 'About Us - Our Mission',
      description: 'Our platform is a hub for developers to explore Angular and Tailwind CSS, offering practical examples and simplifying complex concepts.',
      keywords: 'about, mission, knowledge sharing, Angular, Tailwind CSS, developers'
    });
  }
}
