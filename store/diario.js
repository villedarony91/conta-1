import Vuex from 'vuex'

export const mutations = {
  setDiario(state, dailyOperations) {
    state.diario = dailyOperations
  },
  remove(state, { todo }) {
    state.list.splice(state.list.indexOf(todo), 1)
  },
  toggle(state, todo) {
    todo.done = !todo.done
  }
}
/*eslint-disable */
new Vuex.Store({
  state: {
    diario: []
  },
  mutations: {
    setDiario(state, dailyOperations) {
      state.diario = dailyOperations
    }
  },
  actions: {
    setDiario(vuexContext, dailyOperations) {
      vuexContext.commit('setDiario', dailyOperations)
    }
  },
  getters: {
    loadedDiario(state) {
      return state.diario
    }
  }
})
