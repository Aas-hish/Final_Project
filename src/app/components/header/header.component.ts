import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  template: `
    <header class="fixed w-full top-0 z-50 bg-white/80 dark:bg-dark/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 transition-colors duration-300">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <!-- Logo -->
          <div class="flex-shrink-0 flex items-center">
             <a routerLink="/" class="text-2xl font-display font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
               Final Project
             </a>
          </div>

          <!-- Desktop Menu -->
          <nav class="hidden md:flex space-x-8">
            <a routerLink="/" 
               routerLinkActive="text-primary font-semibold" 
               [routerLinkActiveOptions]="{exact: true}"
               class="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors">
               Home
            </a>
            <a routerLink="/blog" 
               routerLinkActive="text-primary font-semibold" 
               class="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors">
               Blog
            </a>
          </nav>

          <!-- Mobile Menu Button -->
          <div class="flex items-center md:hidden">
            <button (click)="toggleMenu()" type="button" class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary" aria-controls="mobile-menu" aria-expanded="false">
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
      <div *ngIf="isMenuOpen()" class="md:hidden bg-white dark:bg-dark border-b border-gray-200 dark:border-gray-800" id="mobile-menu">
        <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <a routerLink="/" 
             (click)="closeMenu()"
             routerLinkActive="bg-blue-50 dark:bg-blue-900/20 text-primary"
             [routerLinkActiveOptions]="{exact: true}"
             class="text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-primary block px-3 py-2 rounded-md text-base font-medium">
             Home
          </a>
          <a routerLink="/blog" 
             (click)="closeMenu()"
             routerLinkActive="bg-blue-50 dark:bg-blue-900/20 text-primary"
             class="text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-primary block px-3 py-2 rounded-md text-base font-medium">
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
