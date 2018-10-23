<template>
<SlideXLeftTransition>
  <nav class="panel">
    <!-- side menu -->
    <SlideXLeftTransition>
    <side-menu v-if="sideMenuSwitcher" @closeSideMenu="sideMenuSwitch"></side-menu>
    </SlideXLeftTransition>
    <!-- loading spinner -->
    <div v-if="loading">
      <span class="icon loading">
        <i class="fas fa-spinner fa-pulse fa-6x"></i>
      </span>
    </div>
    <div v-else>
      <!-- navigation bar -->
      <navbar @sideMenuSwitch="sideMenuSwitch" :title="'Messages'" :messagesUnread="12"/>
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
        <!-- friends list -->
        <div v-if="friendsList.length === 0">
          <article class="message is-medium" >
            <div class="message-header" style="background-color:#f24e86">
              <p>Hi, how are you?</p>
            </div>
            <div class="message-body" @click="$router.push('/userlist')">
              Don't have any friends? <a>Add here.</a>
            </div>
          </article>

        </div>
        <Friend v-for="friend in friendsList" :friend="friend" :key="friend.id"/>
      </div>
    </div>
  </nav>
</SlideXLeftTransition>
</template>

<script>
import SideMenu from '../components/SideMenu.vue'
import Friend from '../components/Friend.vue'
import Navbar from '../components/Navbar.vue'
import fb from '../firebaseConfig'
import {SlideXLeftTransition} from 'vue2-transitions'
export default {
  name: 'home',
  components: {
    SideMenu,
    Friend,
    Navbar,
    SlideXLeftTransition
  },
  data () {
    return {
      sideMenuSwitcher: false,
      loading: true,
      friends: [
        {
          id: 1,
          name: 'Fred',
          onlineStatus: true,
          message: 'Hi, How are you?',
          postTime: '11:09 PM',
          avatar:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzug29_sTrd22tS9zGqmpXMK_xjKVfjHsnyqIw9U9_1FxyliRD'
        }
      ]
    }
  },
  computed: {
    friendsList() {
      console.log(this.$store.getters.friendsList ) 
      return this.$store.getters.friendsList 
    }
  },
  async mounted() {
    if(!this.friendsList.length){
      await this.$store.dispatch('fetchFriendsList', JSON.parse(localStorage.getItem('currentUser')).uid)
    }
    this.loading = false
  },
  methods: {
    sideMenuSwitch () {
    this.sideMenuSwitcher = !this.sideMenuSwitcher
      if(this.sideMenuSwitcher){
        document.body.style.setProperty("overflow", "hidden")
      } else document.body.style.removeProperty("overflow")
    }
  }
}
</script>
<style scoped>
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
  height: calc(100vh - 3.5rem);
  overflow-y: scroll;
}
</style>
