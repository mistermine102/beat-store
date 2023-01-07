import axios from "axios";
import store from "./stores/index.js";

export default function setup() {
  axios.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (err) => {
      console.log("AXIOS REQUEST ERROR, CHECK axios.js");
      return Promise.reject(err);
    }
  );
  axios.interceptors.response.use(
    (config) => config,
    (err) => {
      const newErr = {
        status: err.response.status,
        message: err.response.data,
      };
      store.dispatch("setError", newErr);
    }
  );
}
