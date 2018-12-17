module.exports = {
  /*
   ** Headers of the page
   */
  head: {
    title: 'cristinavillas',
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
      content: 'Nuxt.js project'
    }
    ],
    link: [{
      rel: 'icon',
      type: 'image/x-icon',
      href: '/favicon.ico'
    }]
  },
  /*
   ** Customize the progress bar color
   */
  loading: {
    color: '#3B8070'
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
  css: [
    // SCSS file in the project
    'assets/css/style.scss'
  ]
}
