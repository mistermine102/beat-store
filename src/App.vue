<template>
  <the-navbar></the-navbar>
  <router-view></router-view>
</template>

<script>
import TheNavbar from "./components/layout/TheNavbar.vue";

export default {
  components: {
    TheNavbar,

  },
};
</script>

<style>
body {
  background-color: rgb(20, 20, 40);
  color: white;
  box-sizing: border-box;
  font-family: "Montserrat", sans-serif;
  overflow-x: hidden; /* Hide vertical scrollbar */
}
</style>
