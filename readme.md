# VUE SSR TEMPLATE

## Checklist
- website Name & Logo & Meta: /pubic/*, /index.template.html, /server.js, /src/mixin/meta.js
- [vue Core](vuejs.org)
- [router](https://router.vuejs.org/en/): /src/router/index.js
- [vuex](https://vuex.vuejs.org/): /src/store/*


## Features

- Server Side Rendering
  - Vue + vue-router + vuex working together
  - Server-side data pre-fetching
  - Client-side state & DOM hydration
  - Automatically inlines CSS used by rendered components only
  - Preload / prefetch resource hints
  - Route-level code splitting
- Progressive Web App
  - App manifest
  - Service worker
  - 100/100 Lighthouse score
- Single-file Vue Components
  - Hot-reload in development
  - CSS extraction for production
- Animation
  - Effects when switching route views

## Build Setup

**Requires Node.js 8+**

``` bash
# install dependencies
npm install # or yarn

# serve in dev mode, with hot reload at localhost, port depends on /config/index.js
npm run dev

# build for production
npm run build

# serve in production mode
npm start
```

## License

MIT
