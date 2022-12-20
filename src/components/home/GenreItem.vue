<template>
  <div>
    <h3>Item</h3>
  </div>
</template>

<style scoped>
div {
  padding: 2rem 5rem;
  background-image: url("../../assets/genreBg.png");
  background-repeat: no-repeat;
  background-size: cover;
  color: white;
  border-radius: 0.5rem;
  margin: 1rem;
  /* background-position-x: 50px; */
  width: 40%;
  opacity: 50%;
  transition: all 0.2s ease-in;
}

div:hover {
    opacity: 100%;
    transform: translateY(-5px);
}

h3 {
  text-align: center;
}
</style>