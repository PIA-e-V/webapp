export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Environment config
  env: {
    apiBaseUrl: process.env.API_BASE_URL || ''
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      name: 'FollowTheVote',
      short_name: 'FollowTheVote',
      lang: 'de'
    },
    meta: {
      author: 'Political Innovation Association (PIA) e.V.',
      mobileAppIOS: true
    },
    workbox: {
      offlinePage: '/offline'
    }
  },

  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  server: {
    host: '0.0.0.0',
    port: 3000
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'FollowTheVote',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [{ rel: 'icon', type: 'image/png', href: '/favicon.png' }]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['material-design-icons', '~/assets/main'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/registration.ts', mode: 'client' },
    { src: '~/plugins/pwa-update.ts', mode: 'client' },
    { src: '~/plugins/screen-orientation-lock.ts', mode: 'client' }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
    '@nuxtjs/composition-api/module'
    // ['nuxt-twa-module', {
    //   /* module options */
    //   defaultUrl: 'https://app.followthevote.com',
    //   hostName: 'followthevote.com.com',
    //   sha256Fingerprints: ['CE:10:4B:B0:DC:2D:56:CF:24:99:4E:16:C5:14:DD:79:D1:2E:CD:5B:87:7D:CF:4A:65:B3:15:7F:88:56:01:CF'],
    //   applicationId: 'com.followthevote.twa',
    //   launcherName: 'FollowTheVote',
    //   versionCode: 1,
    //   versionName: '0.1',
    //   statusBarColor: '#343E94',
    //
    //   /* optional */
    //   /* overwrite default location for icon */
    //   iconPath: '/static/icon.png',
    //   /* Overwrite folder where to put .wellknown */
    //   distFolder: '.nuxt/dist/client'
    // }]
  ],

  tailwind: {
    jit: true
  },

  tailwindcss: {
    config: {}
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa'
  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    babel: {
      presets: ['@nuxt/babel-preset-app', 'vca-jsx']
    }
  },

  generate: {
    // choose to suit your project
    interval: 2000
  }
}
