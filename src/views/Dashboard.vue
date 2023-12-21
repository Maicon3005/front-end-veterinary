<template>
    <v-card>
        <v-layout>
            <side-menu></side-menu>
            <v-main style="height: 650px; padding: 20px 80px;"><v-row>
                    <h2>Dashboard</h2>
                    <v-divider></v-divider>
                    <v-banner-text>
                        Teste de consumo de API com <b>Vuetify</b>
                    </v-banner-text>
                </v-row>
            </v-main>
        </v-layout>
    </v-card>
</template>

<script setup lang="ts">

import SideMenu from '@/components/SideMenu.vue';

</script>