import { createWebHistory, createRouter } from "vue-router";
import Uploader from "@/components/Uploader.vue";
import Result from "@/components/Result.vue";

const routes = [
  {
    path: "/",
    name: "Uploader",
    component: Uploader,
  },
  {
    path: "/result",
    name: "Result",
    component: Result,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;