<template>
  <header class="container">
    <nav class="navbar navbar-dark navbar-expand-lg">
      <div class="container-fluid">
        <router-link to="/" class="navbar-brand">
          <img width="50" src="../../assets/mainLogo.svg" alt="" />
        </router-link>

        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div class="navbar-nav">
            <router-link to="/upload" class="nav-link mx-2">Upload<img width="18" class="svg-color ms-2" src="../../assets/upload.svg" alt="" /> </router-link>
            <router-link to="/popular" class="nav-link mx-2">Popular<img width="24" class="svg-color ms-1" src="../../assets/trending.svg" alt="" /></router-link>
            <router-link to="/cart" class="nav-link mx-2">Cart<img width="22" class="svg-color ms-2" src="../../assets/cart.svg" alt="" /></router-link>
            <router-link v-if="!isLoggedIn" to="/login" class="nav-link mx-2">Login</router-link>
            <div v-else class="d-flex">
              <button @click="logout" class="btn btn-link nav-link">Logout</button>
              <router-link to="/profile" class="nav-link mx-2">Profile</router-link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
export default {
  computed: {
    user() {
      return this.$store.getters.user || "Not loged in";
    },
    isLoggedIn() {
      return this.$store.getters.isLoggedIn;
    },
  },
  methods: {
    logout() {
      this.$store.dispatch("logout");
    },
  },
};
</script>

<style scoped>
header {
  padding: 1rem;
}

nav {
  background-color: rgb(20, 20, 40);
}
</style>
