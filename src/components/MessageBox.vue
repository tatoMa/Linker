<template>
  <div class="card" :class="{owner: !myself}">
    <div class="card-content">
      <div class="media">
        <div class="media-left">
          <figure class="image is-32x32" v-if="myself">
            <img :src=avatar alt="Placeholder image">
          </figure>
        </div>
        <div class="media-content">
          <p class="subtitle is-6 messages-text">{{message.message.message}}</p>
        </div>
      </div>
      <div class="time" :class="{timeright: !myself}">
        <p>{{timePost()}}</p>
        <!-- {{senderDefine()}} -->
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: ["message"],
    data() {
      return {
        myself: true
      }
    },
    computed: {
      avatar() {
        return this.$store.getters.chattingAvatar
      }
    },
    created(){
      if(this.message.message.senderId === JSON.parse(localStorage.getItem('currentUser')).uid){
          this.myself = true
        }else{
          this.myself = false
        }
    },
    methods: {
      timePost() {
        // myObj.hasOwnProperty('key')
        let timeTemp
        // if(this.message.message.timePost.hasOwnProperty('toDate')){
        if(this.message.message.timePost.hasOwnProperty('nanoseconds')){
          timeTemp = this.message.message.timePost.toDate()
        } else {
          timeTemp = this.message.message.timePost
        }
        if (timeTemp.getHours() > 12){
          return (parseInt(timeTemp.getHours())-12)+'.'+timeTemp.getMinutes()+'pm '+timeTemp.getDate()+'/'+(parseInt(timeTemp.getMonth())+1)
        } else {
          return (parseInt(timeTemp.getHours()))+'.'+timeTemp.getMinutes()+'am '+timeTemp.getDate()+'/'+(parseInt(timeTemp.getMonth())+1)
        }
      },
      // senderDefine(){
      //   if(this.message.message.senderId === JSON.parse(localStorage.getItem('currentUser')).uid){
      //     this.myself = true
      //   }else{
      //     this.myself = false
      //   }
      // }
    },
    
  }
</script>

<style scoped>
.msg-container {
  height: calc(100vh - 3.5rem - 3.5rem);
  background-color: #fafafa;
  display: flex;
  flex-direction: column-reverse;
}
.card {
  background-color: inherit;
  -webkit-box-shadow: none;
  max-width: 85vw;
}
.card-content {
  padding: 0.6rem 1.3rem;
}
.media-content {
  background-color: #f595b6;
  color: #fff;
  border-radius: 1rem;
  padding: 0.6rem 1rem;
}
figure img {
  object-fit: cover;
  width: 32px;
  height: 32px;
  border-radius: 50%;
}
.msg-container .messages-text {
  color: #fff;
  font-weight: 500;
}
.time {
  font-size: 0.8rem;
  font-weight: lighter;
  position: relative;
  text-align: start;
  left: 3rem;
  bottom: 1vh;
}
.timeright {
  text-align: end;
  left: 0px;
}
.card.owner {
  align-self: flex-end;
}
.owner .media-content {
  background-color: #68d1fd;
}
</style>