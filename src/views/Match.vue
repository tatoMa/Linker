<template>
<SlideXLeftTransition>
    <nav class="panel">
        <!-- side menu -->
        <side-menu v-if="sideMenuswitcher" @closeSideMenu="sideMenuSwitch"></side-menu>
        <!-- navigation bar -->
        <navbar @sideMenuSwitch="sideMenuSwitch" :title="'You may like'" :messagesUnread="12"/>
        <div class="container has-text-centered">
            <div class="match-box">
                <div class="columns is-mobile">
                    <div class="column">
                        <figure class="image is-96x96">
                            <img class="is-rounded" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzug29_sTrd22tS9zGqmpXMK_xjKVfjHsnyqIw9U9_1FxyliRD">
                        </figure>
                    </div>
                    <div class="column">
                        <figure class="image is-96x96">
                            <img class="is-rounded" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXC85-E7h8CQj6XTuomKvOYue77ICFcozwJRkk3ad8jE6KsHZraw">
                        </figure>
                    </div>
                </div>
                <div class="content">
                    <div class="heart">
                        <i class="fas fa-heart fa-2x"></i>
                    </div>
                    <h1 class="title">
                        It's a match!
                    </h1>
                    <h2 class="subtitle">
                        You and Ben like each other, 
                    </h2>
                    <h2 class="subtitle">
                        you can now send him a message
                    </h2>
                </div>
            </div>
            <div class="buttons">
                <a class="button is-fullwidth btnSignUp" >SEND A MESSAGE</a>
                <a class="button is-fullwidth btnLogin" >KEEP BROWSING</a>
            </div>
        </div>
    </nav>
</SlideXLeftTransition>
</template>

<script>
import SideMenu from '../components/SideMenu.vue'
import Navbar from '../components/Navbar.vue'
import {SlideXLeftTransition} from 'vue2-transitions'
export default {
    components:{
        SideMenu,
        Navbar,
        SlideXLeftTransition
    },
    data() {
        return {
            sideMenuswitcher: false,
            loading: true,
        }
    },
    mounted () {
        setTimeout(() => {
        this.loading = false
        }, 10)
    },
    methods: {
        sideMenuSwitch () {
        this.sideMenuswitcher = !this.sideMenuswitcher
        if(this.sideMenuswitcher){
            document.body.style.setProperty("overflow", "hidden")
        } else document.body.style.removeProperty("overflow")
        }
    }
}
</script>

<style scoped>
.container {
  background-color: #fafafa;
  height: calc(100vh - 3.5rem);
  padding-top: 7rem;
}
.match-box {
  margin: auto;
  width: 88vw;
  height: 15rem;
  background-color: #fff;
  border-radius: 30px;
  -webkit-box-shadow: 0 3px 2px rgb(233, 233, 233);
  -moz-box-shadow: 0 3px 2px rgb(233, 233, 233);
  box-shadow: 0 3px 2px rgb(233, 233, 233);
}
.column .image {
  margin: auto;
}
.column img {
  position: relative;
  top: -40px;
}
.match-box .content {
  position: relative;
  top: -5rem;
}
.match-box .title {
  margin-top: 0.6rem;
  margin-bottom: 0.8rem;
  font-size: 2rem;
  font-weight: 300;
}
.match-box .subtitle {
  margin-top: 0px;
  margin-bottom: 0px;
  font-size: 1.2rem;
  line-height: 1.7rem;
  font-weight: 200;
}
.heart {
  color: #f24e86;
}
.buttons {
  position: fixed;
  bottom: 7vh;
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
  font-size: 0.8rem;
  font-weight: bold;
  border-radius: 10px;
}
.buttons .btnSignUp {
  background-color: #f24e86;
}
.buttons .btnLogin {
  background-color: #02b4ff;
}
</style>