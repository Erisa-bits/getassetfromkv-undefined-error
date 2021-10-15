If this was working properly, it would return a 404 or map the request to `kv`.

# Steps

## Miniflare
- `npm i` (probably not necessary)
- `miniflare -k kv`
- Visit mock Worker and observe error instead of 404 page or content

## Cloudflare Workers
- `npm i` (probably not necessary)
- Make KV namespace, change `wranger.toml`
- `wrangler publish`
- Visit Worker and observe error instead of 404 page or content

# Error result (Cloudflare Worker)
`/test.txt`:
```js
TypeError: Cannot read properties of undefined (reading 'test.txt')
    at worker.js:1:2873
    at Generator.next (<anonymous>)
    at worker.js:1:1250
    at new Promise (<anonymous>)
    at e (worker.js:1:995)
    at i.getAssetFromKV (worker.js:1:2563)
    at worker.js:1:12278
    at worker.js:1:12537
```

`/`:
```js
TypeError: Cannot read properties of undefined (reading '')
    at worker.js:1:2873
    at Generator.next (<anonymous>)
    at worker.js:1:1250
    at new Promise (<anonymous>)
    at e (worker.js:1:995)
    at i.getAssetFromKV (worker.js:1:2563)
    at worker.js:1:12278
    at worker.js:1:12537
```

# Error Result (Miniflare)
`/test.txt`:
```js
TypeError: Cannot read property 'test.txt' of undefined
    at /workspaces/getassetfromkv-undefined-error/worker/script.js:1:2873
    at Generator.next (<anonymous>)
    at /workspaces/getassetfromkv-undefined-error/worker/script.js:1:1250
    at new Promise (<anonymous>)
    at e (/workspaces/getassetfromkv-undefined-error/worker/script.js:1:995)
    at i.getAssetFromKV (/workspaces/getassetfromkv-undefined-error/worker/script.js:1:2563)
    at /workspaces/getassetfromkv-undefined-error/worker/script.js:1:11894
    at /workspaces/getassetfromkv-undefined-error/worker/script.js:1:12222
    at ServiceWorkerGlobalScope.wrappedListener (/home/codespace/.npm-global/lib/node_modules/miniflare/src/modules/events.ts:135:11)
    at invokeCallback (/home/codespace/.npm-global/lib/node_modules/miniflare/node_modules/src/lib/listener.ts:135:22)
```

`/`:
```js
TypeError: Cannot read property '' of undefined
    at /workspaces/getassetfromkv-undefined-error/worker/script.js:1:2873
    at Generator.next (<anonymous>)
    at /workspaces/getassetfromkv-undefined-error/worker/script.js:1:1250
    at new Promise (<anonymous>)
    at e (/workspaces/getassetfromkv-undefined-error/worker/script.js:1:995)
    at i.getAssetFromKV (/workspaces/getassetfromkv-undefined-error/worker/script.js:1:2563)
    at /workspaces/getassetfromkv-undefined-error/worker/script.js:1:11894
    at /workspaces/getassetfromkv-undefined-error/worker/script.js:1:12222
    at ServiceWorkerGlobalScope.wrappedListener (/home/codespace/.npm-global/lib/node_modules/miniflare/src/modules/events.ts:135:11)
    at invokeCallback (/home/codespace/.npm-global/lib/node_modules/miniflare/node_modules/src/lib/listener.ts:135:22)
```