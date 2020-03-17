
const state = {
  pageTitle: '',
  direction: 'forward',
  toastConfig: {
    show: false,
    icon: '',
    text: ''
  }
}

const mutations = {
  SET_PAGE_TITLE(state, title) {
    state.pageTitle = title
  },
  UPDATE_DIRECTION(store, direction) {
    store.direction = direction
  },
  SHOW_TOAST(store, { show = true, icon = '', text = '' }) {
    store.toastConfig = { show, icon, text }
    setTimeout(() => {
      store.toastConfig = { show: false, icon, text }
    }, 1500)
  }
}

const actions = {
  setPageTitleAction({ commit }, title) {
    commit('SET_PAGE_TITLE', title)
  },
  updateDirectionAction({ commit }, title) {
    commit('SET_PAGE_TITLE', title)
  },
  showToast({ commit }, { show = true, icon = '', text = '' }) {
    commit('SHOW_TOAST', { show, icon, text })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
