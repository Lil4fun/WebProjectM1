<template>
  <div>
    <navbar> </navbar>
    <form>
      <div>
          <label for="mail">e-mail :</label>
          <input type="email" id="mail" name="user_mail" v-model="user.email" required>
      </div>
      <div>
          <label for="password">password :</label>
          <input type="text" id="password" name="user_password" v-model="user.password" required>
      </div>
      <div>
          <button @click="userLogin()">enter</button>
      </div>
    </form>

    <p> {{userLoginResult}}</p>
    <p> Don't have an account ? Create one by clicking below</p>
    <li> <router-link class="router" to='/register'> Register account </li>
    <foot> </foot>
  </div>
</template>

<script>
module.exports = {
  name: "login",
  props: {
    userLoginResult: { type: String },
  },

  data() {
    return {
      user: {
        email: "",
        password: "",
      },
      test: false,

      response: "",
    };
  },

  methods: {
    async userLogin() {
      await this.$emit("user-login", this.user.email, this.user.password);
      test = true;
    },
  },

  components: {
    Navbar,
    Register,
    Foot,
  },
};
</script>

<style>
form {
  margin: 0 auto;
  width: 400px;
  padding: 1em;
  border: 1px solid #ccc;
  border-radius: 1em;
}

form div + div {
  margin-top: 1em;
}

label {
  display: inline-block;
  width: 90px;
  text-align: right;
}

input {
  font: 1em sans-serif;

  width: 300px;
  box-sizing: border-box;

  border: 1px solid #999;
}

input:focus {
  border-color: #000;
}

.button {
  padding-left: 90px;
}

button {
  margin-left: 15em;
}
</style>
