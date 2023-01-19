<template>
  <div>
    <audio ref="audio" :src="url"></audio>
    <div class="controls">
      <button class="btn btn-success" @click="play">Play</button>
      <button class="btn btn-danger" @click="pause">Pause</button>
      <!-- <progress @click="setCurrentTime" :value="progress" max="100"></progress> -->
      <div class="progress-container">
        <div class="progress position-relative">
          <input id="progress-input" class="form-range position-absolute" @input="changeCurrentTime" type="range" v-model="progress" />
          <div class="progress-bar position-relative" role="progressbar" aria-label="Basic example" :style="{ width: `${progress}%` }" :aria-valuenow="progress" aria-valuemin="0" aria-valuemax="100"></div>
        </div>
      </div>
      <button @click="mute">Mute</button>
      <input class="form-range" v-model="volume" @input="changeVolume" type="range" />
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
      volume: 25,
      volumeBeforeMute: 0,
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
    changeVolume() {
      this.$refs.audio.volume = this.volume / 100;
    },
    mute() {
      if (this.volume === 0) {
        this.volume = this.volumeBeforeMute;
        this.$refs.audio.volume = this.volumeBeforeMute / 100;
        return;
      }
      this.volumeBeforeMute = this.volume;
      this.volume = 0;
      this.$refs.audio.volume = 0;
    },
    changeCurrentTime() {
      const { audio } = this.$refs;
      audio.currentTime = (this.progress / 100) * audio.duration;
    },
    // volumeUp() {
    //   const { audio } = this.$refs;
    //   if (audio.volume > 0.9) {
    //     audio.volume = 1;
    //     return;
    //   }
    //   audio.volume += 0.1;
    // },
    // volumeDown() {
    //   const { audio } = this.$refs;
    //   if (audio.volume < 0.1) {
    //     audio.volume = 0;
    //     return;
    //   }
    //   audio.volume -= 0.1;
    // },
    // setCurrentTime(event) {
    //   const { audio } = this.$refs;
    //   const newCurrentProgress = event.offsetX / event.srcElement.clientWidth;

    //   this.progress = newCurrentProgress * 100;

    //   const newCurrentTime = newCurrentProgress * audio.duration;

    //   audio.currentTime = newCurrentTime;
    // },
  },
  mounted() {
    this.$refs.audio.volume = 0.25;
  },
};
</script>
<style scoped>
.progress {
  height: 10px;
}
.progress-bar {
  transition: none;
}

.progress-input {
  height: 10px;
}

.progress-input::-webkit-slider-thumb {
  box-shadow: 0px 0px 0px #000000;
  border: 0px solid #000000;
  height: 20px;
  width: 39px;
  border-radius: 7px;
  background: #65001c;
  cursor: pointer;
  -webkit-appearance: none;
  margin-top: -3.5px;
}
</style>
