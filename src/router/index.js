import { createRouter, createWebHistory } from "vue-router";
import ExpensesList from "../pages/ExpensesList.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: ExpensesList,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
