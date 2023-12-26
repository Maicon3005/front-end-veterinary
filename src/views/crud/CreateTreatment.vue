<template>
    <v-card>
        <v-layout>
            <side-menu></side-menu>
            <v-main style="height: 650px; padding: 20px 100px">
                <h2>Criar Tratamento</h2>
                <v-divider></v-divider>
                <v-card-text>
                    <treatment-form :default-veterinarians="veterinarianQuery.data" :default-animals="animalQuery.data"
                        @submit="mutateAsync"></treatment-form>
                </v-card-text>
            </v-main>
        </v-layout>
    </v-card>
</template>

<script lang="ts" setup>

import { useRouter } from 'vue-router';
import TreatmentForm from '@/components/TreatmentForm.vue';
import SideMenu from '@/components/SideMenu.vue';
import { TreatmentSchemaSchemaType, treatmentFetcher } from '@/stores/treatment';
import { veterinarianFetcher } from '@/stores/veterinarian';
import { animalsFetcher } from '@/stores/animal';
import { useMutation, useQuery, useQueryClient } from 'vue-query';

const queryClient = useQueryClient();
const router = useRouter();

const veterinarianQuery = useQuery({
    queryKey: ['veterinarians'], queryFn: async () => await veterinarianFetcher.getAll()
})

const animalQuery = useQuery({
    queryKey: ['animals'], queryFn: async () => await animalsFetcher.getAll()
})

const { mutateAsync } = useMutation({
    mutationFn: (values: TreatmentSchemaSchemaType) => treatmentFetcher.create(values),
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['treatment'] });
        router.push('/treatment');
    }
});
</script>