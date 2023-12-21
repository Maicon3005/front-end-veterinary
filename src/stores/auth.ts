import { ref } from "vue";
import { defineStore } from "pinia"
import router from '@/router';
import { api } from "@/services/axios";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    token: ref(localStorage.getItem("token")),
    returnUrl: "/dashboard" as string,
  }),
  actions: {
    async login(email: string, password: string) {
      const response = await api.post<string>("/auth/login", { email, password });

      const token = response.data;
      localStorage.setItem("token", token);
      this.token = token;

      router.push('/dashboard');
    },
    logout() {
      this.token = null;
      localStorage.removeItem("token");
      router.push('/account/login');
    }
  }
});