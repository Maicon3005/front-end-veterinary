import { ref } from "vue";
import { defineStore } from "pinia"
import router from '@/router';
import { api } from "@/services/axios";
import { useAlertStore } from "./alert";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    token: ref(localStorage.getItem("token")),
    returnUrl: "/dashboard" as string,
  }),
  actions: {
    async login(email: string, password: string) {
      try {
        const response = await api.post("/auth/login", { email, password });
        const token = response.data;
        localStorage.setItem("token", token);
        router.push('/dashboard');
      } catch (error: unknown) {
        useAlertStore().error('Ocorreu um erro inesperado');
      }
    },
    logout() {
      this.token = null;
      localStorage.removeItem("token");
      router.push('/account/login');
    }
  }
});