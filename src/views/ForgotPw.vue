<template>
  <div id="home">
    <div class="navigation">
      <span class="nav-icon" @click="toBack">
        <i class="fas fa-arrow-left fa-2x"></i>
      </span> 
    </div>
    <div class="container">
        <h1 class="subtitle is-2">Forgot password</h1>
        <p>Please enter your email. We will send you the instuction on how to change your password</p>
        <div class="form-ele">
            <p>EMAIL ADDRESS</p>
            <input class="input" type="text" placeholder="example@mail.com">
        </div>
        <div class="buttons">
            <a class="button is-fullwidth btn-login" >Send</a>
        </div>
        <div class="nav-footer">
            <a class="button is-fullwidth btn-footer" @click="toSignUp">Don't have an account? Sign Up Now!</a>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "forgotpassword",
  methods: {
    toBack() {
      this.$router.go(-1);
    },
    toSignUp() {
      this.$router.push("/signup");
    }
  }
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
.container .subtitle,
p {
  color: #fff;
}
.form-ele {
  margin-top: 8vh;
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
  margin-top: 6vh;
  display: flex;
  justify-content: space-between;
}
.buttons .button:not(:last-child) {
  margin-right: 0px;
}
.buttons .button {
  width: 8rem;
  padding: 1.4rem;
  border: none;
  color: #fff;
}
.buttons .btn-login {
  background-color: #f24e86;
  font-weight: bold;
}
.buttons .btn-forgot-pw {
  background-color: transparent;
}
.nav-footer {
  position: fixed;
  height: 6vh;
  bottom: 0px;
  left: 0px;
  width: 100vw;
}
.nav-footer .button {
  font-size: 0.9rem;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  color: #fff;
  -webkit-box-shadow: none;
  border: none;
}
</style>

