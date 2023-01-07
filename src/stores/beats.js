import axios from "axios";

export default {
  namespaced: true,
  state() {
    return {
      beats: [],
    };
  },
  getters: {
    beats(state) {
      return state.beats;
    },
  },
  mutations: {
    fetchBeats(state, payload) {
      state.beats = payload;
    },
  },
  actions: {
    async fetchBeats(ctx) {
      const { data } = await axios.get("http://localhost:3000/uploads");
      ctx.commit("fetchBeats", data);
    },
    async uploadBeat(ctx, payload) {
      await axios
        .post("http://localhost:3000/uploads", payload, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .catch((err) => {
          console.log(err.response.data);
          this.$store.dispatch("setError", err.response.data);
        });
    },
    async deleteBeat(ctx, payload) {
      axios.delete("http://localhost:3000")
    },
  },
};
