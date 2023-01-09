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

      // const r = Math.floor(Math.random() * 40);
      // const g = Math.floor(Math.random() * 40);
      const b = Math.floor(Math.random() * 100) + 155;
      const r = 100;
      const g = 200;

      const color = `rgb(${r},${g},${b})`;

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
        backgroundColor: color,
        boxShadow: `1px 1px 10px 1px ${color}`,
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
}

div {
  position: absolute;
  display: inline;
  height: 10px;
  width: 10px;
  border-radius: 50%;
  background-color: white;
}
</style>
