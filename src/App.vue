<template>
  <div id="app">
    <a v-if="currentPath === '/'" class="skip" href="/jobs">Skip to Content</a>
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
  bottom: 0;
  right: 0;
}

html {
  height: 100%;
}

body {
  min-height: 100%;
}

.skip {
  position: absolute;
  height: 18px;
  width: 100%;
  padding-bottom: 5px;
  color: #fff;
  background-color: #3cbf0a;
  transform: translateX(-100%);
}

.skip:focus,
.skip:active {
  outline: none !important;
  border: 1px solid #2182eb;
  box-shadow: 0px 0 5px #2182eb;
  transform: translateX(0%);
  animation: float-right 0.5s;
}

a:focus {
  outline: none !important;
  border-color: #2182eb;
  box-shadow: 0px 0 5px #2182eb;
}

#app {
  position: fixed;
  font-family: Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  overflow: auto;
}

#nav {
  display: flex;
  justify-content: flex-end;
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

@media (min-width: 500px) {
  .skip {
    width: 200px;
    padding: 30px;
  }
}

@keyframes float-right {
  0% {
    transform: translateX(-100%);
  }

  100% {
    transform: translateX(0%);
  }
}
</style>
