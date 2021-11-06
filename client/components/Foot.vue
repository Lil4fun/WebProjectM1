<template>
  <div>
    <footer>
      <p>
        Author: Lilian Geny<br />
        <a class="ref" href="lilian.geny@gmail.com">lilian.geny@efrei</a>
      </p>
    </footer>
  </div>
</template>

<script>
module.exports = {
  name: "foot",
  data() {
    return {
      exampleData: null,
    };
  },

  components: {},
};
</script>

<style>
footer {
  text-align: center;
  background: #333;
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 50px;
  margin-top: 50px;
  color: white;
}

.ref {
  color: white;
}
</style>
