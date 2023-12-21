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

const pathsPublicPages = ['login', 'register'];

router.beforeEach(async (to) => {
  const alertStore = useAlertStore();
  alertStore.clear();

  const authRequired = !pathsPublicPages.includes(to.path);
  const authStore = useAuthStore();
  const userIsLogged = authRequired && authStore.token != null;
  const toIsLoginPage = to.name === 'login';
  const toIsRegisterPage = to.name === 'register';

  if (!toIsLoginPage && !toIsRegisterPage && !userIsLogged) {
    authStore.returnUrl = to.fullPath;
    return '/account/login';
  }

  if (toIsLoginPage && userIsLogged) {
    return '/dashboard';
  }
});

export default router
