<template>
    <v-navigation-drawer expand-on-hover rail color="primary">
        <v-list density="compact" nav>
            <v-list-item prepend-icon="mdi-monitor-dashboard" title="Dashboard" to="/dashboard">
            </v-list-item>
            <v-list-item prepend-icon="mdi-paw" title="Animais" to="/animals">
            </v-list-item>
            <v-list-item prepend-icon="mdi-logout" title="Sair" @click="onLogout">
            </v-list-item>
        </v-list>
    </v-navigation-drawer>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore();

const onLogout = () => {
    authStore.logout();
}

</script>