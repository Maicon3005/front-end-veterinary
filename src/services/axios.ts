import axios, { AxiosInstance } from 'axios';
import { createVuetify } from 'vuetify';

declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
        $axios: AxiosInstance;
        $api: AxiosInstance;
    }
}

const api = axios.create({ baseURL: 'https://localhost:44383/api/' });

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    config.headers.Authorization = token ? `Bearer ${token}` : '';
    return config;
});

export default createVuetify({
    defaults: {
        global: {
            axios: axios,
            api: api
        },
    },
})

export { api };