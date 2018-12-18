import Strapi from 'strapi-sdk-javascript/build/main'
const apiUrl = process.env.API_URL || 'http://localhost:1337'
const strapi = new Strapi(apiUrl)

export const state = () => ({
  navLinks: [],
  siteSettings: {},
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
  }
}

export const getters = {
  getSettingByName: (state) => (id) => {
    let s = state.siteSettings.filter(item => { return item.name == id })
    return s.length ? s[0].text : ''
  }
}

export const actions = {
  async getNavLinks({ commit }) {
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
          }`
        }
      })
      return commit('setNavLinks', data.navlinks)
    } catch (e) { }
  },
  async getSiteSettings({ commit }) {
    try {
      let { data } = await strapi.request('post', '/graphql', {
        data: {
          query: `query {
            settings(where: { published: true }) {
              name
              text
             }
          }`
        }
      })
      return commit('setSiteSettings', data.settings)
    } catch (e) { }
  },
  async nuxtServerInit({ dispatch }) {
    await dispatch('getNavLinks')
    await dispatch('getSiteSettings')
  }
}
