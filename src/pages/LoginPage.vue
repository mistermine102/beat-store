<template>
  <div class="container">
    <form @submit.prevent="submitForm" class="row">
      <div class="col-6 offset-3">
        <h1>Login Page</h1>
        <div class="form-group">
          <label for="exampleInputEmail1">Email address</label>
          <input v-model.trim="emailInput" type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
          <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
        </div>
        <div class="form-group">
          <label for="exampleInputPassword1">Password</label>
          <input v-model.trim="passwordInput" type="password" class="form-control" id="exampleInputPassword1" placeholder="Password" />
        </div>
        <div class="form-check">
          <input type="checkbox" class="form-check-input" id="exampleCheck1" />
          <label class="form-check-label" for="exampleCheck1">Check me out</label>
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      emailInput: "",
      passwordInput: "",
    };
  },
  methods: {
    async submitForm() {
      try {
        const { data } = await axios.post("http://localhost:3000/login", {
          email: this.emailInput,
          password: this.passwordInput,
        });

        localStorage.setItem("token", data.token);
      } catch (error) {
        console.log(error.response.data);
      }
    },
  },
};
</script>
