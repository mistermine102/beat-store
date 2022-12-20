<template>
  <div>
    <h2>Explore</h2>
    <genre-item v-for="item,index in 3" :key="index"></genre-item>
  </div>
</template>

<script>
import GenreItem from "./GenreItem.vue";

export default {
  components: {
    GenreItem,
  },
};
</script>

<style scoped>
h2 {
  text-align: center;
  margin-top: 5rem;
  font-size: 3rem;
  font-weight: 100;
  letter-spacing: 0.5rem;
}
</style>