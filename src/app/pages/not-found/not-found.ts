import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found',
  imports: [RouterLink],
  template: `
    <div class="min-h-screen pt-16 pb-12 flex flex-col bg-white dark:bg-black">
      <main class="flex-grow flex flex-col justify-center max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex-shrink-0 flex justify-center">
          <a routerLink="/" class="inline-flex">
            <span class="sr-only">Workflow</span>
            <div class="h-12 w-auto text-6xl">🚫</div>
          </a>
        </div>
        <div class="py-16">
          <div class="text-center">
            <p class="text-sm font-semibold text-primary uppercase tracking-wide">404 error</p>
            <h1 class="mt-2 text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight sm:text-5xl">Page not found.</h1>
            <p class="mt-2 text-base text-gray-500 dark:text-gray-400">Sorry, we couldn’t find the page you’re looking for.</p>
            <div class="mt-6">
              <a routerLink="/" class="text-base font-medium text-primary hover:text-blue-600 transition-colors">
                Go back home<span aria-hidden="true"> &rarr;</span>
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  `
})
export class NotFound {
  // We can also set status code here if we want to be strict with SSR
}
