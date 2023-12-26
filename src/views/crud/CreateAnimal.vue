<template>
    <v-card>
        <v-layout>
            <side-menu></side-menu>
            <v-main style="height: 650px; padding: 20px 100px">
                <h2>Criar Animal</h2>
                <v-divider></v-divider>
                <v-card-text>
                    <animal-form @submit="mutateAsync"></animal-form>
                </v-card-text>
            </v-main>
        </v-layout>
    </v-card>
</template>

<script lang="ts" setup>

import { useRouter } from 'vue-router';
import { AnimalSchemaType, animalsFetcher } from '@/stores/animal';
import AnimalForm from '@/components/AnimalForm.vue';
import SideMenu from '@/components/SideMenu.vue';
import { useMutation, useQueryClient } from 'vue-query';

const router = useRouter();
const queryClient = useQueryClient();

const { mutateAsync } = useMutation({
    mutationFn: (values: AnimalSchemaType) => animalsFetcher.create(values),
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['animal'] });
        router.push('/animals');
    }
});
</script>