import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  template: `
    <header class="fixed w-full top-0 z-50 transition-all duration-300">
      <!-- Gradient Glow Effect -->
      <div class="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-pink-600/10 backdrop-blur-xl border-b border-white/10 dark:border-white/5 opacity-80"></div>
      
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div class="flex justify-between items-center h-20">
          <!-- Logo -->
          <div class="flex-shrink-0 flex items-center gap-2">
             <div class="relative w-8 h-8 flex items-center justify-center bg-gradient-to-br from-primary to-accent rounded-lg shadow-lg shadow-primary/30">
                <span class="text-white font-bold text-xl">D</span>
             </div>
             <a routerLink="/" class="text-2xl font-display font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 hover:opacity-80 transition-opacity">
               DevPulse
             </a>
          </div>

          <!-- Desktop Menu -->
          <nav class="hidden md:flex items-center space-x-1">
            <a routerLink="/" 
               routerLinkActive="bg-white/10 text-primary dark:text-white font-semibold" 
               [routerLinkActiveOptions]="{exact: true}"
               class="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-white/10 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200">
               Home
            </a>
            <a routerLink="/blog" 
               routerLinkActive="bg-white/10 text-primary dark:text-white font-semibold" 
               class="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-white/10 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200">
               Blog
            </a>
            
            <div class="hidden"></div>
            <!-- Removed Get Started Button -->
          </nav>

          <!-- Mobile Menu Button -->
          <div class="flex items-center md:hidden">
            <button (click)="toggleMenu()" type="button" class="inline-flex items-center justify-center p-2 rounded-xl text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary transition-colors" aria-controls="mobile-menu" aria-expanded="false">
              <span class="sr-only">Open main menu</span>
              <!-- Icon when menu is closed -->
              <svg *ngIf="!isMenuOpen()" class="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <!-- Icon when menu is open -->
              <svg *ngIf="isMenuOpen()" class="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <!-- Mobile Menu -->
      <div *ngIf="isMenuOpen()" class="md:hidden absolute top-20 left-0 w-full bg-white/90 dark:bg-dark/95 backdrop-blur-xl border-b border-gray-200 dark:border-gray-800 shadow-2xl transform transition-all duration-300 ease-in-out" id="mobile-menu">
        <div class="px-4 py-8 space-y-4">
          <a routerLink="/" 
             (click)="closeMenu()"
             routerLinkActive="bg-primary/10 text-primary border-primary"
             [routerLinkActiveOptions]="{exact: true}"
             class="block px-4 py-3 rounded-xl border border-transparent text-base font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
             Home
          </a>
          <a routerLink="/blog" 
             (click)="closeMenu()"
             routerLinkActive="bg-primary/10 text-primary border-primary"
             class="block px-4 py-3 rounded-xl border border-transparent text-base font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
             Blog
          </a>
          
         
        </div>
      </div>
    </header>
  `
})
export class HeaderComponent {
  protected isMenuOpen = signal(false);

  toggleMenu() {
    this.isMenuOpen.update(v => !v);
  }

  closeMenu() {
    this.isMenuOpen.set(false);
  }
}
