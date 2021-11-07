<template>
  <div>
    <navbar> </navbar>
    <h1>Artists </h1>
    <div class="hey">
    <li v-for="artist in artists" :key="artist.id">
      <router-link class="router" :to="{name: 'artist', params: {artistId: artist.id}}"> 
        {{artist.name}} {{artist.genre}} 
        </router-link>
      <img class="artist-photo" :src=artist.imageUrl />
    </li>
    </div>
    <foot></foot>
  </div>
</template>

<script>
module.exports = {
  //name: "Artists",

  props: {
    artists: { type: Array },
  },

  data() {
  
    return {
    
    } ;
  },

  methods: {
  },

  
  components: {
    Navbar,
    Foot,
  },
};
</script>

<style>
.router{
  margin-right: 10%;
  
 
}

.hey{
  display: flex;
  text-align: center;
  margin-left: 30%;
}
</style>
