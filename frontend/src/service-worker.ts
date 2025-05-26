/// <reference lib="webworker" />
/* eslint-disable no-restricted-globals */

import { clientsClaim } from "workbox-core"
import { ExpirationPlugin } from "workbox-expiration"
import { precacheAndRoute, createHandlerBoundToURL } from "workbox-precaching"
import { registerRoute } from "workbox-routing"
import { StaleWhileRevalidate, CacheFirst, NetworkFirst } from "workbox-strategies"
import { CacheableResponsePlugin } from "workbox-cacheable-response"
import { BackgroundSyncPlugin } from "workbox-background-sync"

declare const self: ServiceWorkerGlobalScope

clientsClaim()

// Precache todos os assets gerados pelo webpack
precacheAndRoute(self.__WB_MANIFEST)

// Configuração para Single Page Application
const fileExtensionRegexp = /\/[^/?]+\.[^/]+$/
registerRoute(
  // Retorna false para URLs que terminam com extensão de arquivo
  ({ request, url }: { request: Request; url: URL }) => {
    if (request.mode !== "navigate") {
      return false
    }
    if (url.pathname.startsWith("/_")) {
      return false
    }
    if (url.pathname.match(fileExtensionRegexp)) {
      return false
    }
    return true
  },
  createHandlerBoundToURL(process.env.PUBLIC_URL + "/index.html"),
)

// Cache de imagens com estratégia Cache First
registerRoute(
  ({ request }) => request.destination === "image",
  new CacheFirst({
    cacheName: "images",
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
      new ExpirationPlugin({
        maxEntries: 60,
        maxAgeSeconds: 30 * 24 * 60 * 60, // 30 dias
      }),
    ],
  }),
)

// Cache de fontes com estratégia Cache First
registerRoute(
  ({ request }) => request.destination === "font",
  new CacheFirst({
    cacheName: "fonts",
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
      new ExpirationPlugin({
        maxEntries: 30,
        maxAgeSeconds: 60 * 60 * 24 * 365, // 1 ano
      }),
    ],
  }),
)

// Cache de scripts e estilos com estratégia Stale While Revalidate
registerRoute(
  ({ request }) => request.destination === "script" || request.destination === "style",
  new StaleWhileRevalidate({
    cacheName: "static-resources",
  }),
)

// Cache de API com estratégia Network First
registerRoute(
  ({ url }) => url.origin === process.env.REACT_APP_API_URL,
  new NetworkFirst({
    cacheName: "api-responses",
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
      new ExpirationPlugin({
        maxEntries: 100,
        maxAgeSeconds: 24 * 60 * 60, // 24 horas
      }),
    ],
  }),
)

// Configuração para sincronização em segundo plano
const bgSyncPlugin = new BackgroundSyncPlugin("offlineRequests", {
  maxRetentryTime: 24 * 60 * 60 * 1000, // 24 horas
})

// Intercepta requisições POST e as coloca na fila de sincronização quando offline
registerRoute(
  ({ url }) => url.origin === process.env.REACT_APP_API_URL && url.pathname.includes("/api/"),
  new NetworkFirst({
    plugins: [bgSyncPlugin],
  }),
  "POST",
)

// Limpa caches antigos
self.addEventListener("activate", (event) => {
  const cacheWhitelist = ["images", "fonts", "static-resources", "api-responses"]
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName)
          }
          return null
        }),
      )
    }),
  )
})

// Evento de instalação
self.addEventListener("install", (event) => {
  self.skipWaiting()
})

// Evento de mensagem
self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting()
  }
})
