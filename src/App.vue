<template>
  <the-navbar></the-navbar>
  <router-view></router-view>
  <the-footer></the-footer>
</template>

<script>
import TheNavbar from "./components/layout/TheNavbar.vue";
import TheFooter from "./components/layout/TheFooter.vue";

export default {
  components: {
    TheNavbar,
    TheFooter,
  },
};
</script>

<style>
* {
  box-sizing: border-box;
  font-family: "Montserrat", sans-serif;
}

body {
  background-color: rgb(20, 20, 40);
  color: white;
  overflow-x: hidden; /* Hide vertical scrollbar */
}

#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
</style>
