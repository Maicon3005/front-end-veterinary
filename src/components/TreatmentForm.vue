<template>
    <v-form @submit="onSubmit">
        <v-row align="center" justify="center">
            <v-col cols="12" sm="10">
                <v-row>
                    <v-col cols="12" md="6">
                        <v-select :items="defaultVeterinarians" v-bind="veterinarianIdProps" :item-text="'name'"
                            :item-value="'id'" :item-title="'name'" v-model="veterinarianId" name="selectedVeterinary"
                            label="Veterinários" outlined dense color="blue">
                        </v-select>
                        <v-select :items="defaultAnimals" v-bind="animaldProps" :item-text="'name'" :item-value="'id'"
                            :item-title="'name'" v-model="animalId" name="selectedAnimal" label="Animais" outlined dense
                            color="blue">
                        </v-select>
                        <v-textarea v-model="recipe" v-bind="recipeProps" label="Digite o tratamento" type="text" outlined
                            dense color="blue" autocomplete="false" class="mt-8" required>
                        </v-textarea>
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
import { TreatmentSchemaSchemaType, treatmentSchema } from '@/stores/treatment';
import { VeterinarianSchemaType } from '@/stores/veterinarian';
import { AnimalSchemaType } from '@/stores/animal';

const props = defineProps<{
    defaultVeterinarians?: VeterinarianSchemaType[];
    defaultAnimals?: AnimalSchemaType[];
}>();

const emit = defineEmits<{
    submit: [TreatmentSchemaSchemaType];
}>();

const { defineField, handleSubmit } = useForm<TreatmentSchemaSchemaType>({
    validationSchema: treatmentSchema,
});

const onSubmit = handleSubmit((values) => {
    emit('submit', values);
});

const vuetifyConfig = (state: any) => ({
    props: {
        'error-messages': state.errors,
    },
});

const [veterinarianId, veterinarianIdProps] = defineField<'veterinarianId'>('veterinarianId', vuetifyConfig);
const [animalId, animaldProps] = defineField<'animalId'>('animalId', vuetifyConfig);
const [recipe, recipeProps] = defineField<'recipe'>('recipe', vuetifyConfig);
</script>