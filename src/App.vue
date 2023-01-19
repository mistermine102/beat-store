<template>
  <the-navbar></the-navbar>
  <div class="container">
    <base-error></base-error>
    <router-view></router-view>
  </div>
  <the-footer></the-footer>
</template>

<script>
import TheNavbar from "./components/layout/TheNavbar.vue";
import TheFooter from "./components/layout/TheFooter.vue";
import BaseError from "./components/base/BaseError.vue";

export default {
  components: {
    TheNavbar,
    TheFooter,
    BaseError,
  },
  async created() {
    await this.$store.dispatch("setUser");
  },
};
</script>

<style scoped>
div {
  margin-bottom: 2rem;
}
</style>

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

.svg-color {
  filter: invert(100%) sepia(0%) saturate(1352%) hue-rotate(87deg) brightness(119%) contrast(119%);
}

#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
</style>
