<template>
    <v-form @submit="onSubmit">
        <v-row align="center" justify="center">
            <v-col cols="12" sm="10">
                <v-row>
                    <v-col cols="12" md="6">
                        <v-input type="hidden" v-bind="idProps" v-model="id" name="id" />
                        <v-select :items="toValue(defaultVeterinarians)" v-bind="veterinarianIdProps" :item-text="'name'"
                            :item-value="'id'" :item-title="'name'" v-model="veterinarianId" name="selectedVeterinary"
                            label="Veterinários" outlined dense color="blue">
                        </v-select>
                        <v-select :items="toValue(defaultAnimals)" v-bind="animaldProps" :item-text="'name'"
                            :item-value="'id'" :item-title="'name'" v-model="animalId" name="selectedAnimal" label="Animais"
                            outlined dense color="blue">
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
import { TreatmentSchemaType, treatmentSchema } from '@/stores/treatment';
import { VeterinarianSchemaType } from '@/stores/veterinarian';
import { AnimalSchemaType } from '@/stores/animal';
import { MaybeRef, toValue, watch } from 'vue';

const props = defineProps<{
    defaultVeterinarians?: MaybeRef<VeterinarianSchemaType[] | undefined>;
    defaultAnimals?: MaybeRef<AnimalSchemaType[] | undefined>;
    defaultTreatment?: TreatmentSchemaType;
}>();

const emit = defineEmits<{
    submit: [TreatmentSchemaType];
}>();

const { defineField, handleSubmit } = useForm<TreatmentSchemaType>({
    validationSchema: treatmentSchema,
});

watch(props, (newProps) => {
    if (newProps.defaultTreatment) {
        console.log('dentro watch');
        console.log(newProps);

        id.value = newProps.defaultTreatment.id;
        creationDate.value = newProps.defaultTreatment.creationDate;
        animalId.value = newProps.defaultTreatment.animalId;
        veterinarianId.value = newProps.defaultTreatment.veterinarianId;
        recipe.value = newProps.defaultTreatment.recipe;

        console.log(newProps);
    }
})

const onSubmit = handleSubmit((values) => {
    emit('submit', values);
});

const vuetifyConfig = (state: any) => ({
    props: {
        'error-messages': state.errors,
    },
});

let [id, idProps] = defineField<'id'>('id', vuetifyConfig);
let [creationDate] = defineField<'creationDate'>('creationDate', vuetifyConfig);
let [veterinarianId, veterinarianIdProps] = defineField<'veterinarianId'>('veterinarianId', vuetifyConfig);
let [animalId, animaldProps] = defineField<'animalId'>('animalId', vuetifyConfig);
let [recipe, recipeProps] = defineField<'recipe'>('recipe', vuetifyConfig);
</script>