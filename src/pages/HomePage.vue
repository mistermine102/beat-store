<template>
  <the-stars></the-stars>
  <search-bar></search-bar>
  <explore-list></explore-list>
  <figure v-for="beat in beats" :key="beat._id">
    <audio controls :src="beat.url"></audio>
    <button @click="deleteBeat(beat._id)" class="btn btn-danger">Delete</button>
    <p>Author {{ beat.author }}</p>
    <p>Curren {{ currentUser }}</p>
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
    deleteBeat(id) {
      this.$store.dispatch("beats/deleteBeat", id);
    },
  },
  computed: {
    currentUser() {
      if (!this.$store.getters.user) return;
      return this.$store.getters.user._id;
    },
    beats() {
      return this.$store.getters["beats/beats"];
    },
  },
  async created() {
    await this.fetchBeats();
  },
};
</script>
