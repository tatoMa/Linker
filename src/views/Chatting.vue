<template>
<SlideXRightTransition>
  <nav class="panel">

    <!-- navbar -->
    <p class="panel-heading navbar">
      <a @click="goBack">
        <i class="nav-icon fas fa-chevron-left fa-2x"></i>
      </a>
      <span>
        <div class="nav-center-text">
          <h2 class="subtitle username">Steven Jack</h2>
          <h2 class="subtitle lastseen">Last seen 10m ago</h2>
        </div>
      </span>
      <span>
        <h2 class="subtitle is-6">Edit</h2>
      </span>
    </p>
    <!-- main container for all messages -->
    <div class="msg-container" id="divElem">
      <template v-if="chatsList.length>0">
        <message-box v-for="(message,index) in chatsList" :key="index" :message="message"></message-box>
      </template>
    </div>
    <div class="input-container">
      <div style="flex-grow: 8" id="input-text">
        <form @submit.prevent="submit()">
        <input class="input" type="text" v-model="inputMsg"  placeholder="Type your message...">
        </form>
      </div>
      <div class="input-icon">
        <span class="icon">
          <i class="fas fa-camera-retro"></i>
        </span>
      </div>
      <div class="input-icon">
        <span class="icon">
          <i class="fas fa-microphone"></i>
        </span>
      </div> 
    </div>
  </nav>
</SlideXRightTransition>
</template>

<script>
import {SlideXRightTransition} from 'vue2-transitions'
import messageBox from '../components/MessageBox.vue'
// import fb from '../firebaseConfig'
// import { storage } from 'firebase';
export default {
  name: "home",
  components: {
    messageBox,
    SlideXRightTransition
  },
  data() {
    return {
      inputMsg:'',
      chatId: '',
      mounted: false
    };
  },
  computed: {
    chatsList() {
      // this.scorllToNewMessage()
      this.$nextTick(() => {
        this.inputMsg=''
        this.scorllToNewMessage()
      })
      // console.log(this.$store.getters.chatsList )
      return this.$store.getters.chatsList 
    }
  },
  mounted() {
    if (this.$store.getters.chattingUser.id !== this.$route.params.id){
      this.$store.commit('resetChatsList')
      // console.log('mounted phase')
      let thisFriendId = this.$route.params.id
      this.$store.dispatch('fetchChattingUser', thisFriendId)
  
      let currentUserId = JSON.parse(localStorage.getItem('currentUser'))
      // setting the unique chatting id between current user and this friend
      if(thisFriendId < currentUserId.uid){
        this.chatId = thisFriendId + currentUserId.uid
      } else{
        this.chatId = currentUserId.uid + thisFriendId
      }
      // console.log(this.chatId)
      this.$store.dispatch('fetchMessagesListInit', this.chatId)
      this.mounted = true
    }
  
  },
  methods: {
    scorllToNewMessage(){
      document.getElementById('divElem').scrollTo(0,document.getElementById("divElem").scrollHeight);
    },
    goBack() {
      this.$router.go(-1);
    },
    async submit(){
      let inputObject = {
        message: this.inputMsg,
        timePost: new Date(),
        // timePost: null,
        senderId: this.$route.params.id
      }
      // console.log(inputObject)
      // console.log('submit')
      // console.log(this.inputMsg)
      await this.$store.dispatch('addChatsList', {input: inputObject, chatId: this.chatId})
      // console.log('fetch then done')
      this.scorllToNewMessage()
      // this.$refs.messages.scrollIntoView({behavior: "instant", block: "end", inline: "nearest"});
    }
  }
};
</script>
<style scoped>
.panel {
  display: flex;
  flex-direction: column;
}
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
.nav-icon {
  -webkit-text-stroke: 2px white;
  font-size: 2rem;
  color: #000;
}
.navbar .nav-center-text {
  display: flex;
  flex-direction: column;
  text-align: center;
}
.navbar .lastseen {
  font-size: 0.7rem;
  font-weight: lighter;
}
.navbar .username {
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0px 0px 0.3rem 0px;
}
.msg-container {
  height: calc(100vh - 3.5rem - 3.5rem);
  background-color: #fafafa;
  display: flex;
  /* flex-direction: column-reverse; */
  flex-direction: column;
  overflow-y: scroll;
}
.input-container {
  border-top: 1px solid rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  height: 3.5rem;
}
#input-text input {
  color: rgba(0, 0, 0, 0.9);
  border: none;
  -webkit-box-shadow: none;
  padding-left: 1rem;
}
.input-container .input-icon {
  padding: 0px 0.8rem;
}
.input-container .icon {
  color: rgba(0, 0, 0, 0.3);
  font-size: 7vw;
}
</style>