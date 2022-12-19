<template>
  <header class="container">
    <nav class="navbar navbar-dark navbar-expand-lg">
      <div class="container-fluid">
        <router-link to="/" class="navbar-brand">
          <img width="40" src="../../assets/mainLogo.svg" alt="" />
        </router-link>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div class="navbar-nav">
            <router-link to="/upload" class="nav-link" href="#">Upload<img width="18" class="svg-color ms-2" src="../../assets/upload.svg" alt="" /> </router-link>
            <router-link to="/popular" class="nav-link" href="#">Popular<img width="24" class="svg-color ms-1" src="../../assets/trending.svg" alt="" /></router-link>
            <router-link to="/cart" class="nav-link" href="#">Cart</router-link>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>

<style scoped>
header {
  padding: 1rem;
}

nav {
  background-color: rgb(20, 20, 40);
}

.svg-color {
  filter: invert(100%) sepia(0%) saturate(1352%) hue-rotate(87deg) brightness(119%) contrast(119%);
}
</style>
