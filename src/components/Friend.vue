<template>
    <div>
        <a class="panel-block" @click="toChat(friend)">
          <div class="card message">
            <div class="card-content">
              <div class="media">
                <div class="media-left">
                  <figure class="image">
                    <img :src="friend.avatar" alt="Placeholder image">
                  </figure>
                  <div v-if="friend.onlineStatus" class="online-badge">ONLINE</div>
                </div>
                <div class="media-content">
                  <p class="title is-5">{{friend.name}}</p>
                  <p class="subtitle is-6">{{friend.message}}</p>
                  <!-- <time datetime="2016-1-1">{{timeFromTimestamp()}}</time> -->
                  <time datetime="2016-1-1">19/10</time>
                </div>
              </div>
            </div>
          </div>
        </a>
    </div>
</template>

<script>
export default {
    props: {
      friend: {
        default: {
          id: 1,
          name: 'Fred',
          onlineStatus: true,
          message: 'Hi, How are you?',
          postTime: '11:09 PM',
          avatar:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzug29_sTrd22tS9zGqmpXMK_xjKVfjHsnyqIw9U9_1FxyliRD'
        }
      }
    },
    methods: {
        toChat (friend) {
          this.$store.commit('setChattingAvatar', this.friend.avatar)
            this.$router.push(`/chat/${this.friend.id}`)
        },
        timeFromTimestamp () {
          let date = this.friend.postTime.toDate()
          return date
        }
    }
}
</script>

<style scoped>
.panel-block {
  padding: 0px;
  border: 0px;
  border-bottom: 1px solid rgba(20, 20, 20, 0.1);
}
.panel-block .message {
  padding: 0.5em 0.75em;
  width: 100%;
  background-color: inherit;
  border: 0px;
  -webkit-box-shadow: 0 0 0;
}
a.panel-block:hover,
label.panel-block:hover {
  background-color: rgba(90, 90, 90, 0.15);
}
time {
  position: absolute;
  top: 0.5rem;
  right: 1rem;
  font-size: 0.8rem;
}
.card-content {
  padding: 0.4rem 0.7rem;
}
.title {
  padding-top: 0.3rem;
}
.subtitle {
  padding-top: 0.2rem;
  margin: 0px;
}
figure img {
  object-fit: cover;
  width: 64px;
  height: 64px;
  border-radius: 50%;
}
.online-badge {
  color: #fff;
  position: absolute;
  padding-top: 0.15rem;
  height: 1.1rem;
  width: 3.2rem;
  text-align: center;
  border-radius: 0.5rem;
  bottom: 0rem;
  left: 1.8rem;
  font-size: 0.6rem;
  background-color: #54d586;
  z-index: 5;
}
</style>
