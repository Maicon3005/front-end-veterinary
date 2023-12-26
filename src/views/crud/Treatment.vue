<template>
    <v-card>
        <v-layout>
            <side-menu></side-menu>
            <v-main style="height: 650px; padding: 20px 100px;">
                <v-row>
                    <h2>Receitas</h2>
                    <v-divider></v-divider>
                </v-row>
                <v-row class="pa-6">
                    <v-btn to="/treatment/create" color="primary">Criar</v-btn>
                </v-row>
                <v-row>
                    <v-data-table :headers="headers" :items="treatmentQuery.data.value" :items-per-page="5"
                        class="elevation-1" :loading="carregando">
                        <template v-slot:item="row">
                            <tr>
                                <td>{{ row.item.veterinarian.name }}</td>
                                <td>{{ row.item.animal.name }}</td>
                                <td>{{ row.item.recipe }}</td>
                                <td>
                                    <v-btn class="mx-1" color="orange" :to="{ path: `/treatment/edit/${row.item.id}` }">
                                        <v-icon class="mr-1" icon="mdi-pencil"></v-icon>
                                    </v-btn>
                                    <v-btn class="mx-1" color="red" @Click="onDelete(row.item.id)">
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
import { headers, treatmentFetcher } from '@/stores/treatment';
import { useQuery, useQueryClient } from "vue-query";
import SideMenu from '@/components/SideMenu.vue';
import { ref } from 'vue';

const carregando = ref(true);
const clientQuery = useQueryClient();
const treatmentQuery = useQuery({
    queryKey: ['treatments'], queryFn: async () => await treatmentFetcher.getAll(),
    onSuccess: () => {
        carregando.value = false
    }
})

const onDelete = async (id?: string) => {
    const isConfirmed = confirm(`Tem certeza que deseja excluir a receita?`);
    if (isConfirmed) {
        await api.delete(`treatment/${id}`);
        clientQuery.invalidateQueries({ queryKey: ['treatments'] });
    }
}
</script>