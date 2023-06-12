const { offlineFallback, warmStrategyCache } = require('workbox-recipes'); // import workbox recipes for offline fallback and warm strategy cache
const { CacheFirst, StaleWhileRevalidate } = require('workbox-strategies'); // import workbox strategies for cache first and stale while revalidate
const { registerRoute } = require('workbox-routing'); // import workbox routing
const { CacheableResponsePlugin } = require('workbox-cacheable-response'); // import workbox cacheable response plugin
const { ExpirationPlugin } = require('workbox-expiration'); // import workbox expiration plugin
const { precacheAndRoute } = require('workbox-precaching/precacheAndRoute'); // import workbox precache and route

precacheAndRoute(self.__WB_MANIFEST); // precache and route workbox manifest

const pageCache = new CacheFirst({ // create new cache first strategy
  cacheName: 'page-cache', // name of cache storage
  plugins: [ // array of plugins
    new CacheableResponsePlugin({ // cacheable response plugin
      statuses: [0, 200], // cache responses with these statuses
    }),
    new ExpirationPlugin({ // expiration plugin
      maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
    }),
  ],
});

warmStrategyCache({ // warm strategy cache
  urls: ['/index.html', '/'], // array of urls to warm cache
  strategy: pageCache, // strategy to use
});

offlineFallback({ // offline fallback
  pageFallback: '/index.html', // page fallback url
});

// Set up asset cache
registerRoute(
  // Here we define the callback function that will filter the requests we want to cache (in this case, JS and CSS files)
  ({ request }) => ['style', 'script', 'worker'].includes(request.destination),
  new StaleWhileRevalidate({
    // Name of the cache storage.
    cacheName: 'asset-cache',
    plugins: [
      // This plugin will cache responses with these headers to a maximum-age of 30 days
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
      new ExpirationPlugin({
        maxEntries: 60,
        maxAgeSeconds: 30 * 24 * 60 * 60, //30 Days
      })
    ],
  })
);
