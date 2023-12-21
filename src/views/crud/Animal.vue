<template>
    <v-card>
        <v-layout>
            <side-menu></side-menu>
            <v-main style="height: 650px; padding: 20px 100px;">
                <v-row>
                    <h2>Animais</h2>
                    <v-divider></v-divider>
                </v-row>
                <v-row class="pa-6">
                    <v-btn to="/animal/create" color="primary">Criar</v-btn>
                </v-row>
                <v-row>
                    <v-data-table :headers="headers" :items="animalList" :items-per-page="5" class="elevation-1"
                        :loading="!animalList?.length">
                        <template v-slot:item="row">
                            <tr>
                                <td>{{ row.item.name }}</td>
                                <td>{{ row.item.race }}</td>
                                <td>{{ row.item.age }}</td>
                                <td>{{ possibleAnimalSizes.find(size => size.value === row.item.size)?.label }}</td>
                                <td>
                                    <v-btn class="mx-1" color="orange" :to="{ path: `/animal/edit/${row.item.id}` }">
                                        <v-icon class="mr-1" icon="mdi-pencil"></v-icon>
                                    </v-btn>
                                    <v-btn class="mx-1" color="red" @Click="onDelete(row.item.id, row.item.name)">
                                        <v-icon class="mr-1" icon="mdi-delete"></v-icon>
                                    </v-btn>
                                </td>
                            </tr>
                        </template>
                    </v-data-table>
                </v-row>
            </v-main>
        </v-layout>
    </v-card>
</template>

<script setup lang="ts">
import { api } from '@/services/axios';
import { AnimalSchemaType, headers, possibleAnimalSizes } from '@/stores/animal';
import { ref } from 'vue';
import { useQuery, useQueryClient } from "vue-query";
import SideMenu from '@/components/SideMenu.vue';

const animalList = ref<AnimalSchemaType[]>();

const queryClient = useQueryClient();

useQuery({
    queryKey: ['todos'], queryFn: async () => {
        const res = await api.get('animal');
        animalList.value = res.data;
    }
})

const onDelete = async (id?: string, name?: string) => {
    const isConfirmed = confirm(`Tem certeza que deseja excluir o ${name}`);
    if (isConfirmed) {
        await api.delete(`animal/${id}`);
        queryClient.invalidateQueries({ queryKey: ['todos'] });
    }
}
</script>