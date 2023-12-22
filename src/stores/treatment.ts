import { api } from '@/services/axios';
import { defineStore } from 'pinia';
import * as yup from 'yup';
import { VeterinarianSchemaType, veterinarianSchema } from '@/stores/veterinarian';
import { animalSchema } from '@/stores/animal';

const headers = [
    {
        title: 'Veterinário',
        key: 'vaterinary',
    },
    {
        title: 'Animal',
        key: 'animal',
    },
    {
        title: 'Receita',
        key: 'recipe',
    },
    {
        title: '-',
        key: 'buttons'
    }]


const treatmentSchema = yup.object({
    id: yup.string().uuid(),
    creationDate: yup.date(),
    veterinarianId: yup.string().uuid(),
    veterinarian: yup.object({ name: yup.string() }),
    animalId: yup.string().uuid(),
    animal: yup.object({ name: yup.string() }),
    recipe: yup.string(),
});

type TreatmentSchemaSchemaType = yup.InferType<typeof treatmentSchema>;

interface State {
    treatments: TreatmentSchemaSchemaType[];
    veterinarianList: VeterinarianSchemaType[];
}

const useTreatmentStore = defineStore('treatment', {
    state: (): State => ({
        treatments: [],
        veterinarianList: []
    }),

    getters: {
    },

    actions: {
        async create(values: TreatmentSchemaSchemaType) {
            await api.post('treatment/', values);
        },
        async edit(values: TreatmentSchemaSchemaType) {
            console.log('teste');

            console.log(values.id);

            await api.put(`treatment/${values.id}`, values);
        },
    },
});

export { type TreatmentSchemaSchemaType, treatmentSchema, useTreatmentStore, headers };