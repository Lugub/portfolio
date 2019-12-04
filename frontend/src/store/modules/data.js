import api from '../../api'

// initial state
const state = {
  // shape: [{ id, title, genres, viewCnt, rating }]
  movieSearchList: [],
  currentTime:'',
  currentVisitorName:'',
}

// actions
const actions = {
  async searchMovies({ commit }, params) {
    const resp = await api.searchMovies(params)
    const movies = resp.data.map(d => ({
      id: d.id,
      title: d.title,
      genres: d.genres_array,
      viewCnt: d.view_cnt,
      rating: d.average_rating,
    }))

    commit('setMovieSearchList', movies)
  },

  async setCurrentTime({commit}, time){
    commit('setCurrentTime', time)
  },

  async setCurrentUserName({commit}, name){
    commit('setCurrentUserName', name)
  }
}

// mutations
const mutations = {
  setMovieSearchList(state, movies) {
    state.movieSearchList = movies.map(m => m)
  },

  setCurrentTime(state, time){
    state.currentTime = time
  },

  setCurrentUserName(state, name){
    state.currentVisitorName = name
  },


}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
