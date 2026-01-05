import { Injectable } from '@angular/core';
import { Observable, of, shareReplay, map } from 'rxjs';

import { BlogPost } from '../models/blog-post';

const POSTS: BlogPost[] = [
  {
    id: 1,
    title: 'Understanding Server-Side Rendering in Angular',
    body: 'Server-Side Rendering (SSR) in Angular uses Angular Universal to render application pages on the server before sending them to the client. This approach allows browsers and search engines to receive fully rendered HTML, improving page load speed and SEO. Once the HTML is delivered, Angular hydrates the application on the client side, enabling full interactivity without reloading the page.',
    imageUrl: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 2,
    title: 'Why Angular SPAs Struggle with SEO',
    body: 'Traditional Angular Single-Page Applications rely heavily on client-side rendering, meaning most of the page content is generated in the browser using JavaScript. Search engine crawlers may not always execute JavaScript efficiently, resulting in incomplete indexing. SSR solves this by providing fully rendered HTML content to crawlers, ensuring better discoverability.',
    imageUrl: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 3,
    title: 'Angular Universal Architecture Explained',
    body: 'Angular Universal works by running Angular in a Node.js environment. It uses a server module (AppServerModule) and a Node.js server to render views. The same Angular components are reused for both server and client rendering, ensuring consistency and reducing duplication of logic.',
    imageUrl: 'data:image/png;base64,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',
  },
  {
    id: 4,
    title: 'Role of Node.js in Angular SSR',
    body: 'Node.js provides the runtime environment required to execute Angular Universal on the server. It handles incoming HTTP requests, triggers server-side rendering, and sends pre-rendered HTML responses to users. Node.js is used strictly as a rendering engine in SSR, not as a full backend system.',
    imageUrl: 'https://images.unsplash.com/photo-1526378722484-cc5c7100f58f?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 5,
    title: 'Using Express as a Lightweight SSR Server',
    body: 'Express.js acts as a minimal server layer for Angular Universal. It serves static files, forwards requests to the Angular rendering engine, and returns HTML responses. Using Express keeps the server implementation simple and aligns with Angular’s official SSR recommendations.',
    imageUrl: 'https://images.unsplash.com/photo-1470290378698-263fa7ca55ff?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 6,
    title: 'Improving First Contentful Paint with SSR',
    body: 'First Contentful Paint (FCP) measures how quickly users see meaningful content. With SSR, the browser receives a fully rendered page immediately, reducing the time required to display content. This results in faster perceived performance and improved user experience, especially on slower networks.',
    imageUrl: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 7,
    title: 'Routing in Angular Universal Applications',
    body: 'Angular Router works seamlessly with SSR by resolving routes on the server during initial rendering. This ensures that each route has its own HTML content, which search engines can index properly. When the application hydrates on the client, routing continues to function normally without reloading the page.',
    imageUrl: 'https://images.unsplash.com/photo-1522196772883-393d879eb14a?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 8,
    title: 'Handling HTTP Requests in SSR Mode',
    body: 'Angular Universal supports HTTP requests during server rendering using HttpClient. Data is fetched on the server, embedded into the rendered HTML, and reused during hydration. This prevents duplicate requests and ensures consistent data between server and client.',
    imageUrl: 'https://images.unsplash.com/photo-1518773553398-650c184e0bb3?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 9,
    title: 'SEO Optimization Using Meta and Title Services',
    body: 'Angular provides Meta and Title services to dynamically update page metadata during SSR. Setting titles and meta descriptions on the server helps search engines correctly index content and improves visibility in search results and social media previews.',
    imageUrl: 'https://images.unsplash.com/photo-1522199710521-72d69614c702?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 10,
    title: 'Angular Universal as a Starter Template',
    body: 'An Angular Universal starter template provides developers with a clean and extensible foundation for building SSR-enabled applications. It includes routing, server configuration, and SEO support out of the box, allowing teams to focus on features rather than infrastructure.',
    imageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=900&q=80',
  },
];


@Injectable({ providedIn: 'root' })
export class BlogService {
  private readonly posts$ = of(POSTS).pipe(
    // cache across server render and client hydration
    shareReplay({ bufferSize: 1, refCount: true }),
  );

  getPosts(): Observable<BlogPost[]> {
    return this.posts$;
  }

  getPost(id: number): Observable<BlogPost | undefined> {
    return this.posts$.pipe(map((posts) => posts.find((p) => p.id === id)));
  }
}
