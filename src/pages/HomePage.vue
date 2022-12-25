<template>
  <div class="container">
    <the-stars></the-stars>
    <search-bar></search-bar>
    <explore-list></explore-list>
    <figure v-for="file in files" :key="file._id">
      <audio controls :src="file.url"></audio>
    </figure>
  </div>
</template>

<script>
import TheStars from "../components/home/TheStars.vue";
import SearchBar from "../components/home/SearchBar.vue";
import ExploreList from "../components/home/ExploreList.vue";
import axios from "axios";

export default {
  data() {
    return {
      files: [],
    };
  },
  components: {
    TheStars,
    SearchBar,
    ExploreList,
  },
  methods: {
    async fetchFiles() {
      const { data } = await axios.get("http://localhost:3000/uploads");
      this.files = data;
    },
  },
  async created() {
    await this.fetchFiles();
  },
};
</script>
