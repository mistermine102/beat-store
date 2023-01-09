import { createStore } from "vuex";
import interceptorsSetup from "../axios.js";
import axios from "axios";
import router from "../router.js"

import errorModule from "./error.js";
import beatsModule from "./beats.js";

const store = createStore({
  modules: {
    error: errorModule,
    beats: beatsModule,
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
    async login(ctx, payload) {
      try {
        const { data } = await axios.post("http://localhost:3000/login", {
          email: payload.email,
          password: payload.password,
        });

        ctx.dispatch("saveToken", data.token);
        ctx.dispatch("setUser", data.user);

        router.replace("/home")
      } catch (err) {}
    },
    async register(ctx, payload) {
      try {
        const { data } = await axios.post("http://localhost:3000/register", {
          email: payload.email,
          password: payload.password,
        });

        ctx.dispatch("saveToken", data.token);
        ctx.dispatch("setUser", data.user);

        router.replace("/home")
      } catch (err) {}
    },
  },
});

export default store;
