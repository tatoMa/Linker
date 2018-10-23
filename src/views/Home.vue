<template>
  <div id="home">
    <div class="container">
      <div class="titles">
        <h3 class="subtitle is-1">Linker</h3>
        <h5 class="subtitle is-5">chat and meet people around you</h5>
      </div>
      <div class="buttons">
        <a class="button is-fullwidth btnSignUp" @click="toSignUp">SIGN Up NOW</a>
        <a class="button is-fullwidth btnLogin" @click="toLogin">LOGIN</a>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "home",
  computed: {
    // bgBlured() {
    //   return this.$store.getters.bgBlured;
    // }
  },
  mounted() {
    // setTimeout(() => {
    //   this.$store.commit("changeBgBlurNot");
    //   }, 1000);
  },
  methods: {
    toSignUp() {
      // this.$store.commit("changeBgBlurDone");
      this.$router.push("/signup");
    },
    toLogin() {
      // this.$store.commit("changeBgBlurDone");
      this.$router.push("/login");
    },
    changeBgBlur() {
      this.$store.commit("changeBgBlurDone")
    },
  }
};
</script>
<style scoped>
#home {
  padding: 0px;
  margin: 0px;
  height: 100vh;
  background-image: url('../assets/bg.jpg');
  background-size: cover;
  background-position: top;
  text-align: center;
}
.container {
  height: 100vh;
}
.subtitle {
  color: rgba(255, 255, 255, 0.95);
}
.titles {
  padding-top: 5rem;
}
.buttons {
  position: fixed;
  bottom: 2.5vh;
  width: 65vw;
  left: 17.5vw;
}
.buttons .button:not(:last-child) {
  margin-right: 0px;
}
.buttons .button {
  padding: 1.4rem;
  margin-top: 0.6rem;
  border: 0px;
  color: #fff;
  font-weight: bold;
}
.buttons .btnSignUp {
  background-color: #f24e86;
}
.buttons .btnLogin {
  background-color: #2a4755;
}
</style>
