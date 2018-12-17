export const state = () => ({
  menuOpen: false
})

export const mutations = {
  toggleMenu(state, newValue) {
    state.menuOpen = typeof newValue !== 'undefined' ? newValue : !state.menuOpen
  }
}
