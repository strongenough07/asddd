// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  devServer: {
    host: '0.0.0.0',
    port: '80'
  },

  modules: ['@nuxtjs/tailwindcss', '@nuxt/image', 'nuxt-security'],
 
  security: {
    headers: {
      contentSecurityPolicy: {
        'base-uri': ["'none'"],
        'font-src': ["'self'", 'https:', 'data:'],
        'form-action': ["'self'"],
        'frame-ancestors': ["'self'"],
        'img-src': ["'self'", 'data:'],
        'object-src': ["'none'"],
        'script-src-attr': ["'none'"],
        'style-src': ["'self'", 'https:', "'unsafe-inline'"],
        'script-src': ["'self'", 'https:', "'unsafe-inline'", "'strict-dynamic'", "'nonce-{{nonce}}'"],
        'upgrade-insecure-requests': true
      }
    },
    requestSizeLimiter: {
      maxRequestSizeInBytes: 2000000,
      maxUploadFileRequestInBytes: 8000000
    },
    rateLimiter: {
      // X-Rate-Limit-Limit (number): the maximum number of requests allowed in a period of time (defined by the windowMs option)
      // X-Rate-Limit-Remaining (number): the number of requests left in the current period
      // X-Rate-Limit-Reset (number): the time in seconds when the rate limit will be reset
      // Retry-After (number): the time in seconds to wait before making requests again (only sent when a request is rejected)
      tokensPerInterval: 50,
      interval: 5000,
      headers: true,
      throwError: true
    },
    xssValidator: {
      methods: ['GET', 'POST', 'PUT', 'DELETE']
    },
    corsHandler: {
      origin: '*',
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
      preflight: {
        statusCode: 204
      }
    },
    allowedMethodsRestricter: {
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
      throwError: false
    },
    hidePoweredBy: true,
    basicAuth: false,
    enabled: true,
    csrf: false,
    nonce: true,
    removeLoggers: {
      external: [],
      consoleType: ['log', 'info', 'warn', 'error', 'debug'],
      // level: 'debug' Remove the invalid 'level' option.
    },
    ssg: {
      hashScripts: true,
      hashStyles: false
    },
    sri: true
  },
  

  css: [
    '~/assets/scss/main.scss',
    '~/assets/css/tailwind.css',
    '~/assets/css/theme.css'
  ],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {}
    }
  },

  compatibilityDate: '2025-02-18'
})