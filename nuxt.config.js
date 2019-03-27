import dotenv from 'dotenv'
import axios from 'axios'

dotenv.config()

export default {
  /*
   ** Headers of the page
   */
  transition: 'page',
  env: {
    API_URL: process.env.API_URL || 'http://localhost:1337'
  },
  head: {
    title: 'Hello from ',
    meta: [],
    link: []
  },
  /*
   ** Customize the progress bar color
   */
  loading: {
    color: '#FFCE4B'
  },
  /*
   ** Build configuration
   */
  build: {
    parallel: false,
    babel: {
      presets({
        isServer
      }) {
        const targets = isServer ? {
          node: '10'
        } : {
            ie: '11'
          }
        return [
          [require.resolve('@nuxt/babel-preset-app'), {
            targets
          }]
        ]
      }
    },
    /*
     ** Run ESLint on save
     */
    extend(config, {
      isDev,
      isClient
    }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    },
    postcss: {
      plugins: {
        'autoprefixer': {},
        'css-mqpacker': {},
        'postcss-short': {},
        'postcss-pxtorem': {
          propList: ['*']
        }
      }
    }
  },
  router: {
    scrollBehavior(to, from, savedPosition) {
      // if the returned position is falsy or an empty object,
      // will retain current scroll position.
      let position = false
      let top = {
        selector: '#top'
      }
      // if no children detected
      if (to.matched.length < 2) {
        // scroll to the top of the page
        position = top
      } else if (to.matched.some((r) => r.components.default.options.scrollToTop)) {
        // if one of the children has scrollToTop option set to true
        position = top
      }
      // savedPosition is only available for popstate navigations (back button)
      if (savedPosition) {
        position = savedPosition
      }
      return new Promise(resolve => {
        // wait for the out transition to complete (if necessary)
        window.$nuxt.$once('triggerScroll', () => {
          // coords will be used if no selector is provided,
          // or if the selector didn't match any element.
          if (to.hash && document.querySelector(to.hash)) {
            // scroll to anchor by returning the selector
            position = {
              selector: to.hash
            }
          }
          resolve(position)
        })
      })
    }
  },
  sitemap: {
    async routes(cb) {
      try {

        const apiUrl = process.env.API_URL || 'http://localhost:1337'
        const {
          data
        } = await axios.post(`${apiUrl}/graphql`, {
          query: `
            query {
              facilities(where: { published: true }) {
                id
              }
              rooms( sort:"price:asc", where:{ published: true } ) {
                url
              }
              packages(where: { published: true }) {
                slug
              }
            }
          `
        })

        let routes = [
          ...data.data.facilities.map(i => `/facilities/${i.id}`),
          ...data.data.rooms.map(i => `/accommodations/${i.url}`),
          ...data.data.packages.map(i => `/packages/${i.slug}`)
        ]

        cb(null, routes)

      } catch (e) {

      }

    }
  },
  manifest: {
    name: process.env.SEO_NAME || 'Cristina Villas Mountain Resort',
    short_name: process.env.SEO_SHORT_NAME || 'cristinavillas',
    background_color: process.env.SEO_BG || '#2f2d2d',
    theme_color: process.env.SEO_TC || '#2f2d2d',
    description: 'FBM Resort in Antipolo'
  },
  meta: {
    ogUrl: process.env.SEO_URL || 'https://cristinavillasresort.com',
    twitterCard: 'summary',
    twitterSite: '@FbmResorts',
    twitterCreator: '@paulopmx'
  },
  icon: {
    iconSrc: process.env.SEO_LOGO || 'assets/img/cv-big-logo.png'
  },
  modules: [
    ['@nuxtjs/google-analytics', {
      id: 'none'
    }],
    ['@nuxtjs/pwa'],
    '@nuxtjs/sitemap'
  ],
  plugins: [{
    src: '~/plugins/photoswipe.js',
    ssr: false
  }, {
    src: '~/plugins/swaychat.js',
    ssr: false
  }, {
    src: '~/plugins/vcalendar.js',
    ssr: false
  }, {
    src: '~/plugins/ga.js'
  }, {
    src: '~/plugins/swiper.js',
    ssr: false
  }],
  css: [
    // SCSS file in the project
    'assets/css/style.scss',
    'swiper/dist/css/swiper.css'
  ]
}
