<template>
  <div class="auth-card">
      <h2>Welcome!</h2>
      <input
        class="email-input"
        v-model="email"
        type="email"
        placeholder="Email"
      />
      <input v-model="password" type="password" placeholder="Password" />

      <div class="error-message">
        <p v-if="errorCode == 'auth/invalid-password'">
          Please enter a valid password.
        </p>
      </div>
      <div class="submit" value="Login" @click="submitForm">Login</div>
</div>
</template>

<script lang="js">
import { defineComponent } from "vue"

export default defineComponent({
  data: function () {
    return {
      email: "",
      password: "",
      errorCode: "",
      errorMessage: "",
    }
  },
  methods: {
    submitForm() {
      fetch("http://localhost:3030/users/login", {"method": "POST",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        'email': this.email,
        'password': this.password
      })})
      .then(async response => {
        const data = await response.json()
        if(data.token) {
          this.$cookies.set("token", data.token)
          this.$emit('loggedIn', true)
        }
      })
      .catch(err => {
        console.log(err)
      })
    },
  },
})
</script>

<style scoped>
/* @media (min-width: 1024px) { */
 .auth-card {
  margin: auto;
  height: 500px;
  background-color: white;
  width: 600px;
  border-radius: 15px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  padding: 75px;
}

.card-content {
  display: flex;
}

h2 {
  width: 100%;
  justify-self: center;
}
input {
  display: flex;
  flex-wrap: wrap;
  width: 565px;
  /* max-width: 600px; */
  margin: 25px 0 5px;
  padding: 17px;
  font-size: 1.2rem;
  border-radius: 10px;
  border: 0;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  transition: 0.2s;
}

/* .email-input {
  margin-bottom: 30px;
} */

.text-container {
  display: flex;
  flex: nowrap;
  justify-content: space-between;
}

.prompt {
  font-size: 0.8rem;
  margin-right: 7px;
  text-align: end;
}

input:focus {
  outline: 0;
  transform: scale(101.5%);
  /* box-shadow: rgba(34, 139, 34, 0.342) 0px 2px 8px 0px; */
}

.submit {
  text-align: center;
  background: forestgreen;
  padding: 15px;
  border-radius: 10px;
  color: white;
  font-size: 1.2rem;
  margin: 30px 0 5px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  transition: 0.1s;
}

.submit:hover {
  cursor: pointer;
}

.submit:active {
  transform: scale(98.5%);
}

.separator {
  display: flex;
  flex-wrap: nowrap;
  max-height: 2px;
  min-height: 2px;
}

.separator-line {
  flex: 1;
  background-color: rgba(128, 128, 128, 0.514);
}

.separator-text {
  color: gray;
  line-height: 0;
  padding: 0 15px;
}

.error-message {
  margin: 0 5px;
  color: red;
  font-size: 0.8rem;
  text-align: left;
}

/* } */
</style>
