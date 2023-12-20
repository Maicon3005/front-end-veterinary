<template>
    <v-form @submit="onSubmit">
        <v-text-field v-model="name" v-bind="nameProps" label="Nome" required></v-text-field>
        <v-text-field v-model="age" v-bind="ageProps" label="Idade" required></v-text-field>
        <v-text-field v-model="race" v-bind="raceProps" label="Raça" required></v-text-field>
        <v-select label="Tamanho" :items="possibleAnimalSizes" item-title="label" v-model="size">
            <v-list-item v-bind="sizeProps"></v-list-item>
        </v-select>
        <v-btn color="default">Limpar</v-btn>
        <v-btn color="primary" type="submit">Salvar</v-btn>
    </v-form>
</template>

<script setup lang="ts">

import { useForm } from 'vee-validate';
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

if (props.defaultAnimal) setValues(props.defaultAnimal);

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