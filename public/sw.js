if(!self.define){let e,a={};const s=(s,i)=>(s=new URL(s+".js",i).href,a[s]||new Promise((a=>{if("document"in self){const e=document.createElement("script");e.src=s,e.onload=a,document.head.appendChild(e)}else e=s,importScripts(s),a()})).then((()=>{let e=a[s];if(!e)throw new Error(`Module ${s} didn’t register its module`);return e})));self.define=(i,c)=>{const n=e||("document"in self?document.currentScript.src:"")||location.href;if(a[n])return;let r={};const o=e=>s(e,n),t={module:{uri:n},exports:r,require:o};a[n]=Promise.all(i.map((e=>t[e]||o(e)))).then((e=>(c(...e),r)))}}define(["./workbox-7c2a5a06"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/V11Ah6C4h8Cxk7bpHZx8B/_buildManifest.js",revision:"93f4383a72b29c0a428bdd7d438cc00a"},{url:"/_next/static/V11Ah6C4h8Cxk7bpHZx8B/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/2cca2479-1af6370edeba6805.js",revision:"1af6370edeba6805"},{url:"/_next/static/chunks/603-8ad0c9d2bd0ee5c2.js",revision:"8ad0c9d2bd0ee5c2"},{url:"/_next/static/chunks/c16184b3-da9c41f88b4a1b61.js",revision:"da9c41f88b4a1b61"},{url:"/_next/static/chunks/framework-f707628ec3f247aa.js",revision:"f707628ec3f247aa"},{url:"/_next/static/chunks/main-b9438ee5c0e0826c.js",revision:"b9438ee5c0e0826c"},{url:"/_next/static/chunks/pages/_error-08a9db0f433628d8.js",revision:"08a9db0f433628d8"},{url:"/_next/static/chunks/pages/about-31b994e3a32ae8d9.js",revision:"31b994e3a32ae8d9"},{url:"/_next/static/chunks/pages/about/%5Bcreator%5D-50341d18b12a7348.js",revision:"50341d18b12a7348"},{url:"/_next/static/chunks/pages/archive-c195065b621e5266.js",revision:"c195065b621e5266"},{url:"/_next/static/chunks/pages/contact-26abf3479be3a15d.js",revision:"26abf3479be3a15d"},{url:"/_next/static/chunks/pages/datapolicy-d2afc1f83220769b.js",revision:"d2afc1f83220769b"},{url:"/_next/static/chunks/pages/fairuse-ed3c23cc5f21b1f4.js",revision:"ed3c23cc5f21b1f4"},{url:"/_next/static/chunks/pages/index-3c3c085914c27f90.js",revision:"3c3c085914c27f90"},{url:"/_next/static/chunks/polyfills-c67a75d1b6f99dc8.js",revision:"837c0df77fd5009c9e46d446188ecfd0"},{url:"/_next/static/chunks/webpack-2555a4296ab7a1b2.js",revision:"2555a4296ab7a1b2"},{url:"/_next/static/css/2aa7756f2ca57135.css",revision:"2aa7756f2ca57135"},{url:"/favicon.svg",revision:"b426c51be0c9f7f727f0a344ab5f9a77"},{url:"/favicon.webp",revision:"3ed1453a9335053f89f98d80cc19bf0a"},{url:"/fonts/Cairo_SemiBold_Regular.json",revision:"add5e9371a7614f6a641f09fbaebaedf"},{url:"/fonts/Cairo_SemiBold_Regular.typescript.json",revision:"add5e9371a7614f6a641f09fbaebaedf"},{url:"/fonts/Prompt Black_Italic.json",revision:"145c36ad58d32a83df8b56848226f3a4"},{url:"/fonts/cairo-v26-latin-600.eot",revision:"fb9e895a6a1ba2c1fe31aa5b942b07c2"},{url:"/fonts/cairo-v26-latin-600.svg",revision:"2cdd7d8cfd54096ae7500b118a30b03c"},{url:"/fonts/cairo-v26-latin-600.ttf",revision:"8a5342d61cfb038919cbb15e5394420a"},{url:"/fonts/cairo-v26-latin-600.woff",revision:"a55db8e0248b57977259d03de0bd76d7"},{url:"/fonts/cairo-v26-latin-600.woff2",revision:"997d30a321005d65b8c260bd6ebee147"},{url:"/fonts/meera-inimai-v12-latin-regular.eot",revision:"2d8163964a7d716bfbab54a12c20be5d"},{url:"/fonts/meera-inimai-v12-latin-regular.svg",revision:"568fb970ec3ca5cbd8d21ea5fa4285cb"},{url:"/fonts/meera-inimai-v12-latin-regular.ttf",revision:"bff4775491370ae83990127bcaf491e8"},{url:"/fonts/meera-inimai-v12-latin-regular.woff",revision:"759ba93acae81846c0e93e37b46bf1ca"},{url:"/fonts/meera-inimai-v12-latin-regular.woff2",revision:"de1a2ca6c5e4de9aef8db66a24891be8"},{url:"/fonts/prompt-v10-latin-900italic.eot",revision:"f77c18b5ebf736f1dfac5b0a95a85074"},{url:"/fonts/prompt-v10-latin-900italic.svg",revision:"6587473056bff97bf65136db56738684"},{url:"/fonts/prompt-v10-latin-900italic.ttf",revision:"e59f66462156c53d09808dcc90f6ac89"},{url:"/fonts/prompt-v10-latin-900italic.woff",revision:"9d7a2fd617a9e66a450710061aac2ef6"},{url:"/fonts/prompt-v10-latin-900italic.woff2",revision:"4c00edcfa04bb07941c35b87a7dbf150"},{url:"/icons/apple-icon-180.png",revision:"023791da9b7e3ea57b7ab5663f7c8f76"},{url:"/icons/apple-splash-1125-2436.jpg",revision:"2cf6b9f8c89a3b91a984fc6a7b97aefb"},{url:"/icons/apple-splash-1136-640.jpg",revision:"e48debcf23cb74d3fd21e2e760382160"},{url:"/icons/apple-splash-1170-2532.jpg",revision:"68031c21f18f2ad0c3a081f0565380fc"},{url:"/icons/apple-splash-1179-2556.jpg",revision:"c616bf481018db4173552cc9da99af08"},{url:"/icons/apple-splash-1242-2208.jpg",revision:"cf80401650c16fb1d7eade25efb2ee55"},{url:"/icons/apple-splash-1242-2688.jpg",revision:"73765bdb10716e98caad404b5fb81107"},{url:"/icons/apple-splash-1284-2778.jpg",revision:"18cb0b331d11e67d5a5b9a3e8c365f1e"},{url:"/icons/apple-splash-1290-2796.jpg",revision:"f70df849c500985ad4d9285160125b32"},{url:"/icons/apple-splash-1334-750.jpg",revision:"0644ea827f2c9bc077f42cdc33645e6d"},{url:"/icons/apple-splash-1536-2048.jpg",revision:"578f671b5b23cff6c94fa628d7d5c458"},{url:"/icons/apple-splash-1620-2160.jpg",revision:"d06a836c81efe3388a633db9be5ad5fa"},{url:"/icons/apple-splash-1668-2224.jpg",revision:"c970a18b8f8287ec87036c9aa15a18b2"},{url:"/icons/apple-splash-1668-2388.jpg",revision:"8be369dd1cbb8554e08d3672795048df"},{url:"/icons/apple-splash-1792-828.jpg",revision:"e6409761f3bacef19a5545ba19b4eeb4"},{url:"/icons/apple-splash-2048-1536.jpg",revision:"ed2caf46b5c87e522bff468fbd687592"},{url:"/icons/apple-splash-2048-2732.jpg",revision:"42906efdcdf862049292e67b7e3b005d"},{url:"/icons/apple-splash-2160-1620.jpg",revision:"6a5d1aeea67cc3f7337c46035bb1dfac"},{url:"/icons/apple-splash-2208-1242.jpg",revision:"7deac09872f4ebeb395f23ffb54d751a"},{url:"/icons/apple-splash-2224-1668.jpg",revision:"36ca05dfe784d354a9cd27364311619a"},{url:"/icons/apple-splash-2388-1668.jpg",revision:"55a01eb8f1ca062596989cac7741d77e"},{url:"/icons/apple-splash-2436-1125.jpg",revision:"4b2744c3fb8c6108ed17ec8dc2a8786f"},{url:"/icons/apple-splash-2532-1170.jpg",revision:"b761b4e00fe6dfe4b9c5651124f05039"},{url:"/icons/apple-splash-2556-1179.jpg",revision:"ffa5526dd5ff1cfb1d02d35941e4652e"},{url:"/icons/apple-splash-2688-1242.jpg",revision:"9be51ce83495278a0a8383e399216023"},{url:"/icons/apple-splash-2732-2048.jpg",revision:"61f0142f90a1156dd4979ffd6093f967"},{url:"/icons/apple-splash-2778-1284.jpg",revision:"c399448d4b8940f16ae6d27e503517d1"},{url:"/icons/apple-splash-2796-1290.jpg",revision:"437d362fabe229db4d13dd4233150e85"},{url:"/icons/apple-splash-640-1136.jpg",revision:"dd4d8d7fc09851611b9760a93f252f9a"},{url:"/icons/apple-splash-750-1334.jpg",revision:"eb598e9af489231b9991ae34d74e020f"},{url:"/icons/apple-splash-828-1792.jpg",revision:"bae0f9465ac6d398b16be708529c22ab"},{url:"/icons/manifest-icon-192.maskable.png",revision:"807d8329b57301bb61d4443a8c9542d5"},{url:"/icons/manifest-icon-512.maskable.png",revision:"714e92b0876cf6ceace4b18c86f0b263"},{url:"/images/Aaron.webp",revision:"cd099d041df9dcac4f53d9bc608e4856"},{url:"/images/Fitch.webp",revision:"5769fb2dd0cbacea3cb563b885b7ecaf"},{url:"/images/Jack.webp",revision:"8cf1bf91143f45a9838903b18a1150ce"},{url:"/images/Paul_Ben.webp",revision:"d05466a4186c38d021a7549bcec05e5c"},{url:"/images/Paul_CoMPodcast.webp",revision:"12a21221642791959923a7bdb604225f"},{url:"/images/Rollo.webp",revision:"f25234cf8769fcb8c02603ba44541ca5"},{url:"/images/Stirling.webp",revision:"44562322cfec32c24055755acc7a49d5"},{url:"/images/Stone.webp",revision:"53ab6e0c5a1d44d05749ebbbe459f348"},{url:"/images/Thor.webp",revision:"04013451f942626f563e6571a593b19f"},{url:"/images/Troy.webp",revision:"5a4b070ba632cfd43dc00a8524853a91"},{url:"/images/maxresdefault.webp",revision:"2ef777138a1ae49611792ec50d5b7f8a"},{url:"/images/resdefault.webp",revision:"a4b75809bcc0e17d6eb94470b6c42fa3"},{url:"/images/rule.webp",revision:"26b25823781a4c21b03857db8137b3fd"},{url:"/images/zero.webp",revision:"defa4d05e27c1bd9fb1c01d162b7649b"},{url:"/manifest.json",revision:"177867741c89e3c0906d7fe0b94c01c3"},{url:"/models/RP.glb",revision:"599b709253e7987559ba476d8ea0555a"},{url:"/models/RPill.glb",revision:"2c428eac8f9433497464da5a98cf1a91"},{url:"/textures/Metal046B_1K_Color.jpg",revision:"d06e8235d746da40a18b855de179445a"},{url:"/textures/Metal046B_1K_Displacement.jpg",revision:"e9e6e89519ac6fe25ffc9b03124b3a86"},{url:"/textures/Metal046B_1K_Metalness.jpg",revision:"08808167b78f6b8e2b2fe8d95f02e902"},{url:"/textures/Metal046B_1K_NormalDX.jpg",revision:"79424e8293fa19de766e7ce1be37fe39"},{url:"/textures/Metal046B_1K_NormalGL.jpg",revision:"aa0cbe7eb04de351b516175b053480be"},{url:"/textures/Metal046B_1K_Roughness.jpg",revision:"5a35432090899df31a9452b56895d623"},{url:"/textures/SurfaceImperfections003_1K_Normal.jpg",revision:"058ad50894d58d6c4e3a3d3268d7765e"},{url:"/textures/SurfaceImperfections003_1K_var1.jpg",revision:"451019d09f872de69210a13e1698ed0d"},{url:"/videos/RuleZero.mp4",revision:"21b10b0fc00625091f5b14fb435ca370"},{url:"/videos/RuleZero.webm",revision:"1a99a221da5b0adca650b1469fe904af"},{url:"/videos/RuleZero2.mp4",revision:"b25c7c1afdf4c67033c6c4c2814d0865"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:a,event:s,state:i})=>a&&"opaqueredirect"===a.type?new Response(a.body,{status:200,statusText:"OK",headers:a.headers}):a}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const a=e.pathname;return!a.startsWith("/api/auth/")&&!!a.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
