import { api } from '@/services/axios';
import * as yup from 'yup';
import { VeterinarianSchemaType } from '@/stores/veterinarian';

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

type TreatmentSchemaType = yup.InferType<typeof treatmentSchema>;

const treatmentFetcher = {
    async create(values: TreatmentSchemaType) {
        await api.post('treatment/', values);
    },
    async edit(values: TreatmentSchemaType) {
        console.log('dentro fetcher');
        console.log(values);


        await api.put(`treatment/${values.id}`, values);
    },
    async getAll() {
        return (await api.get<TreatmentSchemaType[]>('treatment/detailed')).data;
    }
}

export { type TreatmentSchemaType, treatmentSchema, treatmentFetcher, headers };