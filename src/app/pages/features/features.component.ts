import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SeoService } from '../../service/seo.service';

@Component({
    selector: 'app-features',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="py-24 sm:py-32 bg-gray-50 dark:bg-black">
      <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <div class="mx-auto max-w-2xl lg:text-center">
          <h2 class="text-base font-semibold leading-7 text-primary">Capabilities</h2>
          <p class="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">Everything you need</p>
          <p class="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
            Our platform provides a comprehensive suite of features to ensure your application performs at its best.
          </p>
        </div>
        <div class="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <dl class="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
            <div *ngFor="let feature of features" class="relative pl-16">
              <dt class="text-base font-semibold leading-7 text-gray-900 dark:text-white">
                <div class="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                  <span class="text-white text-xl font-bold">{{ feature.icon }}</span>
                </div>
                {{ feature.name }}
              </dt>
              <dd class="mt-2 text-base leading-7 text-gray-600 dark:text-gray-300">{{ feature.description }}</dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  `
})
export class FeaturesComponent {
    private seoService = inject(SeoService);

    ngOnInit(): void {
      this.seoService.setSEOData({
        title: 'Features',
        description: 'Our platform provides a comprehensive suite of features including Server-Side Rendering, Modern Styling, Type Safety, and Optimization.',
        keywords: 'features, SSR, Angular Universal, Tailwind CSS, TypeScript, optimization'
      });
    }

    features = [
        {
            name: 'Server-Side Rendering',
            description: 'Lightning fast initial page loads and improved SEO with Angular Universal.',
            icon: '⚡'
        },
        {
            name: 'Modern Styling',
            description: 'Beautiful, responsive designs built with Tailwind CSS utility classes.',
            icon: '🎨'
        },
        {
            name: 'Type Safe',
            description: 'Built with TypeScript for robust, error-free code and better developer experience.',
            icon: '🛡️'
        },
        {
            name: 'Optimized',
            description: 'Automatic code splitting and lazy loading for optimal performance.',
            icon: '🚀'
        }
    ];
}
