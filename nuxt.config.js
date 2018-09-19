require('dotenv').config()
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
  mode: 'spa',
  /*
   ** Customize the progress bar color
   */
  loading: {
    color: '#3B8070'
  },
  /*
   ** Build configuration
   */
  serverMiddleware: [
    '~/api/index.js',
    '~/api/chart.js'
  ],
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
    postcss: [
      require('autoprefixer')(),
      require('css-mqpacker')(),
      require('postcss-short')(),
      require('postcss-pxtorem')({
        propList: ['*']
      }),
    ],
    watch: [
      '/api/*.js'
    ]
  },
  css: [
    // SCSS file in the project
    'assets/css/style.scss'
  ],
  plugins: [{
    src: '~/plugins/localStorage.js',
    ssr: false
  }],
  modules: [
    '@nuxtjs/dotenv'
  ]
}
