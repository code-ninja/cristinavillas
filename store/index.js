import Strapi from 'strapi-sdk-javascript/build/main'
const apiUrl = process.env.API_URL || 'http://localhost:1337'
const strapi = new Strapi(apiUrl)

export const state = () => ({
  navLinks: [],
  siteSettings: null,
  packages: [],
  menuOpen: false
})

export const mutations = {
  toggleMenu(state, newValue) {
    state.menuOpen = typeof newValue !== 'undefined' ? newValue : !state.menuOpen
  },
  setNavLinks(state, newValue) {
    state.navLinks = newValue
  },
  setSiteSettings(state, newValue) {
    state.siteSettings = newValue
  },
  setPackages(state, newValue) {
    state.packages = newValue
  }
}

export const getters = {
  getSettingByName: (state) => (id) => {
    if (!state.siteSettings)
      return ''
    let s = state.siteSettings.filter(item => { return item.name == id })
    return s.length ? s[0].text : ''
  }
}

export const actions = {
  async getDefaultState({ commit }) {
    try {
      let { data } = await strapi.request('post', '/graphql', {
        data: {
          query: `query {
            navlinks(sort:"sort:asc",where: { published: true }) {
              id
             	label
             	slug
             	header
             	footer
             }
             settings(where: { published: true }) {
               name
               text
              }
            packages(where: { published: true }) {
              id
              name
              slug
              img {
                  url
                }
             }
          }`
        }
      })
      commit('setNavLinks', data.navlinks)
      commit('setSiteSettings', data.settings)
      commit('setPackages', data.packages)
    } catch (e) { console.log(e) }
  },
  async nuxtServerInit({ dispatch }) {
    await dispatch('getDefaultState')
  }
}
