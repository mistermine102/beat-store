import { createRouter, createWebHistory } from "vue-router";

import HomePage from "./pages/HomePage.vue";
import UploadPage from "./pages/UploadPage.vue";
import RegisterPage from "./pages/RegisterPage.vue";
import LoginPage from "./pages/LoginPage.vue";

const routes = [
  { path: "/", redirect: "/home" },
  { path: "/home", component: HomePage },
  { path: "/upload", component: UploadPage },
  { path: "/register", component: RegisterPage },
  { path: "/login", component: LoginPage },
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

export default router;
