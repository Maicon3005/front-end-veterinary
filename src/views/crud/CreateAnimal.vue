<template>
    <v-card>
        <v-layout>
            <v-app-bar color="primary" prominent>
                <v-toolbar-title>Criar Animal</v-toolbar-title>
            </v-app-bar>

            <v-main style="height: 600px;">
                <v-card-text>
                    <animal-form @submit="onSubmit"></animal-form>
                </v-card-text>
            </v-main>
        </v-layout>
    </v-card>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router';
import { AnimalSchemaType, useAnimalStore } from '@/stores/animal';
import AnimalForm from '@/components/AnimalForm.vue';

const animalStore = useAnimalStore();
const router = useRouter();

const onSubmit = async (values: AnimalSchemaType) => {
    animalStore.create(values);
    router.push('/animals');
};
</script>