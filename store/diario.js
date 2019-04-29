import Vuex from 'vuex'

const createStore = () => {
  return new Vuex.Store({
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
}

export default { createStore }
