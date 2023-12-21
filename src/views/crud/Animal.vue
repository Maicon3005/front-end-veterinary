<template>
    <v-card>
        <v-layout>
            <v-app-bar color="primary" prominent class="pb-0">
                <v-btn to="/animal/create">Criar</v-btn>
                <v-toolbar-title>Animais</v-toolbar-title>
            </v-app-bar>
            <v-main class="pa-16">
                <v-data-table :headers="headers" :items="animalList" :items-per-page="5" class="elevation-1"
                    :loading="!animalList?.length">
                    <template v-slot:item="row">
                        <tr>
                            <td>{{ row.item.id }}</td>
                            <td>{{ row.item.name }}</td>
                            <td>{{ row.item.race }}</td>
                            <td>{{ row.item.age }}</td>
                            <td>{{ row.item.size }}</td>
                            <td>
                                <v-btn class="mx-1" color="orange" :to="{ path: `/animal/edit/${row.item.id}` }">
                                    EDITAR
                                </v-btn>
                                <v-btn class="mx-1" color="red" @Click="onDelete(row.item.id, row.item.name)">
                                    EXCLUIR
                                </v-btn>
                            </td>
                        </tr>
                    </template>
                </v-data-table>
            </v-main>
        </v-layout>
    </v-card>
</template>

<script setup lang="ts">
import { api } from '@/services/axios';
import { AnimalSchemaType, headers } from '@/stores/animal'
import { ref } from 'vue';
import { useQuery, useQueryClient } from "vue-query";

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