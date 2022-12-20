<template>
  <div class="container">
    <the-stars></the-stars>
    <search-bar></search-bar>
  </div>
</template>

<script>
import TheStars from "../components/layout/home/TheStars.vue";
import SearchBar from "../components/layout/home/SearchBar.vue";

export default {
  components: {
    TheStars,
    SearchBar
  },
};
</script>
