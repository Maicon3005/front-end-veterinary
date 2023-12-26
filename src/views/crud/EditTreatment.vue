<template>
    <v-card>
        <v-layout>
            <side-menu></side-menu>
            <v-main style="height: 650px; padding: 20px 100px;">
                <h2>Editar Receita</h2>
                <v-divider></v-divider>
                <v-card-text>
                    <treatment-form :default-treatment="treatmentEdit" :default-veterinarians="veterinarianQuery.data"
                        :default-animals="animalQuery.data" @submit="mutateAsync"></treatment-form>
                </v-card-text>
            </v-main>
        </v-layout>
    </v-card>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { TreatmentSchemaType, treatmentFetcher } from '@/stores/treatment';
import TreatmentForm from '@/components/TreatmentForm.vue';
import SideMenu from '@/components/SideMenu.vue';
import { ref } from 'vue';
import { api } from '@/services/axios';
import { useMutation, useQuery, useQueryClient } from 'vue-query';
import { veterinarianFetcher } from '@/stores/veterinarian';
import { animalsFetcher } from '@/stores/animal';

const queryClient = useQueryClient();
const router = useRouter();
const route = useRoute();

const idTreatment = route.params.idTreatment;
const treatmentEdit = ref<TreatmentSchemaType>();

(async () => {
    const res = await api.get<TreatmentSchemaType>(`/treatment/${idTreatment}`);
    treatmentEdit.value = res.data;
})()

const veterinarianQuery = useQuery({
    queryKey: ['veterinarians'], queryFn: async () => await veterinarianFetcher.getAll()
})

const animalQuery = useQuery({
    queryKey: ['animals'], queryFn: async () => await animalsFetcher.getAll()
})

const { mutateAsync } = useMutation({
    mutationFn: (values: TreatmentSchemaType) => treatmentFetcher.edit(values),
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['treatment'] });
        router.push('/treatment');
    }
});
</script>