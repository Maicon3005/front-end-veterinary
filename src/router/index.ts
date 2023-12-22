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
  {
    path: "/veterinarian",
    name: "veterinarian",
    component: () => import("@/views/crud/Veterinarian.vue"),
  },
  {
    path: "/veterinarian/create",
    name: "createVeterinarian",
    component: () => import("@/views/crud/CreateVeterinarian.vue"),
  },
  {
    path: "/veterinarian/edit/:idVeterinarian",
    name: "editVeterinarian",
    component: () => import("@/views/crud/EditVeterinarian.vue"),
  },
  {
    path: "/treatment",
    name: "treatment",
    component: () => import("@/views/crud/Treatment.vue"),
  },
  {
    path: "/treatment/create",
    name: "createTreatment",
    component: () => import("@/views/crud/CreateTreatment.vue"),
  },
  {
    path: "/treatment/edit/:idTreatment",
    name: "editTreatment",
    component: () => import("@/views/crud/editTreatment.vue"),
  },
  { path: '/:pathMatch(.*)*', redirect: '/account/login' }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

const pathsPublicPages = ['login'];

router.beforeEach(async (to) => {
  const alertStore = useAlertStore();
  alertStore.clear();

  const authRequired = !pathsPublicPages.includes(to.path);
  const authStore = useAuthStore();
  const userIsLogged = authRequired && authStore.token != null;
  const toIsLoginPage = to.name === 'login';

  if (!toIsLoginPage && !userIsLogged) {
    authStore.returnUrl = to.fullPath;
    return '/account/login';
  }

  if (toIsLoginPage && userIsLogged) {
    return '/dashboard';
  }
});

export default router
