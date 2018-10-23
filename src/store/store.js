import Vue from 'vue'
import Vuex from 'vuex'
import fb from '../firebaseConfig'
import friends from './friends.js'
import chatting from './chatting.js'
import users from './users.js'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    friends,
    chatting,
    users
  },
  state: {
    currentUser: null,
    currentUserProfileFromDB: {}
  },
  mutations: {
    setCurrentUser (state, val) {
      // console.log(val)
      state.currentUser = val
    },
    setCurrentUserProfileFromDB (state, val) {
      state.currentUserProfileFromDB = val
    }
  },
  actions: {
    // set the login user profile
    fetchCurrentUser ({ commit, state }) {
      commit('setCurrentUser', fb.currentUser.uid)
    },
    fetchCurrentUserProfileFromDB ({ commit, state }) {
      fb.usersCollection
        .doc(state.currentUser.uid)
        .get()
        .then(res => {
          commit('setCurrentUserProfileFromDB', res.data())
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  getters: {
    // chatsList: state => state.chatsList.reverse()
  }
})
