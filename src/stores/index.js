import { createStore } from "vuex";
import interceptorsSetup from "../axios.js";
import axios from "axios";
import errorModule from "./error.js";

const store = createStore({
  modules: {
    error: errorModule,
  },
  state() {
    return {
      user: null,
    };
  },
  getters: {
    user(state) {
      return state.user;
    },

    isLoggedIn(state) {
      return !!state.user;
    },
  },
  mutations: {
    saveToken(state, payload) {
      localStorage.setItem("token", payload);
    },
    setUser(state, payload) {
      state.user = payload;
    },
    logout(state) {
      state.user = null;
      localStorage.removeItem("token");
    },
  },
  actions: {
    saveToken(ctx, payload) {
      ctx.commit("saveToken", payload);
    },
    async setUser(ctx) {
      interceptorsSetup();
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const { data } = await axios.get("http://localhost:3000/user");
        ctx.commit("setUser", data);
      } catch (err) {
        console.log(err.message);
      }
    },
    logout(ctx) {
      ctx.commit("logout");
    },
  },
});

export default store;
