<template>
    <v-card>
        <v-layout>
            <side-menu></side-menu>
            <v-main style="height: 650px; padding: 20px 100px;">
                <h2>Editar Veterinário</h2>
                <v-divider></v-divider>
                <v-card-text>
                    <veterinarian-form :default-veterinarian="veterinarianEdit" @submit="mutateAsync"></veterinarian-form>
                </v-card-text>
            </v-main>
        </v-layout>
    </v-card>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { VeterinarianSchemaType, veterinarianFetcher } from '@/stores/veterinarian';
import VeterinarianForm from '@/components/VeterinarianForm.vue';
import SideMenu from '@/components/SideMenu.vue';
import { ref } from 'vue';
import { api } from '@/services/axios';
import { useMutation, useQueryClient } from 'vue-query';

const router = useRouter();
const route = useRoute();
const queryClient = useQueryClient();
const veterinarianId = route.params.idVeterinarian;

const veterinarianEdit = ref<VeterinarianSchemaType>();

(async () => {
    const res = await api.get<VeterinarianSchemaType>(`/veterinarian/${veterinarianId}`);
    veterinarianEdit.value = res.data;
})()

const { mutateAsync } = useMutation({
    mutationFn: (values: VeterinarianSchemaType) => veterinarianFetcher.edit(values),
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['veterinarian'] });
        router.push('/veterinarian');
    }
});
</script>