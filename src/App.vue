<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link>|
      <router-link to="/jobs">View Jobs</router-link>|
      <router-link
        v-if="!this.$store.state.user.id || !this.$store.state.user.token"
        :to="currentPath === '/login' ? '/signup' : '/login'"
      >{{ currentPath === '/login' ? 'Signup' : 'Login' }}</router-link>
      <router-link
        v-if="this.$store.state.user.id && this.$store.state.user.token"
        to="/dashboard"
      >Dashboard</router-link>
    </div>
    <router-view />
  </div>
</template>

<script>
export default {
  computed: {
    currentPath() {
      return this.$route.path;
    }
  }
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  left: 0;
  top: 0;
}

html,
body {
  overflow: hidden;
  height: 100%;
  min-height: 100%;
}

#app {
  height: 100%;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  display: flex;
  justify-content: end;
  padding: 30px;
  background-color: #3cbf0a;
}

#nav a {
  padding: 0 2%;
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #fff;
}
</style>
