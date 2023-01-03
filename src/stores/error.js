export default {
  state() {
    return {
      error: null,
    };
  },
  getters: {
    error(state) {
      return state.error;
    },
  },
  mutations: {
    closeError(state) {
      state.error = null;
    },
    setError(state, payload) {
      state.error = payload;
    },
  },
  actions: {
    closeError(ctx) {
      ctx.commit("closeError");
    },
    setError(ctx, payload) {
      ctx.commit("setError", payload);
    },
  },
};
