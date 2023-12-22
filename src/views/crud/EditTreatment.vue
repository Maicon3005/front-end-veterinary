<template>
    <v-card>
        <v-layout>
            <side-menu></side-menu>
            <v-main style="height: 650px; padding: 20px 100px;">
                <h2>Editar Receita</h2>
                <v-divider></v-divider>
                <v-card-text>
                    <treatment-form :default-treatment="treatmentEdit" :default-veterinarians="veterinarianQuery.data"
                        :default-animals="animalQuery.data" @submit="onSubmit"></treatment-form>
                </v-card-text>
            </v-main>
        </v-layout>
    </v-card>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { TreatmentSchemaSchemaType, useTreatmentStore } from '@/stores/treatment';
import { useVeterinarianStore } from '@/stores/veterinarian';
import { useAnimalStore } from '@/stores/animal';
import TreatmentForm from '@/components/TreatmentForm.vue';
import SideMenu from '@/components/SideMenu.vue';
import { ref } from 'vue';
import { api } from '@/services/axios';
import { useQuery } from 'vue-query';

const treatmentStore = useTreatmentStore();
const veterinarianStore = useVeterinarianStore();
const animalStore = useAnimalStore();

const router = useRouter();
const route = useRoute();
const idTreatment = route.params.idTreatment;

const treatmentEdit = ref<TreatmentSchemaSchemaType>();

(async () => {
    const res = await api.get<TreatmentSchemaSchemaType>(`/treatment/${idTreatment}`);
    treatmentEdit.value = res.data;
})()

const veterinarianQuery = useQuery({
    queryKey: ['veterinarians-treatment'], queryFn: async () => await veterinarianStore.getAll()
})

const animalQuery = useQuery({
    queryKey: ['aniamals-treatment'], queryFn: async () => await animalStore.getAll()
})

const onSubmit = async (values: TreatmentSchemaSchemaType) => {
    router.push('/treatment');
};
</script>