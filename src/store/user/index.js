const state = {
  username: window.localStorage.getItem('username') || '',
  isAdmin: window.localStorage.getItem('isAdmin') || false

}
const actions = {

}
const mutations = {
  USER_NAME(state, data) {
    state.username = data.username
    state.isAdmin = data.isAdmin
  }

}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
