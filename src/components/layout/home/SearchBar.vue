<template>
  <form @submit.prevent>
    <div class="input-group mb-3">
      <input type="text" class="form-control" placeholder="Type what you're looking for..." aria-label="Username" aria-describedby="basic-addon1" />
      <span class="input-group-text" id="basic-addon1">Q</span>
    </div>
  </form>
</template>

<style scoped>
form {
  max-width: 500px;
  margin: auto;
}
</style>
