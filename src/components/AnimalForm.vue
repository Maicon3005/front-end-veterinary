<template>
    <v-form @submit="onSubmit">
        <v-row align="center" justify="center">
            <v-col cols="12" sm="10">
                <v-row>
                    <v-col cols="12" md="6">
                        <v-text-field v-model="name" v-bind="nameProps" label="Digite o nome" type="text" outlined dense
                            color="blue" autocomplete="false" class="mt-8" required />
                        <v-text-field v-model="age" v-bind="ageProps" label="Digite a idade" type="number" outlined dense
                            color="blue" autocomplete="false" required></v-text-field>
                        <v-text-field v-model="race" v-bind="raceProps" label="Digite a raça" type="text" outlined dense
                            color="blue" autocomplete="false" required></v-text-field>
                        <v-select label="Tamanho" :items="possibleAnimalSizes" item-title="label" v-model="size" outlined
                            dense color="blue">
                            <v-list-item v-bind="sizeProps"></v-list-item>
                        </v-select>
                        <v-row align="center" justify="center" class="pa-4">
                            <v-btn color="default" type="reset" class="ma-4">Limpar</v-btn>
                            <v-btn color="primary" type="submit">Salvar</v-btn>
                        </v-row>
                    </v-col>
                </v-row>
            </v-col>
        </v-row>
    </v-form>
</template>

<script setup lang="ts">

import { useForm } from 'vee-validate';
import { watch } from 'vue'
import { AnimalSchemaType, animalSchema, possibleAnimalSizes } from '@/stores/animal';

const props = defineProps<{
    defaultAnimal?: AnimalSchemaType;
}>();

const emit = defineEmits<{
    submit: [AnimalSchemaType];
}>();

const { defineField, handleSubmit, resetForm, setValues } = useForm<AnimalSchemaType>({
    validationSchema: animalSchema,
});

watch(props, (newProps) => {
    if (newProps.defaultAnimal) {
        setValues(newProps.defaultAnimal);
    }
})

const vuetifyConfig = (state: any) => ({
    props: {
        'error-messages': state.errors,
    },
});

const onSubmit = handleSubmit((values) => {
    emit('submit', values);
});

const [name, nameProps] = defineField<'name'>('name', vuetifyConfig);
const [age, ageProps] = defineField<'age'>('age', vuetifyConfig);
const [race, raceProps] = defineField<'race'>('race', vuetifyConfig);
const [size, sizeProps] = defineField<'size'>('size', vuetifyConfig);

</script>