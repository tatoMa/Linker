<template>
<SlideXLeftTransition>
    <nav class="panel">
        <!-- side menu -->
        <side-menu v-if="sideMenuswitcher" @closeSideMenu="sideMenuSwitch"></side-menu>
        <!-- navigation bar -->
        <navbar @sideMenuSwitch="sideMenuSwitch" :title="'Settings'" :messagesUnread="12"/>
        
        <div class="hero top">
            <div>
                <div class="container has-text-centered ">
                <h1 class="title is-5 has-text-white" style="margin-bottom:0.5rem; margin-top:0.7rem">
                    You are on our free plan
                </h1>
                <h2 class="subtitle is-6 has-text-white">
                    You want to unlock all functions?
                </h2>
                <a class="button is-rounded">Upgrade to pro</a>
                </div>
            </div>
        </div>
        <div class="hero content">
            <div class="label">
                <h1 class="subtitle is-6 label-text">
                    GENERAL
                </h1>
            </div>
            <div>
                <h1 class="subtitle is-6 menu-value">
                    London, UK
                </h1>
                <h1 class="subtitle is-6 menu-text">
                    My Current Location
                </h1>
            </div>
            <div>
                <h1 class="subtitle is-6 menu-value">
                    50km
                </h1>
                <h1 class="subtitle is-6 menu-text" style="border-bottom:0px">
                    Search radius
                </h1>
            </div>
        </div>
        <div class="hero content">
            <div class="label">
                <h1 class="subtitle is-6 label-text">
                    PRIVACY
                </h1>
            </div>
            <h1 class="subtitle is-6 menu-text">
                Push notification
            </h1>
            <h1 class="subtitle is-6 menu-text">
                delete account
            </h1>
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
.top {
  background-image: url('../assets/settingbg.png');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: top;
  height: 10.5rem;
}
.hero h1 {
  margin-top: 2rem;
}
.hero .button {
  color: #f24e86;
  font-weight: bold;
}
.content {
  margin-bottom: 0px;
}
.hero .label {
  margin-bottom: 0px;
  background-color: #fafafa;
  color: #383838;
  border-top: 1px solid #3838382f;
  border-bottom: 1px solid #3838382f;
}
.hero h1 {
  margin-top: 0px;
  padding-top: 1.2rem;
  padding-bottom: 1.2rem;
}
.content .subtitle {
  margin-bottom: 0px;
}
.menu-text,
.menu-value {
  margin: 1rem;
  box-sizing: border-box;
  border-bottom: 1px solid #3838382f;
  font-weight: 400;
  font-size: 0.95rem;
}
.menu-value {
  position: absolute;
  right: 0px;
  color: #f24e86;
  border-bottom: 0px;
}
.label-text {
  color: rgba(0, 0, 0, 0.555);
  padding: 1rem;
  font-weight: 200;
  font-size: 0.9rem;
}
</style>