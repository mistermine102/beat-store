<template>
  <form @submit.prevent="submitForm" class="row">
    <div class="col-6 offset-3">
      <h1>Login Page</h1>
      <div class="form-group">
        <label for="exampleInputEmail1">Email address:</label>
        <input v-model.trim="emailInput" type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
        <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
      </div>
      <div class="form-group">
        <label for="exampleInputPassword1">Password:</label>
        <input v-model.trim="passwordInput" type="password" class="form-control" id="exampleInputPassword1" placeholder="Password" />
      </div>
      <div class="form-check">
        <input type="checkbox" class="form-check-input" id="exampleCheck1" />
        <label class="form-check-label" for="exampleCheck1">Check me out</label>
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
      <router-link class="btn btn-secondary" to="/register">Register</router-link>
    </div>
  </form>
</template>

<script>
export default {
  data() {
    return {
      emailInput: "",
      passwordInput: "",
    };
  },
  methods: {
    submitForm() {
      this.$store.dispatch("login", {
        email: this.emailInput,
        password: this.passwordInput,
      });
    },
  },
};
</script>

<style scoped>
.btn-primary{
    background-color: brown !important;
    border: none;
    margin-top: 1rem;
}
.btn-primary:hover{
  background-color: rgb(184, 63, 63);
  transform: scale(1.05);
  transition: .5s;
}
.btn-secondary{
  margin-top: 1rem;
  border: none;
  background: none;
  /* color: rgb(200, 0, 0); */
}
.btn-secondary:hover{
  /* color: rgb(255, 0, 0); */
  transform: scale(1.10);
  transition: .5s;
}
.form-group{
  margin-top: 1.5rem;
}
</style>