// The legacy SCSS uses postcss-short syntax (`position: fixed 0 0 auto`, `size: 100% 100vh`,
// `font-size: 24px/36px`). Keep this pipeline identical to the Nuxt build or those rules are dropped.
module.exports = {
  plugins: [
    require('autoprefixer'),
    require('css-mqpacker'),
    require('postcss-short'),
    require('postcss-pxtorem')({ propList: ['*'] }),
  ],
}
