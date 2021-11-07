<template>
  <div>
    <navbar> </navbar>
    
    <h1>Artist</h1>
    <p v-for="album in albums" :key="album.id">
      {{album.name}}
      {{album.releaseDate}}
      {{album.imageUrl}}
    </p>

    <foot></foot>
  </div>
</template>

<script>
module.exports = {
  //name: "Home",

  props: {
    albums: { type: Array }
  },

  data() {
    return {
    };
  },
  components: {
    Navbar,
    Foot,
  },

  async created(){
    
    await this.$emit("fill-albums",this.$route.params.artistId)
  }
};
</script>

<style>
</style>
