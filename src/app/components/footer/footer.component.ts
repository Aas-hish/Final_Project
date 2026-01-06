import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-footer',
    standalone: true,
    imports: [CommonModule],
    template: `
    <footer class="bg-white dark:bg-dark border-t border-gray-200 dark:border-gray-800 py-12 mt-auto">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <!-- Brand -->
          <div class="col-span-1">
            <span class="text-xl font-display font-bold text-gray-900 dark:text-white">Final Project</span>
            <p class="mt-4 text-sm text-gray-500 dark:text-gray-400">
              A high-performance Angular Universal SSR application with modern architecture.
            </p>
          </div>

          <!-- Links -->
          <div class="col-span-1">
            <h3 class="text-sm font-semibold text-gray-400 uppercase tracking-wider">Resources</h3>
            <ul class="mt-4 space-y-4">
              <li>
                <a href="https://angular.dev" target="_blank" class="text-base text-gray-500 dark:text-gray-400 hover:text-primary transition-colors">Angular Docs</a>
              </li>
              <li>
                <a href="https://tailwindcss.com" target="_blank" class="text-base text-gray-500 dark:text-gray-400 hover:text-primary transition-colors">Tailwind CSS</a>
              </li>
            </ul>
          </div>

           <!-- Legal -->
           <div class="col-span-1">
            <h3 class="text-sm font-semibold text-gray-400 uppercase tracking-wider">Legal</h3>
            <ul class="mt-4 space-y-4">
              <li>
                <a href="#" class="text-base text-gray-500 dark:text-gray-400 hover:text-primary transition-colors">Privacy Policy</a>
              </li>
              <li>
                <a href="#" class="text-base text-gray-500 dark:text-gray-400 hover:text-primary transition-colors">Terms of Service</a>
              </li>
            </ul>
          </div>
        </div>
        <div class="mt-12 border-t border-gray-200 dark:border-gray-800 pt-8">
          <p class="text-base text-gray-400 text-center">&copy; 2026 Final Project. All rights reserved.</p>
        </div>
      </div>
    </footer>
  `
})
export class FooterComponent { }
