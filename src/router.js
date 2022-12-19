import { createRouter, createWebHistory } from "vue-router";

import HomePage from "./pages/HomePage.vue"

const routes = [
  { path: "/", redirect: "/home" },
  { path: "/home", component: HomePage },
  { path: "/upload", component: null },
  { path: "/:genre", component: null },
  { path: "/:beatId", component: null },
  { path: "/notFound(*)", component: null },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
