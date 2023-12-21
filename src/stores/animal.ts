import { api } from '@/services/axios';
import { defineStore } from 'pinia';
import * as yup from 'yup';

const possibleAnimalSizes = [
    {
        value: 0,
        label: 'Small',
    },
    {
        value: 1,
        label: 'Medium',
    },
    {
        value: 2,
        label: 'Big',
    },
];

const animalSchema = yup.object({
    id: yup.string().uuid(),
    creationTime: yup.date(),
    name: yup.string().required().label('Name'),
    age: yup.number(),
    race: yup.string(),
    size: yup.mixed().oneOf(possibleAnimalSizes.map((x) => x.value)),
});

type AnimalSchemaType = yup.InferType<typeof animalSchema>;

interface State {
    animals: AnimalSchemaType[];
}

const headers = [{
    title: 'ID',
    key: 'id',
},
{
    title: 'Nome',
    key: 'name',
},
{
    title: 'Raça',
    key: 'race',
},
{
    title: 'Idade',
    key: 'age',
},
{
    title: 'Tamanho',
    key: 'size',
},
{
    title: '-',
    key: 'buttons'
}]

const useAnimalStore = defineStore('animal', {
    state: (): State => ({
        animals: [],
    }),

    getters: {},

    actions: {
        async create(values: AnimalSchemaType) {
            await api.post('animal', values);
        },
        async edit(values: AnimalSchemaType) {
            await api.put(`animal/${values.id}`, values);
        },
    },
});

export { type AnimalSchemaType, animalSchema, useAnimalStore, possibleAnimalSizes, headers };