<template>
  <div class="container">
    <the-stars></the-stars>
    <search-bar></search-bar>
    <explore-list></explore-list>
  </div>
</template>

<script>
import TheStars from "../components/home/TheStars.vue";
import SearchBar from "../components/home/SearchBar.vue";
import ExploreList from "../components/home/ExploreList.vue"

export default {
  components: {
    TheStars,
    SearchBar,
    ExploreList
  },
};
</script>
