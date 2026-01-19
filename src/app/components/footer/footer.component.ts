import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-footer',
    standalone: true,
    imports: [CommonModule],
    template: `
    <footer class="relative bg-black text-white pt-20 pb-10 overflow-hidden">
      <!-- Background Glow -->
      <div class="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-primary/20 blur-[120px] rounded-full opacity-30 pointer-events-none"></div>

      <div class="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          
          <!-- Brand Column -->
          <div class="space-y-6">
            <a href="/" class="flex items-center gap-2 group">
              <div class="w-10 h-10 flex items-center justify-center bg-gradient-to-br from-primary to-accent rounded-xl shadow-lg shadow-primary/20 group-hover:shadow-primary/40 transition-shadow duration-300">
                <span class="text-white font-bold text-xl">D</span>
              </div>
              <span class="text-2xl font-display font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">DevPulse</span>
            </a>
            <p class="text-gray-400 leading-relaxed">
              Your daily source for insightful articles, tech trends, and creative inspiration. Join our community of readers and thinkers.
            </p>
          </div>

          <!-- Resources -->
          <div>
            <h3 class="text-white font-semibold text-lg mb-6">Product</h3>
            <ul class="space-y-4">
              <li><a href="#" class="text-gray-400 hover:text-white transition-colors">Features</a></li>
              <li><a href="#" class="text-gray-400 hover:text-white transition-colors">Documentation</a></li>
              <li><a href="#" class="text-gray-400 hover:text-white transition-colors">Pricing</a></li>
              <li><a href="#" class="text-gray-400 hover:text-white transition-colors">Changelog</a></li>
            </ul>
          </div>

          <!-- Company -->
          <div>
            <h3 class="text-white font-semibold text-lg mb-6">Company</h3>
            <ul class="space-y-4">
              <li><a href="#" class="text-gray-400 hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" class="text-gray-400 hover:text-white transition-colors">Careers</a></li>
              <li><a href="#" class="text-gray-400 hover:text-white transition-colors">Blog</a></li>
              <li><a href="#" class="text-gray-400 hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>

          <!-- Newsletter -->
          <div>
            <h3 class="text-white font-semibold text-lg mb-6">Stay Updated</h3>
            <p class="text-gray-400 mb-4 text-sm">Get the latest updates and news delivered to your inbox.</p>
            <div class="relative">
              <input type="email" placeholder="Enter your email" class="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all">
              <button class="absolute right-1 top-1 bottom-1 bg-gradient-to-r from-primary to-accent text-white px-4 rounded-md font-medium text-sm hover:opacity-90 transition-opacity">
                Join
              </button>
            </div>
          </div>

        </div>

        <div class="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p class="text-gray-500 text-sm">
            &copy; 2026 DevPulse. All rights reserved.
          </p>
          <div class="flex gap-6">
            <a href="#" class="text-gray-500 hover:text-white text-sm transition-colors">Privacy Policy</a>
            <a href="#" class="text-gray-500 hover:text-white text-sm transition-colors">Terms of Service</a>
            <a href="#" class="text-gray-500 hover:text-white text-sm transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  `
})
export class FooterComponent { }
