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
        message: null,
        status: null,
      };

      if (!err.response) {
        newErr.message = "Can't connect to the server";
        newErr.status = 500;
        store.dispatch("setError", newErr);
        return Promise.reject(err);
      }

      newErr.message = err.response.data || "Something went wrong";
      newErr.status = err.response.status || 500;

      store.dispatch("setError", newErr);
      //Promise.reject(err);
    }
  );
}
