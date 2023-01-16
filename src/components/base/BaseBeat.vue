<template>
  <div>
    <audio :id="id" controls :src="url"></audio>
    <div class="controls">
      <button @click="play">Play</button>
      <button @click="pause">Pause</button>
      <button @click="volumeUp">+</button>
      <button @click="volumeDown">-</button>
    </div>
  </div>
</template>

<script>
export default {
  props: ["url", "id"],
  data() {
    return {
      audio: null,
    };
  },
  methods: {
    play() {
      this.audio.play();
    },
    pause() {
      this.audio.pause();
    },
    volumeUps() {
      this.audio.volume += 0.1;
    },
    volumeDown() {
      this.audio.volume -= 0.1;
    },
  },
  mounted() {
    this.audio = document.getElementById(this.id);
    console.log(this.audio)
  },
};
</script>
