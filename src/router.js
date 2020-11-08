import { createRouter, createWebHashHistory } from "vue-router";
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
  history: createWebHashHistory(),
  routes,
});

export default router;