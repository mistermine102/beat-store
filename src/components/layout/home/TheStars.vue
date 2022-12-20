<template>
  <section>
    <div v-for="(item, index) in 20" :key="index" :style="generateStyles()"></div>
  </section>
</template>

<script>
export default {
  methods: {
    generateStyles() {
      const scale = 0.4 + Math.random() * 0.3;
      const translateY = Math.random() * 80;
      const translateX = Math.random() * 2000;

      const signNumberX = Math.random();
      const signNumberY = Math.random();

      let signX = "";
      if (signNumberX > 0.5) {
        signX = "-";
      }

      let signY = "";
      if (signNumberY > 0.5) {
        signY = "-";
      }

      return {
        transform: `scale(${scale}) translateY(${signY}${translateY}px) translateX(${signX}${translateX}px)`,
      };
    },
  },
};
</script>

<style scoped>
section {
  position: relative;
  margin: 5rem 0;
  left: 50px;
  right: 50px;
  display: flex;
  justify-content: center;
}

div {
  position: absolute;
  display: inline;
  height: 10px;
  width: 10px;
  border-radius: 50%;
  background-color: white;
  box-shadow: 1px 1px 1px rgb(227, 227, 227);
}
</style>
