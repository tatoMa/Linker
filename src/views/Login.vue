<template>
<FadeTransition>
  <div id="home">
    <div class="navigation">
      <span class="nav-icon" @click="toBack">
        <i class="fas fa-arrow-left fa-2x"></i>
      </span> 
    </div>
    <div class="container">
      <form @submit.prevent="submit">
        <h1 class="subtitle is-1">Login</h1>
        <div class="form-ele">
            <p>EMAIL ADDRESS</p>
            <input class="input" type="text" v-model="username" placeholder="example@mail.com" autofocus>
        </div>
        <div class="form-ele">
            <p>PASSWORD</p>
            <input class="input" type="password" v-model="password" placeholder="password">
        </div>
        <div class="buttons">
            <button class="button is-fullwidth btn-login" type="submit">Login</button>
            <a class="button is-fullwidth btn-forgot-pw" @click="toForgotPw">Forgot Password?</a>
        </div>
        <div class="nav-footer">
            <a class="button is-fullwidth btn-footer" @click="toSignUp">Don't have an account? Sign Up Now!</a>
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
  name: 'login',
  data() {
    return {
      loading: false,
      username: '123@gmail.com',
      password: 'password123',
      err: '',
    };
  },
  computed: {
  },
  mounted() {
    
  },
  methods: {
    toBack() {
      console.log('clicked')
      this.$router.push("/");
    },
    toSignUp() {
      this.$router.push("/signup");
    },
    toForgotPw() {
      this.$router.push("/forgotpw");
    },
    submitTemp() {
      if (this.username === "123" && this.password === "123") {
        console.log('login')
        this.$router.push("/friends");
      }
    },
    submit() {
      this.loading = true
      fb.auth.signInWithEmailAndPassword(this.username, this.password).then(user => {
        console.log('pass auth checking')
        this.$store.commit('setCurrentUser', user.user)
        // console.log(user.user)
        this.$store.dispatch('fetchCurrentUserProfileFromDB')
        localStorage.setItem('currentUser', JSON.stringify(user.user));
        // console.log(user)
        this.loading = false
        this.$router.push('/friends')
      }).catch(err => {
        this.err = err.message
        this.loading = false
        // console.log(err.message)
      })
    }
  }
  //   mounted() {
  //     let viewheight = $(window).height();
  //     let viewwidth = $(window).width();
  //     let viewport = document.querySelector("meta[name=viewport]");
  //     viewport.setAttribute(
  //       "content",
  //       "height=" +
  //         viewheight +
  //         "px, width=" +
  //         viewwidth +
  //         "px, initial-scale=1.0"
  //     );
  //   }
};
</script>
<style scoped>
#home {
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
  padding: 13vw;
  padding-top: 9vw;
  height: calc(100vh - 50px);
}
.container .is-1 {
  font-size: 3rem;
}
.container .subtitle {
  color: #fff;
}
.form-ele {
  margin-top: 8vh;
  color: #fff;
  font-weight: bold;
}
.form-ele p {
  font-size: 1.15rem;
}
.input {
  color: rgba(255, 255, 255, 1);
  font-weight: 500;
  font-size: 1.1rem;
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
  opacity: 0.6; /* Firefox */
  font-size: 1rem;
}
.buttons {
  margin-top: 3rem;
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
  font-size: 4vw;
  padding: 0px;
  margin: 0px;
}
.nav-footer {
  position: fixed;
  height: 2.7rem;
  bottom: 0px;
  left: 0px;
  width: 100vw;
}
.nav-footer .button {
  font-size: 0.9rem;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  color: #fff;
  -webkit-box-shadow: none;
  border: none;
  border-radius: 0px;
}
</style>
