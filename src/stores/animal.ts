import { api } from '@/services/axios';
import { defineStore } from 'pinia';
import * as yup from 'yup';

const possibleAnimalSizes = [
    {
        value: 0,
        label: 'Pequeno',
    },
    {
        value: 1,
        label: 'Médio',
    },
    {
        value: 2,
        label: 'Grande',
    },
];

const headers = [
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

const animalSchema = yup.object({
    id: yup.string().uuid(),
    creationTime: yup.date(),
    name: yup.string().required().label('Name'),
    age: yup.number(),
    race: yup.string(),
    size: yup.mixed().oneOf(possibleAnimalSizes.map((x) => x.value)),
});

type AnimalSchemaType = yup.InferType<typeof animalSchema>;

const animalsFetcher = {
    async create(values: AnimalSchemaType) {
        await api.post('animal', values);
    },
    async edit(values: AnimalSchemaType) {
        await api.put(`animal/${values.id}`, values);
    },
    async getAll() {
        return (await api.get<AnimalSchemaType[]>('animal')).data;
    }
}

export { type AnimalSchemaType, animalSchema, animalsFetcher, possibleAnimalSizes, headers };