import fb from '../firebaseConfig'

export default {
  state: {
    friends: []
  },
  mutations: {
    setFriendsList (state, val) {
      state.friends = []
      state.friends.push(...val)
      // console.log(state.friends)
    },
    addFriendsList (state, val) {
      state.friends.push(val)
      // console.log(state.friends)
    }
  },
  actions: {
    async fetchFriendsList ({ commit, state }, id) {
      await fb.usersCollection.doc(id).onSnapshot(doc => {
        if (doc.data().friends) {
          const newFriendList = doc.data().friends.map(friend => {
            fb.usersCollection
              .doc(friend)
              .get()
              .then(res => {
                // console.log(res.data())
                commit('addFriendsList', res.data())
              })
          })
        }
      })
      // .catch(err => {
      //   console.log(err)
      // })

      // .onSnapshot(function (doc) {
      //   // console.log(doc.data())
      //   // commit('setFriendsList', doc.data().friends)
      // })
    }
    // async addFriendsList ({ commit, state }, val) {
    //   // console.log(val)
    //   commit('addfriends', val)
    //   // console.log(state.friends)
    //   await fb.chatsCollection
    //     .doc('qe3JmEyP6yNJPKjhXs7UzZwv1b62Z21OCoCK2zf3D6dwAQYXDTKpC6M2')
    //     .set({ message: state.friends })
    //     .then(res => {
    //       // console.log(res.data())
    //       console.log('Document written with ID: ', docRef.id)
    //     })
    //     .catch(err => {
    //       console.log(err)
    //     })
    // }
  },
  getters: {
    friendsList: state => state.friends
  }
}
