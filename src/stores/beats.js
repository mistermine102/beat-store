import axios from "axios";
import router from "../router.js"

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
    deleteBeat(state, payload) {
      state.beats = state.beats.filter((el) => el._id !== payload);
    },
  },
  actions: {
    async fetchBeats(ctx) {
      const { data } = await axios.get("http://localhost:3000/uploads").catch((err) => err);
      ctx.commit("fetchBeats", data);
    },
    async uploadBeat(ctx, payload) {
      await axios
        .post("http://localhost:3000/uploads", payload, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .catch((err) => err);
      
      router.replace("/home")
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
      } catch (err) {
        return err;
      }
    },
  },
};


