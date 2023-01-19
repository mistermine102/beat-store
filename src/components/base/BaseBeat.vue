<template>
  <div>
    <audio ref="audio" :src="url"></audio>
    <div class="controls">
      <button class="btn btn-success" @click="play">Play</button>
      <input
        ref="progressBar"
        type="range"
        min="0"
        max="100"
        @input="changeCurrentTime"
        v-model="progress"
      />
      <button @click="mute">Mute</button>
      <input
        type="range"
        v-model="volume"
        @input="changeVolume"
        class="win10-thumb volume"
      />
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
    console.log(this.$refs.progressBar);
  },
};
</script>
<style scoped>
.controls {
  display: flex;
}

.volume {
  transform: scale(0.5) translateX(-50%);
}

input[type="range"] {
  font-size: 1.5rem;
  width: 12.5em;
}

input[type="range"] {
  color: #ef233c;
  --thumb-height: 0.5em;
  --track-height: 0.125em;
  --track-color: rgba(255, 255, 255, 0.8);
  --brightness-hover: 120%;
  --brightness-down: 95%;
  --clip-edges: 0.125em;
}

input[type="range"].win10-thumb {
  color: rgb(135, 135, 135);
  --thumb-height: 1.375em;
  --thumb-width: 0.5em;
  --clip-edges: 0.0125em;
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
  --clip-top: calc((var(--thumb-height) - var(--track-height)) * 0.5 - 0.5px);
  --clip-bottom: calc(var(--thumb-height) - var(--clip-top));
  --clip-further: calc(100% + 1px);
  --box-fill: calc(-100vmax - var(--thumb-width, var(--thumb-height))) 0 0
    100vmax currentColor;

  width: var(--thumb-width, var(--thumb-height));
  background: linear-gradient(currentColor 0 0) scroll no-repeat left center /
    50% calc(var(--track-height) + 1px);
  background-color: currentColor;
  box-shadow: var(--box-fill);
  border-radius: var(--thumb-width, var(--thumb-height));

  filter: brightness(100%);
  clip-path: polygon(
    100% -1px,
    var(--clip-edges) -1px,
    0 var(--clip-top),
    -100vmax var(--clip-top),
    -100vmax var(--clip-bottom),
    0 var(--clip-bottom),
    var(--clip-edges) 100%,
    var(--clip-further) var(--clip-further)
  );
}

input[type="range"]:hover::-webkit-slider-thumb {
  filter: brightness(var(--brightness-hover));
}

input[type="range"]:active::-webkit-slider-thumb {
  filter: brightness(var(--brightness-down));
}

input[type="range"]::-webkit-slider-runnable-track {
  background: linear-gradient(var(--track-color) 0 0) scroll no-repeat center /
    100% calc(var(--track-height) + 1px);
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
