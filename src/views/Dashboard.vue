<template>
    <v-card>
        <v-layout>
            <v-app-bar color="primary" prominent>
                <v-app-bar-nav-icon variant="text" @click="dropDownMenu"></v-app-bar-nav-icon>

                <v-toolbar-title>Dashboard</v-toolbar-title>
            </v-app-bar>

            <v-navigation-drawer v-model="drawer" location="bottom" temporary>
                <v-list>
                    <v-list-item>
                        <v-btn to="/animals">
                            ANIMAL
                        </v-btn>
                    </v-list-item>
                    <v-list-item>
                        <v-btn @click="logout">LOGOUT</v-btn>
                    </v-list-item>
                </v-list>
            </v-navigation-drawer>
        </v-layout>
    </v-card>
</template>

<script setup lang="ts">

import { useAuthStore } from "@/stores/auth";
import { ref } from 'vue'

let drawer = ref(false);

function dropDownMenu() {
    drawer.value = !drawer.value;
}

function logout() {
    useAuthStore().logout();
}
</script>