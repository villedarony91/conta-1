export const state = () => ({
  diario: []
})

export const mutations = {
  setDiario(state, dailyOperations) {
    // eslint-disable-next-line
    console.log(state.diario)
    // eslint-disable-next-line
    console.log(dailyOperations)
    state.diario.push(dailyOperations)
  },
  remove(state, { todo }) {
    state.list.splice(state.list.indexOf(todo), 1)
  },
  toggle(state, todo) {
    todo.done = !todo.done
  }
}

export const getters = {
  loadedDiario(state) {
    return state.diario
  }
}
