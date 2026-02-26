import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "../pages/Dashboard.vue";
import ExpensesList from "../pages/ExpensesList.vue";

const routes = [
  {
    path: "/",
    name: "Dashboard",
    component: Dashboard, 
  },
  {
    path: "/expenses",
    name: "ExpensesList",
    component: ExpensesList, 
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
