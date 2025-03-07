export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss', '@nuxt/image'],
  
  css: [
    '~/assets/scss/main.scss',
    '~/assets/css/tailwind.css',
    '~/assets/css/theme.css',
  ],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  compatibilityDate: '2025-02-18',
})
