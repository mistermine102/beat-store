<template>
  <div class="container mt-3">
    <div class="row d-flex justify-content-start beat-bg rounded-3">
      <div class="col-8">
        <audio ref="audio" :src="url" preload="metadata"></audio>
        <div class="d-flex p-2">
          <div class="controls">
            <div class="d-inline d-flex align-items-center">
              <button v-if="!isPlaying" class="btn btn-link p-0 me-3 play-pause" @click="play"><img class="svg-color" width="40" src="../../assets/play.svg" /></button>
              <button v-else class="btn btn-link p-0 me-3 play-pause" @click="pause"><img class="svg-color" width="40" src="../../assets/pause.svg" /></button>
              <input class="current-time" ref="progressBar" type="range" min="0" max="100" @input="changeCurrentTime" v-model="progress" />
              <small class="mx-3">{{ currentTimeMinutes }} / {{ durationMinutes }}</small>
            </div>
            <div class="d-inline d-flex align-items-center">
              <button class="btn btn-link p-0 me-2" @click="mute"><img class="svg-color" src="../../assets/mute.svg" width="15" alt="" /></button>
              <input type="range" v-model="volume" @input="changeVolume" class="win10-thumb volume" />
            </div>
            <slot name="delete"></slot>
          </div>
          <div class="information ms-3 d-flex flex-row p-3">
            <span class="text-muted me-2"> <b>Duration</b> 0:00</span>
            <span class="text-muted me-2"> <b>Scale</b> {{ "Unknown" }} </span>
            <span class="text-muted"> <b>Bpm</b> {{ "Unknown" }} </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["url", "id", "scale"],
  data() {
    return {
      duration: 0,
      progress: 0,
      interval: null,
      volume: 5,
      volumeBeforeMute: 0,
      isPlaying: false,
    };
  },
  methods: {
    play() {
      // if (this.$store.getters["beats/isPlaying"]) {
      //   const currentlyPlaying = this.$store.getters["beats/currentlyPlaying"];
      //   currentlyPlaying.pause();
      // }
      this.isPlaying = true;
      this.$store.dispatch("beats/play", this.id);
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
      this.isPlaying = false;
      this.$store.dispatch("beats/play", null);
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
    // setCurrentTime(event) {
    //   const { audio } = this.$refs;
    //   const newCurrentProgress = event.offsetX / event.srcElement.clientWidth;

    //   this.progress = newCurrentProgress * 100;

    //   const newCurrentTime = newCurrentProgress * audio.duration;

    //   audio.currentTime = newCurrentTime;
    // },
  },
  computed: {
    durationMinutes() {
      const min = Math.floor(this.duration / 60);
      let sec = Math.floor(this.duration % 60);
      if (sec < 10) {
        sec = `0${sec}`;
      }
      return `${min}:${sec}`;
    },
    currentTimeMinutes() {
      const min = Math.floor((this.progress * this.duration) / 100 / 60);
      let sec = Math.floor(((this.progress * this.duration) / 100) % 60);

      if (sec < 10) {
        sec = `0${sec}`;
      }

      return `${min}:${sec}`;
    },
    currentlyPlaying() {
      return this.$store.getters["beats/currentlyPlaying"];
    },
  },
  watch: {
    currentlyPlaying(value) {
      if (value) {
        if (value !== this.id) {
          this.$refs.audio.pause();
          this.isPlaying = false;
        }
      }
    },
  },
  mounted() {
    this.$refs.audio.volume = 0.05;

    this.$refs.audio.onloadedmetadata = () => {
      this.duration = this.$refs.audio.duration;
    };
  },
};
</script>
<style scoped>
img:hover {
  filter: invert(60%) sepia(0%) saturate(1352%) hue-rotate(87deg) brightness(119%) contrast(119%);
}

small {
  width: 5rem;
  text-align: center;
}
.volume {
  transform: scale(0.3) translateX(-118%);
}
.beat-bg:hover {
  background-color: rgb(15, 15, 30);
}

input[type="range"] {
  font-size: 1.5rem;
  width: 12.5em;
}

input[type="range"] {
  --thumb-color: brown;
  color: var(--thumb-color);
  --thumb-height: 0.5em;
  --track-height: 0.1em;
  --track-color: rgba(255, 255, 255, 0.8);
  --brightness-hover: 80%;
  --brightness-down: 95%;
  --clip-edges: 0.125em;
}

