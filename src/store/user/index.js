const state = {
  username: ''

}
const actions = {

}
const mutations = {
  USER_NAME(state, data) {
    state.username = data.username
  }

}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
