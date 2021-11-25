export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'GDSC CAU',
    htmlAttrs: {
      lang: 'ko'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '중앙대학교 Google DSC 블로그입니다. 활동 관련 소식, 공부 내용 등을 주기적으로 업로드합니다.' },
      { name: 'format-detection', content: 'telephone=no' },
      // Twitter
      // Test on: https://cards-dev.twitter.com/validator
      {
        hid: 'twitter:card',
        name: 'twitter:card',
        content: 'summary_large_image'
      },
      { hid: 'twitter:site', name: 'twitter:site', content: '@googledevs' },
      {
        hid: 'twitter:url',
        name: 'twitter:url',
        content: 'https://gdsc-cau.github.io/'
      },
      {
        hid: 'twitter:title',
        name: 'twitter:title',
        content: 'GDSC CAU'
      },
      {
        hid: 'twitter:description',
        name: 'twitter:description',
        content:
          '중앙대학교 Google DSC 블로그입니다. 활동 관련 소식, 공부 내용 등을 주기적으로 업로드합니다.'
      },
      {
        hid: 'twitter:image',
        name: 'twitter:image',
        content: 'https://gdsc-cau.github.io/opengraph_image.png'
      },

      // Open Graph
      // Test on: https://developers.facebook.com/tools/debug/
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
          '중앙대학교 Google DSC 블로그입니다. 활동 관련 소식, 공부 내용 등을 주기적으로 업로드합니다.'
      },
      {
        hid: 'og:image',
        property: 'og:image',
        content: 'https://gdsc-cau.github.io/opengraph_image.png'
      },
      {
        hid: 'og:image:secure_url',
        property: 'og:image:secure_url',
        content: 'https://gdsc-cau.github.io/opengraph_image.png'
      },
      {
        hid: 'og:image:alt',
        property: 'og:image:alt',
        content: 'Google Student Clubs Logo Image'
      }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        hid: 'canonical',
        rel: 'canonical',
        href: `https://gdsc-cau.github.io`
      }
    ]
  },

  googleAnalytics: {
    id: 'G-78SE6PS7BD'
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'GDSC CAU',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.png' }
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

