<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->
    <!-- <transition
      name="slide"
      mode="out-in"
      @beforeLeave="beforeLeave"
      @enter="enter"
    > -->
    <!-- <transition-page> -->
      <!-- <fade-transition> -->
      <router-view/>
      <!-- </fade-transition> -->
    <!-- </transition-page> -->
  </div>
</template>
<script>
// import {FadeTransition} from 'vue2-transitions'
// import transitionPage from './components/TransitionPage';
export default {
  components: {
    // FadeTransition
    // transitionPage
  },
  methods: {
    beforeLeave(element) {
      this.prevHeight = getComputedStyle(element).height
    },
    enter(element) {
      const { height } = getComputedStyle(element)

      element.style.height = this.prevHeight

      setTimeout(() => {
        element.style.height = height
      })
    },
    afterEnter(element) {
      element.style.height = 'auto'
    }
  },
}
</script>

<style>
/* #app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
} */
</style>
