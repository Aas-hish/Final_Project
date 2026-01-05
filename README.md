# Angular Universal SSR Starter

A production-ready Angular application with Server-Side Rendering (SSR) using Angular Universal, Node.js, and Express. This starter template demonstrates how to build SEO-optimized, high-performance Angular applications with universal rendering capabilities.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Requirements](#requirements)
- [Installation](#installation)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [SEO Features](#seo-features)
- [SSR Concepts](#ssr-concepts)
- [Development](#development)
- [Building for Production](#building-for-production)
- [Deployment](#deployment)
- [Troubleshooting](#troubleshooting)
- [Performance Optimization](#performance-optimization)
- [Extending the Project](#extending-the-project)

## 🎯 Overview

This project addresses the common challenges of Single-Page Applications (SPAs) by implementing Server-Side Rendering:

- **Problem**: SPAs built with Angular run largely on the client side, leading to slower initial page loads, poorer SEO, and suboptimal First Contentful Paint (FCP)
- **Solution**: Server-Side Rendering (SSR) pre-renders pages on the server, improving performance and SEO
- **Result**: Fast initial load, better search engine indexing, and improved user experience

## ✨ Features

### Core SSR Features
- ✅ **Angular Universal** integration with `@angular/ssr`
- ✅ **Node.js/Express** server for server-side rendering
- ✅ **Client Hydration** with event replay for seamless interactivity
- ✅ **Universal Routing** - routes work on both server and client
- ✅ **Lazy Loading** - code splitting for optimal bundle sizes
- ✅ **HTTP Client** - data fetching works in SSR mode with `withFetch()`

### SEO Optimizations
- ✅ **Meta Tags** - Dynamic title and description for each route
- ✅ **Open Graph Tags** - Rich social media previews (Facebook, LinkedIn)
- ✅ **Twitter Cards** - Optimized Twitter sharing
- ✅ **Canonical URLs** - Prevent duplicate content issues
- ✅ **Structured Data (JSON-LD)** - Article, Website, and Breadcrumb schemas
- ✅ **robots.txt** - Search engine crawler directives
- ✅ **sitemap.xml** - Site structure for search engines

### Developer Experience
- ✅ **Standalone Components** - Modern Angular architecture
- ✅ **TypeScript** - Full type safety
- ✅ **Clean Architecture** - Well-organized, extensible codebase
- ✅ **Comprehensive Documentation** - This README and inline comments

## 📦 Requirements

- **Node.js** 18 or higher
- **npm** 10 or higher (or compatible package manager)

## 🚀 Installation

1. **Clone or download** this repository

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Verify installation**:
   ```bash
   npm run build:ssr
   ```

## 🏃 Getting Started

### Development Mode (Client-Side Only)

Run the application in development mode without SSR:

```bash
npm start
```

The application will be available at `http://localhost:4200`

### Development Mode (With SSR)

Build and run with SSR enabled:

```bash
npm run build:ssr
npm run serve:ssr
```

The server will start on port `4000` (or the port specified in the `PORT` environment variable).

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Start development server (client-side only) |
| `npm run build` | Build the application |
| `npm run build:ssr` | Build with SSR support |
| `npm run serve:ssr` | Build and serve with SSR |
| `npm run watch` | Build and watch for changes |
| `npm test` | Run unit tests |

## 📁 Project Structure

```
angular-ssr-universal/
├── public/                    # Static assets
│   ├── favicon.ico
│   ├── robots.txt            # SEO: Search engine directives
│   └── sitemap.xml           # SEO: Site structure
├── src/
│   ├── app/
│   │   ├── app.ts            # Root component
│   │   ├── app.html          # Root template
│   │   ├── app.config.ts     # Browser configuration
│   │   ├── app.config.server.ts  # Server configuration
│   │   ├── app.routes.ts     # Application routes
│   │   ├── app.routes.server.ts  # SSR route configuration
│   │   ├── app.server.module.ts   # Server module (compatibility)
│   │   ├── models/           # TypeScript interfaces
│   │   │   └── blog-post.ts
│   │   ├── pages/            # Feature components
│   │   │   ├── home/
│   │   │   ├── blog-list/
│   │   │   └── blog-detail/
│   │   └── services/         # Services
│   │       ├── blog.service.ts
│   │       ├── seo.service.ts      # SEO management
│   │       └── sitemap.service.ts  # Sitemap generation
│   ├── main.ts               # Browser entry point
│   ├── main.server.ts       # Server entry point
│   ├── server.ts            # Express server setup
│   ├── index.html           # HTML template
│   └── styles.css           # Global styles
├── angular.json              # Angular CLI configuration
├── package.json              # Dependencies and scripts
└── README.md                # This file
```

## 🔍 SEO Features

This project includes comprehensive SEO optimizations:

### 1. Meta Tags

Each route dynamically sets:
- Page title
- Meta description
- Keywords
- Author information

**Example** (from `blog-detail.component.ts`):
```typescript
this.seoService.setSEOData({
  title: `${post.title} · Angular Universal SSR Starter`,
  description: post.body.slice(0, 160),
  keywords: 'Angular, Angular Universal, SSR',
  // ...
});
```

### 2. Open Graph Tags

Enables rich previews when sharing on social media:
- `og:title` - Page title
- `og:description` - Page description
- `og:image` - Preview image
- `og:url` - Canonical URL
- `og:type` - Content type (website/article)

### 3. Twitter Cards

Optimized for Twitter sharing:
- `twitter:card` - Card type (summary_large_image)
- `twitter:title` - Tweet title
- `twitter:description` - Tweet description
- `twitter:image` - Preview image

### 4. Canonical URLs

Prevents duplicate content issues by specifying the canonical URL for each page.

### 5. Structured Data (JSON-LD)

Implements Schema.org markup for:
- **Article** - Blog posts with author, publish date, etc.
- **WebSite** - Site-wide information
- **BreadcrumbList** - Navigation breadcrumbs

### 6. robots.txt

Located at `/public/robots.txt`, guides search engine crawlers:
```
User-agent: *
Allow: /
Sitemap: https://your-domain.com/sitemap.xml
```

### 7. sitemap.xml

Located at `/public/sitemap.xml`, helps search engines discover all pages.

**Note**: Update the domain in `robots.txt`, `sitemap.xml`, and `seo.service.ts` with your actual domain.

## 🧠 SSR Concepts

### What is Server-Side Rendering?

Server-Side Rendering (SSR) generates the initial HTML on the server before sending it to the client. This provides:

1. **Faster Initial Load** - Users see content immediately
2. **Better SEO** - Search engines receive fully rendered HTML
3. **Improved Performance** - Better First Contentful Paint (FCP) metrics

### How It Works

1. **Request Arrives** - User or crawler requests a URL
2. **Server Renders** - Node.js server runs Angular and renders the component
3. **HTML Sent** - Fully rendered HTML is sent to the client
4. **Hydration** - Angular "hydrates" the page, making it interactive
5. **SPA Mode** - Subsequent navigation works as a normal SPA

### SSR vs Client-Side Rendering

| Aspect | Client-Side (SPA) | Server-Side (SSR) |
|--------|------------------|-------------------|
| Initial HTML | Minimal shell | Fully rendered |
| SEO | Limited | Excellent |
| First Load | Slower | Faster |
| Subsequent Navigation | Fast | Fast |
| Server Load | Low | Higher |

### Hydration

Hydration is the process where Angular takes over the server-rendered HTML and makes it interactive. The `provideClientHydration()` function enables this with event replay for optimal UX.

## 💻 Development

### Adding New Routes

1. **Create a component**:
   ```bash
   ng generate component pages/my-feature
   ```

2. **Add route** in `app.routes.ts`:
   ```typescript
   {
     path: 'my-feature',
     loadComponent: () =>
       import('./pages/my-feature/my-feature.component').then(
         (m) => m.MyFeatureComponent
       ),
   }
   ```

3. **Configure SSR** in `app.routes.server.ts` (already configured for all routes)

4. **Add SEO** in your component:
   ```typescript
   ngOnInit(): void {
     this.seoService.setSEOData({
       title: 'My Feature · Angular Universal SSR Starter',
       description: 'Description of my feature',
       url: this.getCurrentUrl(),
     });
   }
   ```

### Adding SEO to Components

Use the `SeoService` to set comprehensive SEO data:

```typescript
import { SeoService } from '../../services/seo.service';

export class MyComponent implements OnInit {
  private readonly seoService = inject(SeoService);

  ngOnInit(): void {
    this.seoService.setSEOData({
      title: 'Page Title',
      description: 'Page description',
      keywords: 'keyword1, keyword2',
      image: 'https://example.com/image.jpg',
      url: 'https://example.com/my-page',
      type: 'website', // or 'article'
    });
  }
}
```

### SSR-Safe Code

When writing components for SSR:

✅ **DO**:
- Use Angular services (Title, Meta, HttpClient)
- Use dependency injection
- Handle platform differences with `typeof window !== 'undefined'`

❌ **DON'T**:
- Access browser-only APIs directly (`window`, `document`, `localStorage`)
- Use browser globals without checks
- Assume DOM is always available

**Example**:
```typescript
// ✅ Good
private getCurrentUrl(): string {
  if (typeof window !== 'undefined') {
    return window.location.href;
  }
  return 'https://fallback-url.com';
}

// ❌ Bad
private getCurrentUrl(): string {
  return window.location.href; // Will fail on server
}
```

## 🏗️ Building for Production

### Build Commands

```bash
# Build for production with SSR
npm run build:ssr

# Output will be in dist/angular-ssr-universal/
# - browser/ - Client-side bundle
# - server/ - Server-side bundle
```

### Production Considerations

1. **Environment Variables**:
   - Set `PORT` for server port
   - Configure `NODE_ENV=production`

2. **Performance**:
   - Enable production optimizations in `angular.json`
   - Use CDN for static assets
   - Enable compression (gzip/brotli)

3. **Security**:
   - Use HTTPS in production
   - Set secure headers
   - Validate and sanitize inputs

## 🚢 Deployment

### Option 1: Node.js Server (Recommended)

Deploy to any Node.js hosting:

1. **Build the application**:
   ```bash
   npm run build:ssr
   ```

2. **Start the server**:
   ```bash
   node dist/angular-ssr-universal/server/server.mjs
   ```

3. **Use a process manager** (PM2, systemd, etc.):
   ```bash
   pm2 start dist/angular-ssr-universal/server/server.mjs --name angular-ssr
   ```

### Option 2: Docker

Create a `Dockerfile`:

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build:ssr
EXPOSE 4000
CMD ["node", "dist/angular-ssr-universal/server/server.mjs"]
```

Build and run:
```bash
docker build -t angular-ssr .
docker run -p 4000:4000 angular-ssr
```

### Option 3: Cloud Platforms

- **Vercel**: Automatic SSR support
- **Netlify**: Configure build command
- **AWS/Google Cloud**: Deploy Node.js server
- **Azure**: App Service with Node.js

### Environment Configuration

Update these files with your production domain:
- `src/app/services/seo.service.ts` - Set `baseUrl`
- `public/robots.txt` - Update sitemap URL
- `public/sitemap.xml` - Update all URLs

## 🐛 Troubleshooting

### Common Issues

#### 1. "window is not defined" Error

**Problem**: Accessing browser APIs on the server.

**Solution**: Check for browser environment:
```typescript
if (typeof window !== 'undefined') {
  // Browser-only code
}
```

#### 2. Hydration Mismatch

**Problem**: Server and client render different HTML.

**Solution**: 
- Ensure no browser-only code runs during SSR
- Use `isPlatformBrowser()` from `@angular/common`
- Avoid random values or dates in templates

#### 3. Port Already in Use

**Problem**: Port 4000 is already in use.

**Solution**: Set a different port:
```bash
PORT=3000 npm run serve:ssr
```

#### 4. Build Errors

**Problem**: TypeScript or build errors.

**Solution**:
- Check Node.js version (18+)
- Clear `node_modules` and reinstall
- Check `angular.json` configuration

#### 5. SEO Tags Not Appearing

**Problem**: Meta tags not visible in page source.

**Solution**:
- Ensure `SeoService` is called in `ngOnInit()`
- Check that server is rendering (not just client)
- Verify meta tags in server-rendered HTML

## ⚡ Performance Optimization

### 1. Lazy Loading

Routes are already lazy-loaded. Keep this pattern for new routes.

### 2. Image Optimization

- Use `loading="lazy"` for images below the fold
- Optimize images (WebP, compression)
- Use CDN for image delivery

### 3. Caching

- HTTP client uses `shareReplay()` to cache requests
- Static assets are cached (configured in `server.ts`)
- Consider service workers for offline support

### 4. Bundle Size

- Use lazy loading for features
- Tree-shaking is enabled automatically
- Monitor bundle sizes with `ng build --stats-json`

### 5. Server Performance

- Use compression middleware
- Implement request caching
- Consider CDN for static assets
- Monitor server response times

## 🔧 Extending the Project

### Adding a New Service

1. Create service file: `src/app/services/my-service.ts`
2. Use `providedIn: 'root'` for singleton
3. Inject where needed

### Adding a New Feature Module

1. Generate component: `ng generate component features/my-feature`
2. Add route with lazy loading
3. Implement SEO if it's a page
4. Add to sitemap if needed

### Connecting to a Real API

Replace the mock data in `BlogService`:

```typescript
getPosts(): Observable<BlogPost[]> {
  return this.http.get<BlogPost[]>('https://api.example.com/posts');
}
```

### Adding Authentication

1. Implement auth service
2. Add route guards
3. Handle auth state in SSR
4. Use cookies or tokens appropriately

## 📚 Additional Resources

- [Angular SSR Guide](https://angular.dev/guide/ssr)
- [Angular Universal Documentation](https://angular.io/guide/universal)
- [Schema.org Documentation](https://schema.org/)
- [Open Graph Protocol](https://ogp.me/)
- [Twitter Cards](https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/abouts-cards)

## 📝 License

This project is provided as a starter template. Feel free to use it for your projects.

## 🤝 Contributing

This is a starter template. Feel free to:
- Report issues
- Suggest improvements
- Fork and customize for your needs

## 📧 Support

For Angular SSR questions:
- [Angular Discord](https://discord.gg/angular)
- [Angular GitHub Discussions](https://github.com/angular/angular/discussions)

---

**Built with ❤️ using Angular Universal, Node.js, and Express**
