<template>
  <div>
    <ul class="nav">
      <li class="page">
        <router-link class="router" to="/">Home </router-link>
      </li>
      <li class="page">
        <router-link class="router" to="/domains"> Domains </router-link>
      </li>
      <li class="page">
        <router-link class="router" to="/todos"> Todos </router-link>
      </li>
      <li style="float: right" class="page">
        <router-link class="router" to="/login">Login </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
module.exports = {
  name: "navbar",
  data() {
    return {
      exampleData: null,
    };
  },

  components: {
    Login,
    Home,
    Foot,
  },
};
</script>

<style>
.nav {
  top: 0;
  width: 100%;
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
  background-color: #333;
}

.page {
  float: left;
}

.page a {
  display: block;
  color: white;
  text-align: center;
  padding: 20px 18px;
  text-decoration: none;
}

.page a:hover {
  background-color: #111;
}
</style>
