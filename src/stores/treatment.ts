import { api } from '@/services/axios';
import { defineStore } from 'pinia';
import * as yup from 'yup';
import { useVeterinarianStore, VeterinarianSchemaType, veterinarianSchema } from '@/stores/veterinarian';

const treatmentSchema = yup.object({
    id: yup.string().uuid(),
    creationDate: yup.date(),
    veterinarianId: yup.string().uuid(),
    animalId: yup.string().uuid(),
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
        //veterinarianList = await useVeterinarianStore().getAllVeterinarians();
    },

    actions: {
        async create(values: TreatmentSchemaSchemaType) {
            await api.post('treatment', values);
        },
        async edit(values: TreatmentSchemaSchemaType) {
            await api.put(`treatment/${values.id}`, values);
        },
    },
});

export { type TreatmentSchemaSchemaType, treatmentSchema, useTreatmentStore };