
const state = {
  pageTitle: '',
  direction: 'forward'
}

const mutations = {
  SET_PAGE_TITLE(state, title) {
    state.pageTitle = title
  },

  UPDATE_DIRECTION(store, direction) {
    store.direction = direction
  }
}

const actions = {
  setPageTitleAction({ commit }, title) {
    commit('SET_PAGE_TITLE', title)
  },
  updateDirectionAction({ commit }, title) {
    commit('SET_PAGE_TITLE', title)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
