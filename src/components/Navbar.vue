<template>
  <p class="panel-heading navbar">
    <a class="icon" @click="$emit('sideMenuSwitch')">
      <i class="nav-icon fas fa-bars fa-2x"></i>
    </a>
    <span>
      {{title}}
    </span>
    <span class="unread-messages" v-if="!save">
        {{messagesUnread}}
    </span>
    <span class="icon" v-if="!save">
      <i class="nav-icon fas fa-comment fa-2x"></i>
    </span>
    <span v-if="save" class="subtitle is-6 save-text" @click="handleSave()">
      SAVE
    </span>
  </p>
</template>

<script>
export default {
  props: ['title','messagesUnread', 'save'],
  methods: {
    handleSave() {
      this.$emit('save')
    }
  },
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
.unread-messages {
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
.save-text {
  color: #f24e86;
}
</style>