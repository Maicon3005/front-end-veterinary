<template>
    <v-card>
        <v-layout>
            <side-menu></side-menu>
            <v-main style="height: 650px; padding: 20px 100px;">
                <v-row>
                    <h2>Veterinários</h2>
                    <v-divider></v-divider>
                </v-row>
                <v-row class="pa-6">
                    <v-btn to="/veterinarian/create" color="primary">Criar</v-btn>
                </v-row>
                <v-row>
                    <v-data-table :headers="headers" :items="veterinaryQuery.data.value" :items-per-page="5"
                        class="elevation-1">
                        <template v-slot:item="row">
                            <tr>
                                <td>{{ row.item.name }}</td>
                                <td>{{ row.item.crmv }}</td>
                                <td>
                                    <v-btn class="mx-1" color="orange" :to="{ path: `/veterinarian/edit/${row.item.id}` }">
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
import { veterinarianFetcher, headers } from '@/stores/veterinarian';
import { useQuery, useQueryClient } from "vue-query";
import SideMenu from '@/components/SideMenu.vue';
import { ref } from 'vue';

const carregando = ref(true);
const clientQuery = useQueryClient();
const veterinaryQuery = useQuery({
    queryKey: ['veterinarians'], queryFn: async () => await veterinarianFetcher.getAll(),
    onSuccess: () => {
        carregando.value = false
    }
})

const onDelete = async (id?: string, name?: string) => {
    const isConfirmed = confirm(`Tem certeza que deseja excluir o ${name}`);
    if (isConfirmed) {
        await api.delete(`veterinarian/${id}`);
        clientQuery.invalidateQueries({ queryKey: ['veterinarians'] });
    }
}
</script>