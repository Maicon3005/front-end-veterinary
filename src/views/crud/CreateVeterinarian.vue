<template>
    <v-card>
        <v-layout>
            <side-menu></side-menu>
            <v-main style="height: 650px; padding: 20px 100px">
                <h2>Criar Veterinário</h2>
                <v-divider></v-divider>
                <v-card-text>
                    <veterinarian-form @submit="mutateAsync"></veterinarian-form>
                </v-card-text>
            </v-main>
        </v-layout>
    </v-card>
</template>

<script lang="ts" setup>

import { useRouter } from 'vue-router';
import { VeterinarianSchemaType, veterinarianFetcher } from '@/stores/veterinarian';
import VeterinarianForm from '@/components/VeterinarianForm.vue';
import SideMenu from '@/components/SideMenu.vue';
import { useMutation, useQueryClient } from 'vue-query';

const router = useRouter();
const queryClient = useQueryClient();

const { mutateAsync } = useMutation({
    mutationFn: (values: VeterinarianSchemaType) => veterinarianFetcher.create(values),
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['veterinarian'] });
        router.push('/veterinarian');
    }
});
</script>