<template>
    <v-card>
        <v-layout>
            <side-menu></side-menu>
            <v-main style="height: 650px; padding: 20px 100px">
                <h2>Criar Veterinário</h2>
                <v-divider></v-divider>
                <v-card-text>
                    <veterinarian-form @submit="onSubmit"></veterinarian-form>
                </v-card-text>
            </v-main>
        </v-layout>
    </v-card>
</template>

<script lang="ts" setup>

import { useRouter } from 'vue-router';
import { VeterinarianSchemaType, useVeterinarianStore } from '@/stores/veterinarian';
import VeterinarianForm from '@/components/VeterinarianForm.vue';
import SideMenu from '@/components/SideMenu.vue';

const veterinarianStore = useVeterinarianStore();
const router = useRouter();

const onSubmit = async (values: VeterinarianSchemaType) => {
    veterinarianStore.create(values);
    router.push('/veterinarian');
};
</script>