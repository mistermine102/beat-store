<template>
  <the-stars></the-stars>
  <search-bar></search-bar>
  <explore-list></explore-list>
  <figure v-for="beat in beats" :key="beat._id">
    <audio controls :src="beat.url"></audio>
  </figure>
</template>

<script>
import TheStars from "../components/home/TheStars.vue";
import SearchBar from "../components/home/SearchBar.vue";
import ExploreList from "../components/home/ExploreList.vue";

export default {
  components: {
    TheStars,
    SearchBar,
    ExploreList,
  },
  methods: {
    fetchBeats() {
      this.$store.dispatch("beats/fetchBeats");
    },
  },
  computed: {
    beats() {
      return this.$store.getters["beats/beats"];
    },
  },
  created() {
    this.fetchBeats();
  },
};
</script>
