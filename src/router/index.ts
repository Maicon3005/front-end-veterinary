import { useAuthStore } from "@/stores/auth";
import { createRouter, createWebHistory } from "vue-router";
import { useAlertStore } from "@/stores/alert";

const routes = [
  {
    path: "/account/login",
    name: "login",
    component: () => import("@/views/Login.vue"),
  },
  {
    path: "/account/register",
    name: "register",
    component: () => import("@/views/Register.vue"),
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: () => import("@/views/Dashboard.vue"),
  },
  {
    path: "/animals",
    name: "animals",
    component: () => import("@/views/crud/Animal.vue"),
  },
  {
    path: "/animal/create",
    name: "createAnimal",
    component: () => import("@/views/crud/CreateAnimal.vue"),
  },
  {
    path: "/animal/edit/:idAnimal",
    name: "editAnimal",
    component: () => import("@/views/crud/EditAnimal.vue"),
  },
  { path: '/:pathMatch(.*)*', redirect: '/account/login' }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

router.beforeEach(async (to) => {
  const alertStore = useAlertStore();
  alertStore.clear();

  const publicPages = ['/account/login', '/account/register'];
  const authRequired = !publicPages.includes(to.path);
  const authStore = useAuthStore();

  if (authRequired && !authStore.token) {
    authStore.returnUrl = to.fullPath;
    return '/account/login';
  }
});

export default router
