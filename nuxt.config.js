const axios = require('axios')
const storyblokToken = '1IsgW07t4t5sm0UzdHAD6gtt'
const googleId = 'UA-202640934-1'

module.exports = {
  i18n: {
    locales: [
      {
        code: 'de',
        iso: 'de-DE',
        name: 'DE',
        file: 'de.json',
        path: ''
      },
      {
        code: 'en',
        iso: 'en-US',
        name: 'EN',
        file: 'en.json',
        path: 'en'
      }
    ],
    defaultLocale: 'de',
    lazy: true,
    langDir: '~/locales/',
    vueI18n: {
      fallbackLocale: 'en'
    }
  },
  robots: [
    {
      UserAgent: '*',
      Disallow: '/lukas-thauerboeck'
    }
  ],
  /*
   ** Headers of the page
   */
  head: {
    title: 'GRAND GARAGE',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Ein Makerspace in der Tabakfabrik Linz. Von der Schweißwerkstatt über CNC-Fräsen bis hin zu 3D-Druckern ist alles in unserer Werkstatt vorhanden.' }
    ],
    script: [
      { hid: 'stripe', src: 'https://js.stripe.com/v3/', defer: true }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.png' },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css?family=Roboto+Mono'
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css?family=Chakra+Petch'
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css?family=IBM+Plex+Sans+Condensed'
      }
    ]
  },
  proxy: {
    '/.netlify': {
      target: 'http://localhost:9000',
      pathRewrite: { '^/.netlify/functions': '' }
    }
  },
  buildModules: [
    ['storyblok-nuxt', { accessToken: storyblokToken, cacheProvider: 'memory' }],
    '@nuxtjs/proxy',
    ['@nuxtjs/fontawesome'],
    ['@nuxtjs/google-analytics']
  ],
  fontawesome: {
    icons: {
      solid: [
        'faUser',
        'faCube',
        'faCoins',
        'faGift',
        'faHammer',
        'faDownload',
        'faFileInvoice',
        'faFilePdf',
        'faLink',
        'faGraduationCap',
        'faUserFriends',
        'faCheckCircle',
        'faTimesCircle',
        'faRunning',
        'faAngleLeft',
        'faTimes',
        'faKey',
        'faCircleNotch',
        'faSignOutAlt',
        'faInfoCircle',
        'faArrowCircleRight',
        'faSave',
        'faPlus'
      ]
    }
  },
  modules: [
    '@nuxtjs/sentry',
    '@nuxtjs/toast',
    '@nuxtjs/eslint-module',
    '@nuxtjs/robots',
    'nuxt-i18n'
  ],
  sentry: {
    config: {} // Additional config
  },
  toast: {
    position: 'top-center',
    duration: 5000,
    theme: 'toasted-primary'
  },
  plugins: [
    '~/plugins/init',
    '~/plugins/components',
    '~/plugins/helper',
    '~/plugins/map',
    '~/plugins/libs',
    '~/plugins/routersync',
    { src: '~/plugins/components-nossr', ssr: false }
  ],
  router: {
    middleware: 'router'
  },
  generate: {
    routes: function (callback) {
      const token = storyblokToken
      const perPage = 100
      const version = process.env.NODE_ENV === 'development' ? 'draft' : 'published'
      const time = new Date().getTime()

      const page = 1
      const routes = []

      // Call first Page of the Links API: https://www.storyblok.com/docs/Delivery-Api/Links
      axios.get(`https://api.storyblok.com/v1/cdn/links?token=${token}&version=${version}&per_page=${perPage}&page=${page}&ts=${time}`).then((res) => {
        Object.keys(res.data.links).forEach((key) => {
          if (res.data.links[key].slug !== 'home') {
            routes.push('/' + res.data.links[key].slug)
          }
        })

        // Check if there are more pages available otherwise execute callback with current routes.
        const total = res.headers.total
        const maxPage = Math.ceil(total / perPage)
        if (maxPage <= 1) {
          callback(null, routes)
        }

        // Since we know the total we now can pregenerate all requests we need to get all Links
        const contentRequests = []
        for (let page = 2; page <= maxPage; page++) {
          contentRequests.push(axios.get(`https://api.storyblok.com/v1/cdn/links?token=${token}&version=${version}&per_page=${perPage}&page=${page}`))
        }

        // Axios allows us to exectue all requests using axios.spread we will than generate our routes and execute the callback
        axios.all(contentRequests).then(axios.spread((...requests) => {
          requests.forEach((request) => {
            Object.keys(request.data.links).forEach((key) => {
              if (request.data.links[key].slug !== 'home') {
                routes.push('/' + request.data.links[key].slug)
              }
            })
          })

          callback(null, routes)
        })).catch(callback)
      })
    }
  },
  css: [
    '@/assets/scss/styles.scss',
    'swiper/dist/css/swiper.css'
  ],
  /*
   ** Customize the progress bar color
   */
  loading: { color: '#ff6f00' },
  /*
   ** Build configuration
   */
  build: {
    transpile: [/^vue2-google-maps($|\/)/]
  },
  googleAnalytics: {
    id: googleId,
    disabled: () => {
      // eslint-disable-next-line no-unused-vars
      const hasAcceptedAnalyticsCookie = localStorage.getItem('hasAcceptedAnalyticsCookie')
      console.log('has accepted?: ', hasAcceptedAnalyticsCookie)
      if (hasAcceptedAnalyticsCookie === 'true') {
        return true
      } else {
        return false
      }
    },
    debug: {
      enable: true,
      enabled: true
    }
  }
}