input[type="range"].win10-thumb {
  --thumb-color: rgb(188, 188, 188);
  color: var(--thumb-color);
  --thumb-height: 2em;
  --thumb-width: 1em;
  --clip-edges: 0.125em;
}

/* === range commons === */
input[type="range"] {
  position: relative;
  background: #fff0;
  overflow: hidden;
}

input[type="range"]:disabled {
  filter: grayscale(1);
  opacity: 0.3;
  cursor: not-allowed;
}

/* === WebKit specific styles === */
input[type="range"],
input[type="range"]::-webkit-slider-runnable-track,
input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  transition: all ease 100ms;
  height: var(--thumb-height);
}

input[type="range"]::-webkit-slider-runnable-track,
input[type="range"]::-webkit-slider-thumb {
  position: relative;
}

input[type="range"]::-webkit-slider-thumb {
  --thumb-radius: calc((var(--thumb-height) * 0.5) - 1px);
  --clip-top: calc((var(--thumb-height) - var(--track-height)) * 0.5 - 0.7px);
  --clip-bottom: calc(var(--thumb-height) - var(--clip-top));
  --clip-further: calc(100% + 0px);
  --box-fill: calc(-100vmax - var(--thumb-width, var(--thumb-height))) 0 0 100vmax currentColor;

  width: var(--thumb-width, var(--thumb-height));
  background: linear-gradient(currentColor 0 0) scroll no-repeat left center / 50% calc(var(--track-height) + 1px);
  box-shadow: var(--box-fill);
  border-radius: var(--thumb-width, var(--thumb-height));

  filter: brightness(100%);
  clip-path: polygon(100% -1px, var(--clip-edges) -1px, 0 var(--clip-top), -100vmax var(--clip-top), -100vmax var(--clip-bottom), 0 var(--clip-bottom), var(--clip-edges) 100%, var(--clip-further) var(--clip-further));
}

input[type="range"]::-webkit-slider-thumb {
  background-color: var(--thumb-color);
}
input[type="range"].win10-thumb::-webkit-slider-thumb {
  background-color: var(--thumb-color);
}

input[type="range"]:hover::-webkit-slider-thumb {
  filter: brightness(var(--brightness-hover));
}

input[type="range"]:active::-webkit-slider-thumb {
  filter: brightness(var(--brightness-down));
}

input[type="range"]::-webkit-slider-runnable-track {
  background: linear-gradient(var(--track-color) 0 0) scroll no-repeat center / 100% calc(var(--track-height) + 1px);
}

input[type="range"]:disabled::-webkit-slider-thumb {
  cursor: not-allowed;
}

/* === Firefox specific styles === */
input[type="range"],
input[type="range"]::-moz-range-track,
input[type="range"]::-moz-range-thumb {
  appearance: none;
  transition: all ease 100ms;
  height: var(--thumb-height);
}

input[type="range"]::-moz-range-track,
input[type="range"]::-moz-range-thumb,
input[type="range"]::-moz-range-progress {
  background: #fff0;
}

input[type="range"]::-moz-range-thumb {
  background: currentColor;
  border: 0;
  width: var(--thumb-width, var(--thumb-height));
  border-radius: var(--thumb-width, var(--thumb-height));
  cursor: grab;
}

input[type="range"]:active::-moz-range-thumb {
  cursor: grabbing;
}

input[type="range"]::-moz-range-track {
  width: 100%;
  background: var(--track-color);
}

input[type="range"]::-moz-range-progress {
  appearance: none;
  background: currentColor;
  transition-delay: 30ms;
}

input[type="range"]::-moz-range-track,
input[type="range"]::-moz-range-progress {
  height: calc(var(--track-height) + 1px);
  border-radius: var(--track-height);
}

input[type="range"]::-moz-range-thumb,
input[type="range"]::-moz-range-progress {
  filter: brightness(100%);
}

input[type="range"]:hover::-moz-range-thumb,
input[type="range"]:hover::-moz-range-progress {
  filter: brightness(var(--brightness-hover));
}

input[type="range"]:active::-moz-range-thumb,
input[type="range"]:active::-moz-range-progress {
  filter: brightness(var(--brightness-down));
}

input[type="range"]:disabled::-moz-range-thumb {
  cursor: not-allowed;
}
</style>
