if(!self.define){let e,s={};const a=(a,i)=>(a=new URL(a+".js",i).href,s[a]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=a,e.onload=s,document.head.appendChild(e)}else e=a,importScripts(a),s()})).then((()=>{let e=s[a];if(!e)throw new Error(`Module ${a} didn’t register its module`);return e})));self.define=(i,n)=>{const t=e||("document"in self?document.currentScript.src:"")||location.href;if(s[t])return;let c={};const u=e=>a(e,t),r={module:{uri:t},exports:c,require:u};s[t]=Promise.all(i.map((e=>r[e]||u(e)))).then((e=>(n(...e),c)))}}define(["./workbox-8637ed29"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/chunks/111-91fffc78423309a0.js",revision:"qjOT0iAusauAlg99I1Ej8"},{url:"/_next/static/chunks/281-7412760c9d23593f.js",revision:"qjOT0iAusauAlg99I1Ej8"},{url:"/_next/static/chunks/4ae7487b-e6e837efeaa3a597.js",revision:"qjOT0iAusauAlg99I1Ej8"},{url:"/_next/static/chunks/514-8f45090a4a6ca3bb.js",revision:"qjOT0iAusauAlg99I1Ej8"},{url:"/_next/static/chunks/523-bd6b9e536c50c742.js",revision:"qjOT0iAusauAlg99I1Ej8"},{url:"/_next/static/chunks/539-bb066a7b79053338.js",revision:"qjOT0iAusauAlg99I1Ej8"},{url:"/_next/static/chunks/620-b288973f64bd8a60.js",revision:"qjOT0iAusauAlg99I1Ej8"},{url:"/_next/static/chunks/637-748ce4ced99ccd83.js",revision:"qjOT0iAusauAlg99I1Ej8"},{url:"/_next/static/chunks/870-25bb22c6256750bd.js",revision:"qjOT0iAusauAlg99I1Ej8"},{url:"/_next/static/chunks/901-04631ad399a4976b.js",revision:"qjOT0iAusauAlg99I1Ej8"},{url:"/_next/static/chunks/986-0512bea67cd61a95.js",revision:"qjOT0iAusauAlg99I1Ej8"},{url:"/_next/static/chunks/app/(admin)/dashboard/page-9ba1175efa1f8fbd.js",revision:"qjOT0iAusauAlg99I1Ej8"},{url:"/_next/static/chunks/app/(admin)/layout-cc603ee94071ec06.js",revision:"qjOT0iAusauAlg99I1Ej8"},{url:"/_next/static/chunks/app/(admin)/manage-categories/page-1b084b88a58e2f45.js",revision:"qjOT0iAusauAlg99I1Ej8"},{url:"/_next/static/chunks/app/(admin)/manage-orders/page-1874ac5f3067df1a.js",revision:"qjOT0iAusauAlg99I1Ej8"},{url:"/_next/static/chunks/app/(admin)/manage-products/page-d0b43adbb0173942.js",revision:"qjOT0iAusauAlg99I1Ej8"},{url:"/_next/static/chunks/app/account/layout-8e022b93f2236930.js",revision:"qjOT0iAusauAlg99I1Ej8"},{url:"/_next/static/chunks/app/account/page-385259609b9b6fd8.js",revision:"qjOT0iAusauAlg99I1Ej8"},{url:"/_next/static/chunks/app/category/%5Bcategory%5D/page-f7b45d3910b1bd66.js",revision:"qjOT0iAusauAlg99I1Ej8"},{url:"/_next/static/chunks/app/checkout/page-f524d2bf008f21da.js",revision:"qjOT0iAusauAlg99I1Ej8"},{url:"/_next/static/chunks/app/global-error-b6bdc07f39e5e13f.js",revision:"qjOT0iAusauAlg99I1Ej8"},{url:"/_next/static/chunks/app/layout-b2a446413ae56c85.js",revision:"qjOT0iAusauAlg99I1Ej8"},{url:"/_next/static/chunks/app/loading-430d106e8c9ce483.js",revision:"qjOT0iAusauAlg99I1Ej8"},{url:"/_next/static/chunks/app/not-found-df816014731a90ab.js",revision:"qjOT0iAusauAlg99I1Ej8"},{url:"/_next/static/chunks/app/orders/%5Bid%5D/page-81f57c53ff6052ce.js",revision:"qjOT0iAusauAlg99I1Ej8"},{url:"/_next/static/chunks/app/page-a49cab846d3f1517.js",revision:"qjOT0iAusauAlg99I1Ej8"},{url:"/_next/static/chunks/app/products/%5Bslug%5D/page-cfe13f3c7228e885.js",revision:"qjOT0iAusauAlg99I1Ej8"},{url:"/_next/static/chunks/app/search/page-93e3ccbf18274605.js",revision:"qjOT0iAusauAlg99I1Ej8"},{url:"/_next/static/chunks/framework-510ec8ffd65e1d01.js",revision:"qjOT0iAusauAlg99I1Ej8"},{url:"/_next/static/chunks/main-9f61fc6a93b8a4c5.js",revision:"qjOT0iAusauAlg99I1Ej8"},{url:"/_next/static/chunks/main-app-f32e547113c87c17.js",revision:"qjOT0iAusauAlg99I1Ej8"},{url:"/_next/static/chunks/pages/_app-777db899fae5ab67.js",revision:"qjOT0iAusauAlg99I1Ej8"},{url:"/_next/static/chunks/pages/_error-aeccb15722caf068.js",revision:"qjOT0iAusauAlg99I1Ej8"},{url:"/_next/static/chunks/polyfills-c67a75d1b6f99dc8.js",revision:"837c0df77fd5009c9e46d446188ecfd0"},{url:"/_next/static/chunks/webpack-d7f6107ea8787444.js",revision:"qjOT0iAusauAlg99I1Ej8"},{url:"/_next/static/css/f1c5df26363c0ed1.css",revision:"f1c5df26363c0ed1"},{url:"/_next/static/media/05a31a2ca4975f99-s.woff2",revision:"f1b44860c66554b91f3b1c81556f73ca"},{url:"/_next/static/media/513657b02c5c193f-s.woff2",revision:"c4eb7f37bc4206c901ab08601f21f0f2"},{url:"/_next/static/media/51ed15f9841b9f9d-s.woff2",revision:"bb9d99fb9bbc695be80777ca2c1c2bee"},{url:"/_next/static/media/c9a5bc6a7c948fb0-s.p.woff2",revision:"74c3556b9dad12fb76f84af53ba69410"},{url:"/_next/static/media/carousel-1.87e91918.webp",revision:"a3d5237579b934c7aec1627ca272a2b9"},{url:"/_next/static/media/carousel-2.a2e94ad4.webp",revision:"9beae01d05b9c92a86082106455dc673"},{url:"/_next/static/media/carousel-3.891ba35f.webp",revision:"495506e8782f144e3b4df554256afb82"},{url:"/_next/static/media/d6b16ce4a6175f26-s.woff2",revision:"dd930bafc6297347be3213f22cc53d3e"},{url:"/_next/static/media/ec159349637c90ad-s.woff2",revision:"0e89df9522084290e01e4127495fae99"},{url:"/_next/static/media/fd4db3eb5472fc27-s.woff2",revision:"71f3fcaf22131c3368d9ec28ef839831"},{url:"/_next/static/qjOT0iAusauAlg99I1Ej8/_buildManifest.js",revision:"c3b228bc4ee0d544a5f3904cbff284a3"},{url:"/_next/static/qjOT0iAusauAlg99I1Ej8/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({response:e})=>e&&"opaqueredirect"===e.type?new Response(e.body,{status:200,statusText:"OK",headers:e.headers}):e}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:2592e3})]}),"GET"),e.registerRoute(/\/_next\/static.+\.js$/i,new e.CacheFirst({cacheName:"next-static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4|webm)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:48,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({sameOrigin:e,url:{pathname:s}})=>!(!e||s.startsWith("/api/auth/")||!s.startsWith("/api/"))),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({request:e,url:{pathname:s},sameOrigin:a})=>"1"===e.headers.get("RSC")&&"1"===e.headers.get("Next-Router-Prefetch")&&a&&!s.startsWith("/api/")),new e.NetworkFirst({cacheName:"pages-rsc-prefetch",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({request:e,url:{pathname:s},sameOrigin:a})=>"1"===e.headers.get("RSC")&&a&&!s.startsWith("/api/")),new e.NetworkFirst({cacheName:"pages-rsc",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:{pathname:e},sameOrigin:s})=>s&&!e.startsWith("/api/")),new e.NetworkFirst({cacheName:"pages",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({sameOrigin:e})=>!e),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
