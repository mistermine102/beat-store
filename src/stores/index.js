import { createStore } from "vuex";
import user from "../../server/models/user";

const store = createStore({
  state() {
    return {
      user: null,
      error: null,
    };
  },
  getters: {
    user(state) {
      return state.user;
    },
    error(state) {
      return state.error;
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
    closeError(state) {
      state.error = null;
    },
    setError(state, payload) {
      state.error = payload;
    }
  },
  actions: {
    saveToken(ctx, payload) {
      ctx.commit("saveToken", payload);
    },
    setUser(ctx, payload) {
      ctx.commit("setUser", payload);
    },
    closeError(ctx) {
      ctx.commit("closeError");
    },
    setError(ctx, payload) {
      ctx.commit("setError", payload);
    },
    logout() {
      localStorage.removeItem("token")
    },
  },
});

export default store;
