<template>
    <div class="column is-6">
        <div class="avatar" @click="goToProfilePage">
            <figure class="image is-96x96" style="margin:auto; margin-top:2rem; margin-bottom:0.5rem">
                <img class="is-rounded" :src=user.avatar>
            </figure>
            <h1 class="title is-5">{{user.name}}</h1>
            <h1 class="subtitle is-7">Added on 15/10</h1>
        </div>
    </div>
</template>

<script>
export default {
  props: ["user"],
  data(){
      return{
          id: this.user.id,
      }
  },
  methods: {
      goToProfilePage() {
          this.$router.push(`/userlist/${this.id}`)
      }
  },
}
</script>

<style scoped>
</style>