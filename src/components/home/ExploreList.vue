<template>
  <div>
    <h2>Explore</h2>
    <div class="container">
      <genre-item v-for="(item, index) in items" :key="index"></genre-item>
    </div>
    <section>
      <button @click="items += 4" class="btn px-4 mt-3">More</button>
    </section>
  </div>
</template>

<script>
import GenreItem from "./GenreItem.vue";

export default {
  data() {
    return {
      items: 4,
    };
  },
  components: {
    GenreItem,
  },
};
</script>

<style scoped>
h2 {
  text-align: center;
  margin-top: 3rem;
  font-size: 3rem;
  font-weight: 100;
  letter-spacing: 0.5rem;
}

.container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

section {
  text-align: center;
}

button {
  background-color: brown;
  color: white;
  transition: all 0.2s ease-out;
}

button:hover {
  background-color: rgb(184, 63, 63);
  transform: scale(1.05);
}
</style>