import fb from '../firebaseConfig'

export default {
  state: {
    users: [],
    userFromId: '',
    usersListFetched: false
  },
  mutations: {
    setUsersList (state, val) {
      //   state.users = []
      state.users.push(val)
      // console.log(state.users)
    },
    setUserFromId (state, val) {
      //   state.users = []
      state.userFromId = val
      // console.log(state.users)
    },
    getUserFromId (state, id) {
      //   state.users = []
      state.users.forEach(user => {
        if (user.id === id) {
          state.userFromId = user
        }
      })
      // console.log(state.users)
    },
    resetUserFromId (state, val) {
      //   state.users = []
      state.userFromId = ''
      // console.log(state.users)
    },
    addUsersList (state, val) {
      state.users.push(val)
      // console.log(state.users)
    }
  },
  actions: {
    fetchUsersList ({ commit, state }) {
      console.log('fetching users list')
      fb.usersCollection
        .get()
        .then(doc => {
          doc.forEach(doc => {
            commit('setUsersList', doc.data())
          })
          state.usersListFetched = true
        })
        .catch(err => {
          console.log(err)
        })
    },
    fetchUserFromId ({ commit, state }, id) {
      console.log('fetching user from ID')
      fb.usersCollection
        .get()
        .then(doc => {
          doc.forEach(doc => {
            if (doc.data().id === id) {
              commit('setUserFromId', doc.data())
            }
          })
        })
        .catch(err => {
          console.log(err)
        })
    },
    addUserIntoFriendsArray ({ commit, state }, val) {
      //   console.log(val)
      return new Promise((resolve, reject) => {
        let temp
        fb.usersCollection
          .doc(val.currentUserId)
          .get()
          .then(doc => {
            temp = doc.data()
            console.log(doc.data().friends)
            let found = false
            doc.data().friends.forEach(item => {
              if (item === val.userToBeAdded) {
                console.log('already added')
                found = true
              }
            })
            if (!found) {
              temp.friends.push(val.userToBeAdded)
              console.log(temp)
              fb.usersCollection.doc(val.currentUserId).set(temp)
            }
            resolve()
          })
          .catch(err => {
            reject()
            console.log(err)
          })
      })
    }
  },
  getters: {
    usersList: state => state.users,
    userFromId: state => state.userFromId
  }
}
