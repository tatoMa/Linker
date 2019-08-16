<template>
<SlideXLeftTransition>
    <nav class="panel">
        <!-- side menu -->
        <side-menu v-if="sideMenuswitcher" @closeSideMenu="sideMenuSwitch"></side-menu>
        <!-- navigation bar -->
        <navbar @sideMenuSwitch="sideMenuSwitch" :title="'Profile'" :save="true" @save="save"/>
        <!-- <div class="hero top">
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
        </div> -->
        <div class="avatar">
            <figure class="image">
                <img :src="currentUserProfileFromDB.avatar" v-if="currentUserProfileFromDB">
            </figure>
            <p class="subtitle is-3" v-if="currentUserProfileFromDB">{{currentUserProfileFromDB.name}}</p>
            <a class="subtitle is-6">MY PROFILE</a> 
            <!-- {{currentRoute}} -->
        </div>
        <div class="hero content">
            <div class="label">
                <h1 class="subtitle is-6 label-text">
                    GENERAL
                </h1>
            </div>
            <div>
                <h1 class="subtitle is-6 menu-value" v-if="currentUserProfileFromDB">
                    <!-- <input type="text" :value="currentUserProfileFromDB.name"> -->
                    {{currentUserProfileFromDB.name}}
                </h1>
                <h1 class="subtitle is-6 menu-text">
                    Username
                </h1>
            </div>
            <div>
                <h1 class="subtitle is-6 menu-value" v-if="currentUserProfileFromDB">
                    {{currentUserProfileFromDB.email}}
                </h1>
                <h1 class="subtitle is-6 menu-text">
                    Email
                </h1>
            </div>
            <div>
                <h1 class="subtitle is-6 menu-value" v-if="currentUserProfileFromDB">
                    {{currentUserProfileFromDB.gender}}
                </h1>
                <h1 class="subtitle is-6 menu-text">
                    Gender
                </h1>
            </div>
            <div>
                <h1 class="subtitle is-6 menu-value" v-if="currentUserProfileFromDB">
                    {{currentUserProfileFromDB.age}}
                </h1>
                <h1 class="subtitle is-6 menu-text">
                    Age
                </h1>
            </div>
            <div>
                <h1 class="subtitle is-6 menu-value" v-if="currentUserProfileFromDB">
                    {{currentUserProfileFromDB.interests.toString()}}
                </h1>
                <h1 class="subtitle is-6 menu-text">
                    Interests
                </h1>
            </div>
            <div>
                <h1 class="subtitle is-6 menu-value" v-if="currentUserProfileFromDB">
                    {{currentUserProfileFromDB.intro}}
                </h1>
                <h1 class="subtitle is-6 menu-text">
                    Intro
                </h1>
            </div>
            <div>
                <h1 class="subtitle is-6 menu-value" v-if="geoLocationToAddress()">
                    {{geoLocationToAddress()}}
                </h1>
                <h1 class="subtitle is-6 menu-value" v-else>
                    Melbourne
                </h1>
                <h1 class="subtitle is-6 menu-text">
                    Location
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
        <div class="buttons">
            <a class="button is-fullwidth btnSignUp" @click="save">SAVE CHANGES</a>
            <a class="button is-fullwidth btnLogin" >DISCARD CHANGES</a>
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
        }
    },
    computed: {
        currentUserProfileFromDB() {
            // if(JSON.parse(localStorage.getItem('currentUser')).uid)
            if(this.$store.getters.currentUserProfileFromDB){
                return this.$store.getters.currentUserProfileFromDB
            }
            this.$store.dispatch('fetchCurrentUserProfileById', JSON.parse(localStorage.getItem('currentUser')).uid)
            
        }
    },
    methods: {
        sideMenuSwitch () {
        this.sideMenuswitcher = !this.sideMenuswitcher
        if(this.sideMenuswitcher){
            document.body.style.setProperty("overflow", "hidden")
        } else document.body.style.removeProperty("overflow")
        },
        geoLocationToAddress () {
            if(this.currentUserProfileFromDB.location){
                fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${this.currentUserProfileFromDB.location._lat},${this.currentUserProfileFromDB.location._long}&key=AIzaSyBLO3ppaSfLX1NXF7fNO4JGsYOvAxQvAi8`)
                .then(response=>{
                    if (response.status !== 200) {
                        console.log('Looks like there was a problem. Status Code: ' +
                        response.status);
                        return;
                    }
    
                    // Examine the text in the response
                    response.json().then(function(data) {
                        console.log(data);
                        return data.results[0].formatted_address
                    })
                })
            }
        },
        save(){
            console.log('save')
        }
    },
    mounted(){
        
        
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
.avatar {
  text-align: center;
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
  margin-bottom: 0.5rem;
}
figure img {
  margin-top: 1rem;
  margin-left: calc(50vw - 48px);
  object-fit: cover;
  width: 96px;
  height: 96px;
  border-radius: 50%;
}
.button {
  padding: 1.4rem;
  margin-top: 0.6rem;
  border: 0px;
  color: #fff;
  font-size: 0.8rem;
  font-weight: bold;
  border-radius: 10px;
  margin-left: 2rem;
  margin-right: 2rem;
}
.buttons .btnSignUp {
  background-color: #f24e86;
}
.buttons .btnLogin {
  background-color: #02b4ff;
  margin-bottom: 15px;
}
.buttons .button:not(:last-child) {
  margin-right: 2rem;
}
</style>