<template>
<SlideXRightTransition>
    <nav class="panel">
        <!-- side menu -->
        <side-menu v-if="sideMenuswitcher" @closeSideMenu="sideMenuSwitch"></side-menu>
        <!-- navigation bar -->
        <navbar @sideMenuSwitch="sideMenuSwitch" :title="'Profile'" :messagesUnread="12"/>
        <SlideYUpTransition>
          <div v-if="addedFriend" class="notification" @click="addedFriend = false">
            <button class="delete" @click="addedFriend = false"></button>
            You have added this user as your friend successfully.
          </div>
        </SlideYUpTransition>
        <div class="main-container container has-text-centered">
            <figure class="image frame">
                <img class="user-pic" :src=userFromId.avatar />
            </figure>
            <div class="bottom-circle">
                <div class="star">
                    <i class="fas fa-star fa-lg"></i>
                </div>
                <h1 class="subtitle is-3">{{userFromId.name}}</h1>
                <h2 class="subtitle is-7">30 yrs old / 1.2km away</h2>
                <div v-if="checkUserIsLoginUser">
                  <p>This is your self</p>
                </div>
                <div v-else class="buttons columns is-centered is-mobile">
                    <div class="column">
                        <div class="cross" @click="goBack">
                            <i class="fas fa-times fa-4x"></i>
                        </div>
                    </div>
                    <div class="column">
                      <div class="heart" @click="addFriend">
                          <i class="fas fa-heart fa-3x"></i>
                      </div>
                    </div>
                </div>
            </div>
        </div>
    </nav>
</SlideXRightTransition>
</template>

<script>
import SideMenu from '../components/SideMenu.vue'
import Navbar from '../components/Navbar.vue'
import {SlideXRightTransition, SlideYUpTransition} from 'vue2-transitions'
export default {
  components:{
    SideMenu,
    Navbar,
    SlideXRightTransition,
    SlideYUpTransition
  },
  data() {
    return {
      sideMenuswitcher: false,
      UserId:'',
      currentUserId: JSON.parse(localStorage.getItem('currentUser')).uid,
      addedFriend: false
    }
  },
  mounted () {
    this.UserId = this.$route.params.id
    if (this.userFromId.id !== this.UserId){
      this.$store.commit('resetUserFromId')
      this.$store.commit('getUserFromId', this.UserId)
    }
  },
  computed: {
    userFromId() {
      return this.$store.getters.userFromId
    },
    checkUserIsLoginUser(){
      return this.$store.getters.userFromId.id === this.currentUserId
    }
  },
  methods: {
    async addFriend(){
      let temp = {currentUserId: this.currentUserId, userToBeAdded: this.UserId}
      await this.$store.dispatch('addUserIntoFriendsArray', temp)
      this.addedFriend = true
    },
    sideMenuSwitch () {
    this.sideMenuswitcher = !this.sideMenuswitcher
    if(this.sideMenuswitcher){
        document.body.style.setProperty("overflow", "hidden")
    } else document.body.style.removeProperty("overflow")
    },
    goBack(){
      this.$router.go(-1);
    }
  }
}
</script>

<style scoped>
.notification {
  position: fixed;
  top: 3.5rem;
  z-index: 10;
  background-color: #f24e86;
  color: #fff;
}
.main-container {
  background-color: #f8f8f8;
  height: calc(100vh - 3.5rem);
}
.frame {
  padding-top: 5vh;
}
.user-pic {
  margin: auto;
  width: 17rem;
  border: 1.5rem solid #fff;
}

.bottom-circle {
  z-index: 100;
  position: absolute;
  bottom: 0px;
  height: 13rem;
  width: 100%;
  background-image: url('../assets/profile.png');
  background-position: center top;
  background-size: cover;
  text-align: center;
}
.bottom-circle h1 {
  margin-top: 1.7rem;
  margin-bottom: 0.3rem;
}
.bottom-circle h2 {
  margin-bottom: 0.5rem;
}
.star {
  position: absolute;
  left: calc(50vw - 1.5rem);
  top: -1.5rem;
  height: 3rem;
  width: 3rem;
  border-radius: 50%;
  background-color: #02b4ff;
}
.star i {
  color: #fff;
  margin-top: 1rem;
}
.buttons {
  width: 70vw;
  margin: auto;
}
.buttons .cross,
.buttons .heart {
  margin: auto;

  border-radius: 50%;
  background-color: #a8a8a8;
  height: 5rem;
  width: 5rem;
}
.buttons .cross i,
.buttons .heart i {
  color: #fff;
  margin-top: 0.5rem;
}
.buttons .heart {
  background: #f24e86;
}
.buttons .heart i {
  margin-top: 1.1rem;
}
</style>