import fb from '../firebaseConfig'

export default {
  state: {
    chattingAvatar: '',
    chattingUser: {
      id: ''
    },
    chatsList: [],
    chatId: '',
    fetchingMessages: false
  },
  mutations: {
    setChatId (state, val) {
      // console.log(val)
      state.chatId = val
    },
    setChattingAvatar (state, val) {
      // console.log(val)
      state.chattingAvatar = val
    },
    setChattingUser (state, val) {
      // console.log(val)
      state.chattingUser = val
    },
    setChatsList (state, val) {
      state.chatsList = []
      state.chatsList.push(...val)
      // console.log(state.chatsList)
    },
    addChatsList (state, val) {
      state.chatsList.push({ message: val })
      // console.log(state.chatsList)
    },
    resetChatsList (state, val) {
      state.chatsList = {
        id: ''
      }
      // console.log(state.chatsList)
    }
  },
  actions: {
    fetchChattingUser ({ commit, state }, id) {
      fb.usersCollection
        .doc(id)
        .get()
        .then(res => {
          commit('setChattingUser', res.data())
        })
        .catch(err => {
          console.log(err)
        })
    },
    fetchMessagesList ({ commit, state }, id) {
      fb.chatsCollection.doc(id).onSnapshot(function (doc) {
        commit('setChatsList', doc.data().message)
        state.fetchingMessages = false
      })
    },
    async fetchMessagesListInit ({ commit, state, dispatch }, id) {
      state.fetchingMessages = true
      fb.chatsCollection
        .doc(id)
        .get()
        .then(res => {
          if (typeof res.data() === 'undefined') {
            // console.log('no message found')
            fb.chatsCollection
              .doc(id)
              .set({ message: [] })
              .then(() => {
                // console.log('message array successfully written!')
                dispatch('fetchMessagesList', id)
              })
              .catch(err => {
                console.log(err)
              })
          } else {
            dispatch('fetchMessagesList', id)
          }
        })
        .catch(err => {
          console.log(err)
        })
      // if (typeof fb.chatsCollection.doc(id).message === 'undefined') {
      //   fb.chatsCollection.doc(id).set({ message: [] })
      //   console.log('message array undefined found')
      // }

      // await fb.chatsCollection.doc(id).onSnapshot(function (doc) {
      //   // console.log('Current data: ', doc.data())
      //   // console.log(doc.data().message)
      //   if (doc.data().message) {
      //     commit('setChatsList', doc.data().message)
      //   } else {
      //     fb.chatsCollection.doc(id).set((message = []))
      //   }
      // })

      // .get()
      // .then(res => {
      //   console.log(res.data().message)
      //   commit('setChatsList', res.data().message)
      // })
      // .catch(err => {
      //   console.log(err)
      // })
    },
    async addChatsList ({ commit, state }, val) {
      // console.log('step 1')
      commit('addChatsList', val.input)
      // console.log(state.chatsList)
      await fb.chatsCollection
        .doc(val.chatId)
        .set({ message: state.chatsList })
        // .set({
        //   message: state.chatsList,
        //   timePost: new Date(),
        //   sender: state.currentUser
        // })
        .then(res => {
          // console.log(res.data())
          // console.log('Document written with ID: ', docRef.id)
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  getters: {
    chattingAvatar: state => state.chattingAvatar,
    chattingUser: state => state.chattingUser,
    chatsList: state => state.chatsList
  }
}
