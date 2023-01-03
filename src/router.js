import { createRouter, createWebHistory } from "vue-router";

import HomePage from "./pages/HomePage.vue";
import UploadPage from "./pages/UploadPage.vue";
import RegisterPage from "./pages/RegisterPage.vue";
import LoginPage from "./pages/LoginPage.vue";
import store from "./stores/index.js";

const routes = [
  { path: "/", redirect: "/home" },
  { path: "/home", component: HomePage },
  { path: "/upload", component: UploadPage, meta: { reqAuth: true } },
  { path: "/register", component: RegisterPage, meta: { reqUnAuth: true } },
  { path: "/login", component: LoginPage, meta: { reqUnAuth: true } },
  { path: "/cart", redirect: "/home" },
  { path: "/popular", redirect: "/home" },
  { path: "/:genre", component: null },
  { path: "/:beatId", component: null },
  { path: "/notFound(*)", component: null },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  //clears error before every route switch
  store.dispatch("setError", null);

  if (to.meta.reqAuth && !store.getters.isLoggedIn) {
    store.dispatch("setError", {
      message: "Must be logged to access this route",
    });
    next("/login");
  } else if (to.meta.reqUnAuth && store.getters.isLoggedIn) {
    next("/home");
  } else {
    next();
  }
});

export default router;
