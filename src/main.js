import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/store'
import fb from './firebaseConfig'
// import Buefy from 'buefy'
// import 'buefy/dist/buefy.css'
import 'bulma/css/bulma.css'
// import firebase from 'firebase'

// Vue.use(Buefy)

Vue.config.productionTip = false
let app
fb.auth.onAuthStateChanged(user => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
})
