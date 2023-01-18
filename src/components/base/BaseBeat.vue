<template>
  <div>
    <audio ref="audio" :src="url"></audio>
    <div class="controls">
      <button @click="play">Play</button>
      <button @click="pause">Pause</button>
      <button @click="volumeUp">+</button>
      <button @click="volumeDown">-</button>
      <progress @click="setCurrentTime" :value="progress" max="100">
        <div>46478785345834589</div>
      </progress>
      <div class="volume">
        <span class="volume-point"></span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["url", "id"],
  data() {
    return {
      progress: 0,
      interval: null,
    };
  },
  methods: {
    play() {
      this.$refs.audio.play();
      this.interval = setInterval(() => {
        const { audio } = this.$refs;
        this.progress = (audio.currentTime / audio.duration) * 100;

        if (this.progress === 100) {
          clearInterval(this.interval);
        }
      }, 10);
    },
    pause() {
      this.$refs.audio.pause();
      clearInterval(this.interval);
    },
    volumeUp() {
      const { audio } = this.$refs;
      if (audio.volume > 0.9) {
        audio.volume = 1;
        return;
      }
      audio.volume += 0.1;
    },
    volumeDown() {
      const { audio } = this.$refs;
      if (audio.volume < 0.1) {
        audio.volume = 0;
        return;
      }
      audio.volume -= 0.1;
    },
    setCurrentTime(event) {
      const { audio } = this.$refs;
      const newCurrentProgress = event.offsetX / event.srcElement.clientWidth;

      this.progress = newCurrentProgress * 100;

      const newCurrentTime = newCurrentProgress * audio.duration;

      audio.currentTime = newCurrentTime;
    },
  },
};
</script>

<style scoped>
progress {
  width: 50%;
}

.volume {
  display: inline-flex;
  align-items: center;
  margin-left: 1rem;
  background-color: #c7c7c7;
  border-radius: 1rem;
  width: 10%;
  height: 5px;
}

.volume-point {
  display: inline;
  position: absolute;
  height: 10px;
  width: 10px;
  background-color: rgb(140, 140, 140);
  border-radius: 50%;
}
</style>