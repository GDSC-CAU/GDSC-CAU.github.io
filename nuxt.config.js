export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  googleAnalytics: {
    id: 'G-78SE6PS7BD'
  },

  head: {
    title: 'GDSC CAU',
    htmlAttrs: {
      lang: 'ko'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '중앙대학교 Google DSC 블로그입니다.' },
      { name: 'format-detection', content: 'telephone=no' },

      {
        hid: 't-type',
        name: 'twitter:card',
        content: 'summary_large_image'
      },

      { hid: 'og:site_name', property: 'og:site_name', content: 'GDSC CAU' },
      { hid: 'og:type', property: 'og:type', content: 'Blog' },
      {
        hid: 'og:url',
        property: 'og:url',
        content: 'https://gdsc-cau.github.io/'
      },
      {
        hid: 'og:title',
        property: 'og:title',
        content: 'GDSC CAU'
      },
      {
        hid: 'og:description',
        property: 'og:description',
        content:
          '중앙대학교 Google DSC 블로그입니다.'
      },
      {
        hid: 'og:image',
        property: 'og:image',
        content: 'https://raw.githubusercontent.com/GDSC-CAU/GDSC-CAU.github.io/main/static/opengraph_image.png'
      },
      {
        hid: 'og:image:secure_url',
        property: 'og:image:secure_url',
        content: 'https://raw.githubusercontent.com/GDSC-CAU/GDSC-CAU.github.io/main/static/opengraph_image.png'
      },
      {
        hid: 'og:image:alt',
        property: 'og:image:alt',
        content: 'GDSC Logo Image'
      }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.png' },
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
    '@nuxtjs/google-analytics'
  ],

  googleAnalytics: {
    id: process.env.GOOGLE_ANALYTICS_ID,
  },
  publicRuntimeConfig: {
    googleAnalytics: {
      id: process.env.GOOGLE_ANALYTICS_ID
    }
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [

    //https://github.com/dword-design/nuxt-content-git
    'nuxt-content-git',

    // https://go.nuxtjs.dev/content
    '@nuxt/content',
    '@nuxtjs/google-analytics'

  ],

  // Content module configuration: https://go.nuxtjs.dev/config-content
  content: {},

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}

