import { AlertInterface } from "@/interfaces/Alert";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useAlertStore = defineStore("alert", {
    state: () => ({
        alert: ref<AlertInterface>({
            title: '',
            message: '',
            type: 'success'
        }),
        hasMessage: false
    }),
    actions: {
        success(message: string) {
            this.alert = { title: 'Sucesso!', message, type: 'success' };
            this.hasMessage = true;
        },
        error(message: string) {
            this.alert = { title: 'Erro!', message, type: 'error' };
            this.hasMessage = true;
        },
        clear() {
            this.alert = {
                title: '',
                message: '',
                type: 'success'
            };
            this.hasMessage = false;
        }
    }
});