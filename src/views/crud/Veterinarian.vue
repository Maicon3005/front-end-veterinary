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
                    <v-data-table :headers="headers" :items="veterinarianList" :items-per-page="5" class="elevation-1"
                        :loading="!veterinarianList?.length">
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
import { VeterinarianSchemaType, headers } from '@/stores/veterinarian';
import { ref } from 'vue';
import { useQuery, useQueryClient } from "vue-query";
import SideMenu from '@/components/SideMenu.vue';

const veterinarianList = ref<VeterinarianSchemaType[]>();

const queryClient = useQueryClient();

useQuery({
    queryKey: ['veterinarians'], queryFn: async () => {
        const res = await api.get('veterinarian');
        veterinarianList.value = res.data;
    }
})

const onDelete = async (id?: string, name?: string) => {
    const isConfirmed = confirm(`Tem certeza que deseja excluir o ${name}`);
    if (isConfirmed) {
        await api.delete(`veterinarian/${id}`);
        queryClient.invalidateQueries({ queryKey: ['veterinarians'] });
    }
}
</script>