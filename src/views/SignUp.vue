<template>
<FadeTransition>
  <div id="main">
    <div class="navigation">
      <span class="nav-icon" @click="toBack">
        <i class="fas fa-arrow-left fa-2x"></i>
      </span> 
    </div>
    <div class="container">
      <form @submit.prevent="submit">
        <h1 class="subtitle is-1">Signup</h1>
        <div class="form-ele">
            <p>CHOOSE A USER NAME</p>
            <input class="input" type="text" placeholder="John Doe" v-model="username">
        </div>
        <div class="form-ele">
            <p>EMAIL ADDRESS</p>
            <input class="input" type="text" placeholder="example@mail.com" v-model="email">
        </div>
        <div class="form-ele">
            <p>PASSWORD</p>
            <input class="input" type="password" placeholder="password" v-model="password">
        </div>
        <div class="form-ele">
            <p>CONFIRM PASSWORD</p>
            <input class="input" type="password" placeholder="password" v-model="passwordCFM">
        </div>
        <div class="buttons">
            <button class="button is-fullwidth btn-login" type="submit">SIGNUP</button>
            <a class="button is-fullwidth btn-forgot-pw" @click="toLogin">Already a member?</a>
        </div>
      </form>
      <div class="modal" :class="{'is-active':err !== ''}">
        <div class="modal-background"></div>
        <div class="modal-content">
          <article class="message is-danger">
            <div class="message-header">
              <p>Dear customer</p>
            </div>
            <div class="message-body">
              {{err}}
              <br>
              <br>
              <button class="button is-fullwidth is-danger" @click="err = ''">Close</button>
            </div>
          </article>
        </div>
      </div>
      <div class="modal" :class="{'is-active':loading}">
        <div class="modal-background"></div>
        <div class="modal-content">
          <i class="fas fa-spinner fa-pulse fa-6x loading-icon"></i>
        </div>
      </div>
    </div>
  </div>
</FadeTransition>
</template>

<script>
import {FadeTransition} from 'vue2-transitions'
import fb from '../firebaseConfig'
export default {
  components:{
    FadeTransition
  },
  data(){
    return{
      loading: false,
      username:'',
      email:'',
      password:'',
      passwordCFM:'',
      err:''
    }
  },
  name: "signup",
  methods: {
    toBack() {
      this.$router.push("/");
    },
    toLogin() {
      this.$router.push("login");
    },
    submit() {
      this.loading = true
      fb.auth.createUserWithEmailAndPassword(this.email, this.password).then(user => {
        this.$store.commit('setCurrentUser', user.user)
        // create user obj
        fb.usersCollection.doc(user.user.uid).set({
          name: this.username,
          email: this.email,
          id: user.user.uid,
          friends: [],
          avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzug29_sTrd22tS9zGqmpXMK_xjKVfjHsnyqIw9U9_1FxyliRD'
        }).then(() => {
          this.loading = false
          this.$store.dispatch('fetchCurrentUserProfileFromDB')
          localStorage.setItem('currentUser', JSON.stringify(user.user));
          this.$router.push('/friends')
        }).catch(err => {
          this.loading = false
          this.err = err.message
          // console.log(err.message)
        })
      }).catch(err => {
        this.loading = false
        this.err = err.message
        // console.log(err.message)
      })
    }
  }
}
</script>
<style scoped>
#main {
  padding: 0px;
  margin: 0px;
  height: 100vh;
  background-image: url('../assets/bg_blur.jpg');
  background-size: cover;
  background-position: top;
  /* text-align: center; */
  /* filter: blur(10px); */
}
.loading-icon {
  color: #fff;
  display: flex;
  justify-content: center;
}
.navigation {
  color: #fff;
  height: 50px;
  font-size: 0.85rem;
}
.nav-icon {
  position: relative;
  left: 6vw;
  top: 3vh;
}
.container {
  padding-left: 13vw;
  padding-right: 13vw;
  padding-top: 1rem;
  height: calc(100vh - 50px);
}
.container .subtitle {
  color: #fff;
}
.form-ele {
  margin-top: 4vh;
  color: #fff;
  font-weight: bold;
}
.input {
  color: rgba(255, 255, 255, 0.8);
  background: transparent;
  border: none;
  border-radius: 0;
  border-bottom: 1px solid #fff;
  -webkit-box-shadow: none;
  padding-left: 0px;
}
.input::placeholder {
  /* Chrome, Firefox, Opera, Safari 10.1+ */
  color: #fff;
  opacity: 0.5; /* Firefox */
}

.buttons {
  margin-top: 2rem;
  display: flex;
  justify-content: space-between;
}
.buttons .button:not(:last-child) {
  margin-right: 0px;
}
.buttons .button {
  width: 35vw;
  padding: 1.4rem;
  border: none;
  color: #fff;
}
.buttons .btn-login {
  background-color: #f24e86;
  font-weight: bold;
  padding: 0px;
  margin: 0px;
}
.buttons .btn-forgot-pw {
  background-color: transparent;
  font-weight: 400;
}
</style>
