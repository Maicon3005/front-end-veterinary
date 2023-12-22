<template>
    <v-card>
        <v-layout>
            <side-menu></side-menu>
            <v-main style="height: 650px; padding: 20px 100px">
                <h2>Criar Tratamento</h2>
                <v-divider></v-divider>
                <v-card-text>
                    <treatment-form :default-veterinarians="veterinarianList" :default-animals="veterinarianList"
                        @submit="onSubmit"></treatment-form>
                </v-card-text>
            </v-main>
        </v-layout>
    </v-card>
</template>

<script lang="ts" setup>

import { useRouter } from 'vue-router';
import TreatmentForm from '@/components/TreatmentForm.vue';
import SideMenu from '@/components/SideMenu.vue';
import { TreatmentSchemaSchemaType, useTreatmentStore } from '@/stores/treatment';
import { VeterinarianSchemaType, useVeterinarianStore } from '@/stores/veterinarian';
import { AnimalSchemaType, useAnimalStore } from '@/stores/animal';
import { useQuery } from 'vue-query';
import { ref } from 'vue';

const treatmentStore = useTreatmentStore();
const veterinarianStore = useVeterinarianStore();
const animalStore = useAnimalStore();
const router = useRouter();
const veterinarianList = ref<VeterinarianSchemaType[]>();

useQuery({
    queryKey: ['veterinarians-treatment'], queryFn: async () => {
        veterinarianList.value = await veterinarianStore.getAll();
    }
})

useQuery({
    queryKey: ['aniamals-treatment'], queryFn: async () => {
        veterinarianList.value = await animalStore.getAll();
    }
})

const onSubmit = async (values: TreatmentSchemaSchemaType) => {
    treatmentStore.create(values);
    router.push('/treatments');
};
</script>