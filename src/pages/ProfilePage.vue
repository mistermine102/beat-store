<template>
  <div>
    <h1>Hello {{ user.email }}</h1>
    <figure v-for="beat in beats" :key="beat._id">
      <audio :src="beat.url" controls></audio>
      <button @click="deleteBeat(beat)" class="btn btn-danger">Delete</button>
    </figure>
  </div>
</template>
<script>
export default {
  computed: {
    user() {
      return this.$store.getters.user;
    },
    beats() {
      return this.$store.getters["beats/beats"];
    },
  },
  methods: {
    deleteBeat(beat) {
      this.$store.dispatch("beats/deleteBeat", beat);
    },
  },
  created() {
    this.$store.dispatch("beats/fetchBeats", this.user.beats);
  },
};
</script>
