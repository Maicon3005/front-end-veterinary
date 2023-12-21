<template>
    <v-card>
        <v-layout>
            <side-menu></side-menu>
            <v-main style="height: 650px; padding: 20px 100px">
                <h2>Criar Tratamento</h2>
                <v-divider></v-divider>
                <v-card-text>
                    <!-- <treatment-form @submit="onSubmit"></treatment-form> -->
                </v-card-text>
            </v-main>
        </v-layout>
    </v-card>
</template>

<script lang="ts" setup>

import { useRouter } from 'vue-router';
import { AnimalSchemaType, useAnimalStore } from '@/stores/animal';
import TreatmentForm from '@/components/TreatmentForm.vue';
import SideMenu from '@/components/SideMenu.vue';

const animalStore = useAnimalStore();
const router = useRouter();

const onSubmit = async (values: AnimalSchemaType) => {
    animalStore.create(values);
    router.push('/animals');
};
</script>