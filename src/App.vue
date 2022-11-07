<template>
  <div class="main-container">
      <AuthLogin v-if="!isLoggedIn" @loggedIn="changeLoginState($event)" />
      <MainView v-else />
  </div>
</template>

<script>
import AuthLogin from "./components/AuthLogin.vue";
import MainView from "./components/MainView.vue";

export default {
  name: "App",
  components: {
    AuthLogin,
    MainView,
  },
  data: function () {
    return {
      isLoggedIn: false,
    };
  },
  mounted() {
    const token = this.$cookies.get("token");
    if (token) {
      this.isLoggedIn = true;
    }
  },
  methods: {
    changeLoginState(status) {
      this.isLoggedIn = status;
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
}
.main-container {
  display: flex;
  justify-content: center;
  min-height: 100vh;
}
</style>
