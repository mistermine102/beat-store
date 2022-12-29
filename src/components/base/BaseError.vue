<template>
  <div class="row">
    <div class="col-8 offset-2">
      <div v-if="error" class="alert alert-danger d-flex justify-content-between">
        <p>{{ error.message }}</p>
        <button @click="closeError" class="btn-close"></button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    error() {
      return this.$store.getters.error;
    },
  },
  methods: {
    closeError() {
      this.$store.dispatch("closeError");
    },
  },
};
</script>

<style>
p {
  margin: 0;
}
</style>
