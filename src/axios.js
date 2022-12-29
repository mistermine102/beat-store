import axios from "axios";
import store from "./stores/index.js";

export default function setup() {
  axios.defaults.baseUrl = "http://localhost:3000";
  axios.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (err) => {
      return Promise.reject(err);
    }
  );
}
