import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "../pages/Dashboard.vue";
import ExpensesList from "../pages/ExpensesList.vue";
import MonthlyLimit from "../pages/MonthlyLimit.vue";

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
  {
    path: "/limite",
    name: "MonthlyLimit",
    component: MonthlyLimit
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
