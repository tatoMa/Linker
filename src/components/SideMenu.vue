<template>
    <div class="side-page">
        <div class="side-menu">
            <div class="avatar" @click="goToProfilePage">
                <figure class="image">
                    <img :src="currentUserProfileFromDB.avatar">
                </figure>
                <p class="subtitle is-3">{{currentUserProfileFromDB.name}}</p>
                <a class="subtitle is-6">EDIT PROFILE</a> 
                <!-- {{currentRoute}} -->
            </div>
            <div class="menu-list">
                <div class="menu-item" :class="{ 'highlight': $route.path == '/friends' }" @click="goToFriendsPage">
                    <span class="nav-icon">
                        <i class="fas fa-comment"></i>
                        <span class="subtitle is-5 menu-item-rext">Message</span> 
                    </span> 
                </div>
                <div class="menu-item" :class="{ 'highlight': $route.path == '/userlist' }" @click="goToUserListPage">
                    <span class="nav-icon">
                        <i class="fas fa-users"></i>
                        <span class="subtitle is-5 menu-item-rext">Browse</span> 
                    </span> 
                </div>
                <div class="menu-item" :class="{ 'highlight': $route.path == '/match' }" @click="goToMatchPage">
                    <span class="nav-icon">
                        <i class="fas fa-heart"></i>
                        <span class="subtitle is-5 menu-item-rext">Matches</span> 
                    </span> 
                </div>
                <div class="menu-item" :class="{ 'highlight': $route.path == '/setting' }" @click="goToSettingPage">
                    <span class="nav-icon">
                        <i class="fas fa-cog"></i>
                        <span class="subtitle is-5 menu-item-rext">Setting</span> 
                    </span> 
                </div>
                
            </div>
            <div class="side-bottom">
                Logout
            </div>
        </div>
        <a class="side-close-shadow" @click="closeSideMenu">

        </a>
    </div>
</template>

<script>
export default {
    computed: {
        currentRoute() {
            // return this.$route.path
            console.log( this.$route.path)
        },
        currentUserProfileFromDB() {
            // if(JSON.parse(localStorage.getItem('currentUser')).uid)
            if(this.$store.getters.currentUserProfileFromDB){
                return this.$store.getters.currentUserProfileFromDB
            }
            this.$store.dispatch('fetchCurrentUserProfileById', JSON.parse(localStorage.getItem('currentUser')).uid)
            
        }
    },
    methods: {
        closeSideMenu() {
            this.$emit('closeSideMenu')
        },
        goToUserListPage(){
            this.$router.push('/userlist')
        },
        goToFriendsPage(){
            this.$router.push('/friends')
        },
        goToSettingPage(){
            this.$router.push('/setting')
        },
        goToMatchPage(){
            this.$router.push('/match')
        },
        goToProfilePage(){
            this.$router.push('/profile')
        }
    },
}
</script>

<style scoped>
.side-page {
  z-index: 200;
  display: flex;
  position: absolute;
}
.side-menu {
  top: 0px;
  left: 0px;
  background-color: #ffffff;
  height: 100vh;
  width: 70vw;
  /* z-index: 200; */
  border-right: 1px solid rgba(0, 0, 0, 0.2);
  height: calc(100vh - 3rem);
  overflow-y: scroll;
}
.avatar {
  text-align: center;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
}
.avatar .is-3 {
  margin-bottom: 0px;
}
.avatar .is-6 {
  display: inline-block;
  font-size: 0.8rem;
  padding: 0.5rem;
  color: #f24e86;
  font-weight: 600;
  margin-bottom: 2rem;
}
figure img {
  margin-top: 10vw;
  margin-left: calc(35vw - 48px);
  object-fit: cover;
  width: 96px;
  height: 96px;
  border-radius: 50%;
}
.menu-list {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  color: rgba(0, 0, 0, 0.3);
}
.menu-item:first-child {
  margin-top: 1rem;
}
.menu-item {
  margin: 0px;
  padding: 1.4rem;
  width: 100%;
}
.menu-item:hover {
  background-color: rgba(0, 0, 0, 0.2);
}
.highlight {
  border-left: 3px solid #f24e86;
  border-right: 3px solid #f24e86;
  background-color: rgba(0, 0, 0, 0.03);
}
.menu-item-rext {
  padding-left: 1.5rem;
  color: rgba(0, 0, 0, 0.8);
  font-weight: 300;
}
.nav-icon i {
  width: 1rem;
}
.side-bottom {
  background-color: #f24e86;
  position: fixed;
  bottom: 0px;
  left: 0px;
  width: 70vw;
  height: 3rem;
  text-align: center;
  padding-top: 0.7rem;
  color: #ffffff;
}
.side-close-shadow {
  height: 100vh;
  width: 30vw;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 200;
}
</style>