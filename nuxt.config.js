import dotenv from 'dotenv'
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
    meta: [{
      charset: 'utf-8'
    },
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1'
    },
    {
      hid: 'description',
      name: 'description',
      content: 'The best resort and hotel in Antipolo, Philippines'
    },
    {
      name: 'msapplication-TileColor',
      content: '#2f2d2d'
    },
    {
      name: 'theme-color',
      content: '#2f2d2d'
    }
    ],
    link: [{
      rel: 'icon',
      type: 'image/x-icon',
      href: '/favicon.ico'
    },
    {
      rel: 'apple-touch-icon',
      type: 'image/png',
      sizes: '180x180',
      href: '/apple-touch-icon.png'
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '32x32',
      href: '/favicon-32x32.png'
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '16x16',
      href: '/favicon-16x16.png'
    },
    {
      rel: 'manifest',
      href: '/site.webmanifest'
    },
    {
      rel: 'mask-icon',
      href: '/safari-pinned-tab.svg',
      color: '#2f2d2d'
    }
    ]
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
  modules: [
    ['@nuxtjs/google-analytics', { id: 'none' }]
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
  }
  ],
  css: [
    // SCSS file in the project
    'assets/css/style.scss',
    'swiper/dist/css/swiper.css'
  ]
}
