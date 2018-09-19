
export const state = () => ({
  clicked: null,
  datacollection: null
})

export const getters = {
  getClick(state) {
    return state.clicked
  },
  getChart(state) {
    return state.datacollection
  }
}

export const mutations = {
  toggleClicked(state, newValue) {
    state.clicked = typeof newValue !== 'undefined' ? newValue : !state.clicked
  },
  fillChart(state, newValue) {
    state.datacollection = newValue
  }
}
