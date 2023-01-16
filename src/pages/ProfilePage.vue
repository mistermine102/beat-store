<template>
  <div>
    <h1>Hello {{ user.email }}</h1>
    <div v-for="beat in beats" :key="beat._id">
      <base-beat :url="beat.url" class="d-inline"></base-beat>
      <button @click="deleteBeat(beat)" class="btn btn-danger">Delete</button>
    </div>
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
