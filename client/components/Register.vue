<template>
  <div>
    <navbar> </navbar>
    <form>
      <div>
        <label for="mail">e-mail :</label>
        <input
          type="email"
          id="mail"
          name="user_mail"
          v-model="user.email"
          required
        />
      </div>

      <div>
        <label for="password">password :</label>
        <input
          type="text"
          id="password"
          name="user_password"
          v-model="user.password"
          required
        />
      </div>

      <div>
        <label for="pseudo"> pseudo :</label>
        <input
          type="text"
          id="pseudo"
          name="user_pseudo"
          v-model="user.pseudo"
          required
        />
      </div>

      <div>
        <button @click="userRegistration()">enter</button>
      </div>
    </form>
    <foot> </foot>

    <p>{{ userRegistrationResult }}</p>
  </div>
</template>

<script>
module.exports = {
  name: "register",
  props: {
    userRegistrationResult: { type: String },
  },

  data() {
    return {
      user: { email: "", password: "", pseudo: "" },
    };
  },

  methods: {
    async userRegistration() {
      console.log("BITE");
      await this.$emit(
        "user-registration",
        this.user.email,
        this.user.password,
        this.user.pseudo
      );
      console.log(this.userRegistrationResult);
    },
  },

  components: {
    Navbar,
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
