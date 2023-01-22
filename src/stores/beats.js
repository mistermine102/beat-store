import axios from "axios";
import router from "../router.js";

export default {
  namespaced: true,
  state() {
    return {
      beats: [],
      currentlyPlaying: null,
    };
  },
  getters: {
    beats(state) {
      return state.beats;
    },
    isPlaying(state) {
      return !!state.currentlyPlaying;
    },
    currentlyPlaying(state) {
      return state.currentlyPlaying;
    },
  },
  mutations: {
    play(state, payload) {
      state.currentlyPlaying = payload;
    },
    fetchBeats(state, payload) {
      state.beats = payload;
    },
    deleteBeat(state, payload) {
      state.beats = state.beats.filter((el) => el._id !== payload);
    },
  },
  actions: {
    play(ctx, payload) {
      ctx.commit("play", payload);
    },
    async fetchBeats(ctx, payload) {
      let url = "http://localhost:3000/uploads";
      let beats;

      if (!payload) {
        const { data } = await axios.get(url).catch((err) => err);
        beats = data;
      } else {
        beats = payload;
      }

      ctx.commit("fetchBeats", beats);
    },
    async uploadBeat(ctx, payload) {
      //server side (adds beat to the db and user.beats array)
      const response = await axios
        .post("http://localhost:3000/uploads", payload, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .catch((err) => err);

      //refecthes the beats (doesn't add it to the vuex)
      await ctx.dispatch("fetchBeats");

      //reset the user with new user.beats array
      ctx.dispatch("setUser", {}, { root: true });

      if (response) router.replace("/home");
    },
    async deleteBeat(ctx, payload) {
      try {
        if (ctx.rootGetters.user._id !== payload.author) {
          return;
        }
        //Delete from a database and AWS (server side)
        await axios.delete(`http://localhost:3000/uploads/${payload._id}`);

        //Delete from vuex store
        ctx.commit("deleteBeat", payload._id);

        //reset the user with new user.beats array
        ctx.dispatch("setUser", {}, { root: true });
      } catch (err) {
        return err;
      }
    },
  },
};
