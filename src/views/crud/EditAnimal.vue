<template>
    <v-card>
        <v-layout>
            <side-menu></side-menu>
            <v-main style="height: 650px; padding: 20px 100px;">
                <h2>Editar Animal</h2>
                <v-divider></v-divider>
                <v-card-text>
                    <animal-form :default-animal="animalEdit" @submit="mutateAsync"></animal-form>
                </v-card-text>
            </v-main>
        </v-layout>
    </v-card>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { AnimalSchemaType, animalsFetcher } from '@/stores/animal';
import AnimalForm from '@/components/AnimalForm.vue';
import SideMenu from '@/components/SideMenu.vue';
import { ref } from 'vue';
import { api } from '@/services/axios';
import { useMutation, useQueryClient } from 'vue-query';

const router = useRouter();
const route = useRoute();
const queryClient = useQueryClient();

const animalId = route.params.idAnimal;
const animalEdit = ref<AnimalSchemaType>();

(async () => {
    const res = await api.get<AnimalSchemaType>(`/animal/${animalId}`);
    animalEdit.value = res.data;
})()

const { mutateAsync } = useMutation({
    mutationFn: (values: AnimalSchemaType) => animalsFetcher.edit(values),
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['animal'] });
        router.push('/animals');
    }
});
</script>