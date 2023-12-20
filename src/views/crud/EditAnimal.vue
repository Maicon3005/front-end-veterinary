<template>
    <v-card>
        <v-layout>
            <v-app-bar color="primary" prominent>
                <v-toolbar-title>Editar Animal</v-toolbar-title>
            </v-app-bar>

            <v-main style="height: 600px;">
                <v-card-text>
                    <animal-form :default-animal="animalEdit" @submit="onSubmit"></animal-form>
                </v-card-text>
            </v-main>
        </v-layout>
    </v-card>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { AnimalSchemaType, useAnimalStore } from '@/stores/animal';
import AnimalForm from '@/components/AnimalForm.vue';
import { ref } from 'vue';
import { api } from '@/services/axios';

const animalStore = useAnimalStore();
const router = useRouter();
const route = useRoute();
const animalId = route.params.idAnimal;

const animalEdit = ref<AnimalSchemaType>();

(async () => {
    const res = await api.get<AnimalSchemaType>(`/animal/${animalId}`);
    animalEdit.value = res.data;
})()

const onSubmit = async (values: AnimalSchemaType) => {
    await animalStore.edit(values);
    router.push('/animals');
};
</script>