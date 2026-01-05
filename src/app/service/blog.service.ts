import { Injectable } from '@angular/core';
import { Observable, of, shareReplay, map } from 'rxjs';

import { BlogPost } from '../models/blog-post';

// Helper to generate a consistent looking large body text
const LOREM_BODY = `
  <p class="mb-4">In today's rapidly evolving landscape, keeping up with the latest trends is essential. Whether you are following market shifts or tracking the latest scores, information is power.</p>
  <p class="mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
  <h3 class="text-2xl font-bold my-4 dark:text-gray-100">The Impact on Society</h3>
  <p class="mb-4">Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
  <ul class="list-disc pl-6 mb-6 space-y-2">
    <li>Significant changes in the last quarter.</li>
    <li>New regulatory frameworks being introduced.</li>
    <li>Public reception has been overwhelmingly positive.</li>
  </ul>
  <p>To conclude, the future looks bright but requires vigilance and adaptability from all sectors involved.</p>
`;

const POSTS: BlogPost[] = [
  // TECH / ANGULAR
  {
    id: 1,
    title: 'Understanding Server-Side Rendering in Angular',
    body: 'Server-Side Rendering (SSR) in Angular uses Angular Universal to render application pages on the server before sending them to the client. This approach allows browsers and search engines to receive fully rendered HTML, improving page load speed and SEO.',
    imageUrl: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=80',
    category: 'Technology',
    author: 'Alex Dev',
    date: 'Jan 5, 2026',
    readTime: '5 min read'
  },

  // SPORTS
  {
    id: 101,
    title: 'The Evolution of Modern Football Tactics',
    body: 'Football has seen a massive shift from traditional 4-4-2 formations to fluid, high-pressing systems. Managers like Guardiola and Klopp have redefined the game with "Gegenpressing" and possession-based dominance. We analyze the stats behind the champions.',
    imageUrl: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=900&q=80',
    category: 'Sports',
    author: 'Marcus Goal',
    date: 'Jan 4, 2026',
    readTime: '7 min read'
  },
  {
    id: 102,
    title: 'Grand Slam Glory: Tennis in the New Era',
    body: 'With the legends of the past decade slowly retiring, a new generation of tennis stars is rising. From Alcaraz to Gauff, the speed and power of the modern game are reaching new heights. Who will dominate the next major?',
    imageUrl: 'https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?auto=format&fit=crop&w=900&q=80',
    category: 'Sports',
    author: 'Serena Net',
    date: 'Jan 2, 2026',
    readTime: '4 min read'
  },

  // TRADE / FINANCE
  {
    id: 201,
    title: 'Global Markets: Navigating the 2026 Recession Risks',
    body: 'Inflation rates are stabilizing, but the global economy remains fragile. Central banks are treading a fine line between growth and stability. Investors are advised to look into diverse portfolios including commodities and emerging tech stocks.',
    imageUrl: 'https://images.unsplash.com/photo-1611974765270-ca1258634369?auto=format&fit=crop&w=900&q=80',
    category: 'Trade',
    author: 'Jordan Wall',
    date: 'Dec 28, 2025',
    readTime: '10 min read'
  },
  {
    id: 202,
    title: 'Crypto vs Traditional Stocks: The 2026 Outlook',
    body: 'As regulation tightens around cryptocurrency, institutional investors are finally entering the chat. Is Bitcoin becoming a stable store of value, or remains a speculative asset? We compare the volatility indices of the S&P 500 against major crypto assets.',
    imageUrl: 'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?auto=format&fit=crop&w=900&q=80',
    category: 'Trade',
    author: 'Satoshi Nakamoto',
    date: 'Dec 20, 2025',
    readTime: '8 min read'
  },

  // POLITICS
  {
    id: 301,
    title: 'The Climate Policy Summit: Key Takeaways',
    body: 'World leaders gathered in Geneva to discuss the accelerated timeline for carbon neutrality. The new accords promise stricter penalties for non-compliance but offer massive subsidies for green energy transition. Here is what it means for your country.',
    imageUrl: 'https://images.unsplash.com/photo-1529101091760-61df6be5d18b?auto=format&fit=crop&w=900&q=80',
    category: 'Politics',
    author: 'Elena Green',
    date: 'Jan 3, 2026',
    readTime: '6 min read'
  },
  {
    id: 302,
    title: 'Tech Regulation: The Senate\'s New Bill',
    body: 'Big Tech is facing its biggest challenge yet as the Senate introduces the "Digital Fairness Act". This legislation aims to curb data monopolies and enforces stricter privacy rights for users. Lobbying efforts are at an all-time high.',
    imageUrl: 'https://images.unsplash.com/photo-1541872703-74c5963631df?auto=format&fit=crop&w=900&q=80',
    category: 'Politics',
    author: 'Washington Insider',
    date: 'Dec 15, 2025',
    readTime: '9 min read'
  },

  // MORE TECH
  {
    id: 2,
    title: 'Why Angular SPAs Struggle with SEO',
    body: 'Traditional Angular Single-Page Applications rely heavily on client-side rendering. SSR solves this by providing fully rendered HTML content to crawlers, ensuring better discoverability.',
    imageUrl: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=900&q=80',
    category: 'Technology',
    author: 'Sarah Code',
    date: 'Jan 1, 2026',
    readTime: '6 min read'
  },
];


@Injectable({ providedIn: 'root' })
export class BlogService {
  private readonly posts$ = of(POSTS).pipe(
    shareReplay({ bufferSize: 1, refCount: true }),
  );

  getPosts(): Observable<BlogPost[]> {
    return this.posts$;
  }

  getPost(id: number): Observable<BlogPost | undefined> {
    return this.posts$.pipe(map((posts) => {
      const post = posts.find((p) => p.id === id);
      if (post) {
        // Append rich body content for the detail view if it's the short description
        return { ...post, body: post.body + LOREM_BODY };
      }
      return undefined;
    }));
  }
}
