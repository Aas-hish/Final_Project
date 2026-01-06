import { Component } from '@angular/core';

@Component({
    selector: 'app-about',
    standalone: true,
    template: `
    <div class="bg-white dark:bg-dark py-24 sm:py-32">
      <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <div class="mx-auto max-w-2xl lg:text-center">
          <h2 class="text-base font-semibold leading-7 text-primary">About Us</h2>
          <p class="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">Driven by Performance</p>
          <p class="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
            We are dedicated to building the fastest, most accessible web applications using modern technologies like Angular Universal and Tailwind CSS.
          </p>
        </div>
      </div>
    </div>
  `
})
export class AboutComponent { }
