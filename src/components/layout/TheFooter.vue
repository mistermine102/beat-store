<template>
  <footer>
    <div class="container">
      <div class="row">
        <div class="col-2 d-flex align-items-center">
          <img width="40" src="../../assets/mainLogo.svg" alt="" />
          <p class="text-muted ms-3">&copy; {{ Date().split(" ")[3] }} H I P H O P bez reszty oddany</p>
        </div>
        <nav class="col-8 d-flex">
          <ul>
            <li><a href="#">GitHub</a></li>
            <li><a href="#">Discord</a></li>
            <li><a href="#">Soundcloud</a></li>
          </ul>
        </nav>
        <div class="col-2"></div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
footer {
  background-color: rgb(15, 15, 30);
  position: relative;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 1rem 0;
  margin-top: auto;
  display: flex;
}

p {
  margin: 0;
  font-size: 0.8rem;
}

ul {
  margin: auto;
  display: flex;
  padding: 0;
  justify-content: center;
}

li {
  list-style: none;
  margin-right: 3rem;
}

li:last-of-type {
  margin: 0;
}

a {
  color: white;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  transition: background-color 0.1s ease-in;
}
a:hover {
  background-color: rgba(255, 255, 255, 0.1);
}
</style>
