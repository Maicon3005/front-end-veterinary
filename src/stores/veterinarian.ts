import { api } from '@/services/axios';
import { defineStore } from 'pinia';
import * as yup from 'yup';

const headers = [
    {
        title: 'Nome',
        key: 'name',
    },
    {
        title: 'CRMV',
        key: 'crmv',
    },
    {
        title: '-',
        key: '-',
    }]

const veterinarianSchema = yup.object({
    id: yup.string().uuid(),
    creationDate: yup.date(),
    name: yup.string().required().label('Name'),
    crmv: yup.string().required().label('CRMV'),
});

type VeterinarianSchemaType = yup.InferType<typeof veterinarianSchema>;

interface State {
    veterinarians: VeterinarianSchemaType[];
}

const useVeterinarianStore = defineStore('veterinarian', {
    state: (): State => ({
        veterinarians: [],
    }),

    getters: {},

    actions: {
        async create(values: VeterinarianSchemaType) {
            await api.post('veterinarian', values);
        },
        async edit(values: VeterinarianSchemaType) {
            await api.put(`veterinarian/${values.id}`, values);
        },
        async getAllVeterinarians() {
            return (await api.get('veterinarian/')).data;
        }
    },
});

export { type VeterinarianSchemaType, veterinarianSchema, useVeterinarianStore, headers };