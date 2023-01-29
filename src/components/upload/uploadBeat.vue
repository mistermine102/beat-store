<template>
  <form @submit.prevent="submitForm">
    <div class="bord">
      <label for="file">
        <div v-if="!file">
          <img width="150" src="../../assets/cloud.svg" alt="" class="svg-color" />
          <div class="text">
            Drop there file or click me
            <div class="transcript">(No file choosen, yet!)</div>
          </div>
        </div>
        <div v-else>
          <p>{{ file.name }}</p>
          <p class="text-muted">{{ fileSize }}</p>
        </div></label
      >

      <input type="file" @change="onFileChange" id="file" name="file" accept="audio/*" />
    </div>
    <div class="button-container">
      <label for="file" class="btn-label">Choose your file</label>
      <button class="btn btn-primary">Upload</button>
    </div>
  </form>
</template>

<script>
export default {
  data() {
    return {
      file: null,
    };
  },
  methods: {
    onFileChange(e) {
      this.file = e.target.files[0] || e.dataTransfer.files[0];
    },

    async submitForm(e) {
      let formData = new FormData();
      formData.append("file", this.file);

      this.$store.dispatch("beats/uploadBeat", formData);
    },
  },
  computed: {
    fileSize() {
      return (this.file.size / 1024 / 1024).toFixed(2) + "MB";
    },
  },
};
</script>

<style scoped>
.button-container {
  text-align: center;
}

input[type="file"] {
  display: none;
}
.bord {
  padding: 4.5rem;
  text-align: center;
  margin: 0 auto;
  width: 37rem;
  border: 3px dashed rgb(117, 117, 117);
  border-radius: 5%;
}
.text {
  margin-top: 3rem;
  font-size: 1.1rem;
}
.transcript {
  color: rgb(155, 155, 155);
  font-size: 0.8rem;
}
.svg-color {
  filter: invert(100%) sepia(0%) saturate(1352%) hue-rotate(87deg) brightness(119%) contrast(119%);
}
label {
  cursor: pointer;
}

.btn-label {
  margin: 2rem auto;
  background-color: brown;
  color: white;
  transition: all 0.2s ease-out;
  border-radius: 0.3rem;
  padding: 0.4rem;
}
.btn-label:hover {
  background-color: rgb(184, 63, 63);
  transform: scale(1.05);
}
</style>
