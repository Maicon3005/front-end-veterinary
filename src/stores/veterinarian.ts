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

const veterinarianFetcher = {
    async create(values: VeterinarianSchemaType) {
        await api.post('veterinarian', values);
    },
    async edit(values: VeterinarianSchemaType) {
        await api.put(`veterinarian/${values.id}`, values);
    },
    async getAll() {
        return (await api.get<VeterinarianSchemaType[]>('veterinarian/')).data;
    }
}

export { type VeterinarianSchemaType, veterinarianSchema, veterinarianFetcher, headers };