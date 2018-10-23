<template>
<SlideXLeftTransition>
    <nav class="panel">

    <!-- side menu -->
    <side-menu v-if="sideMenuswitcher" @closeSideMenu="sideMenuSwitch"></side-menu>
    <!-- loading spinner -->
    <!-- <div v-if="loading">
      <span class="icon loading">
        <i class="fas fa-spinner fa-pulse fa-6x"></i>
      </span>
    </div> -->
    <div>
      <!-- navigation bar -->
      <navbar @sideMenuSwitch="sideMenuSwitch" :title="'Browse'" :messagesUnread="12"/>
      <!-- main container -->
      <div class="main-container">
        <!-- search box -->
        <div class="search-box">
          <p class="control has-icons-left">
            <input class="input is-small search" type="text" placeholder="search messages">
            <span class="icon is-small is-left">
              <i class="fas fa-search" aria-hidden="true"></i>
            </span>
          </p>
        </div>
        <div class="container" style="width:85%">
            <div class="columns is-multiline is-mobile has-text-centered is-gapless"  >
                <user-icon v-for="user in usersList" :key="user.id" :user="user"/>
            </div>
        </div>
        <!-- friends list -->
        <!-- <main-item v-for="friend in friends" :friend="friend" :key="friend.id"/> -->
      </div>
      <!-- <div class="panel-block">
        <button class="button is-link is-outlined is-fullwidth">
          reset all filters
        </button>
      </div> -->
    </div>
  </nav>
</SlideXLeftTransition>
</template>

<script>
import SideMenu from '../components/SideMenu.vue'
import UserIcon from '../components/UserIcon.vue'
import Navbar from '../components/Navbar.vue'
import {SlideXLeftTransition} from 'vue2-transitions'
export default {
    components:{
        SideMenu,
        UserIcon,
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
      if(!this.$store.state.users.usersListFetched){
        this.$store.dispatch('fetchUsersList')

      }
    },
    computed: {
      usersList() {
        // this.scorllToNewMessage()
        // this.$nextTick(() => {
        //   this.inputMsg=''
        //   this.scorllToNewMessage()
        // })
        // console.log(this.$store.getters.chatsList )
        return this.$store.getters.usersList
      }
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
.navbar {
  font-weight: bold;
  font-size: 1.1rem;
  padding: 0.7rem 0px;
  background-color: #ffffff;
  border-bottom: 2px solid #00000010;
  padding-left: 4vw;
  padding-right: 4vw;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 3.5rem;
}
.navbar .nav-icon {
  -webkit-text-stroke: 2px white;
  color: #000;
  font-size: 2rem;
}
.badge-message {
  color: #fff;
  position: absolute;
  padding-top: 0.18rem;
  height: 1.1rem;
  min-width: 1.1rem;
  text-align: center;
  border-radius: 50%;
  top: 0.4rem;
  right: 0.6rem;
  font-size: 0.6rem;
  background-color: #f24e86;
  z-index: 5;
}
.search-box {
  background-color: #f8f8f8;
  text-align: center;
  padding: 0.5rem 1.2rem;
  border-top: 0px;
  border-bottom: 1px solid #00000010;
}
.search {
  border-radius: 10px;
  text-align: center;
}
.loading {
  text-align: center;
  width: 100vw;
  height: 100vh;
}
.main-container {
  height: calc(100vh - 7vh);
  overflow-y: scroll;
}
</style>
