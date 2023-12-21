<template>
    <v-form @submit="onSubmit">
        <v-row align="center" justify="center">
            <v-col cols="12" sm="10">
                <v-row>
                    <v-col cols="12" md="6">
                        <!-- <v-select label="Veterinário" :items="veterinarianList" item-title="label" v-model="veterinarianId"
                            outlined dense color="blue">
                            <v-list-item v-bind="veterinarianIdProps"></v-list-item>
                        </v-select> -->
                        <!-- <v-text-field v-model="name" v-bind="nameProps" label="Digite o nome" type="text" outlined dense
                            color="blue" autocomplete="false" class="mt-8" required />
                        <v-text-field v-model="age" v-bind="ageProps" label="Digite a idade" type="number" outlined dense
                            color="blue" autocomplete="false" required></v-text-field>
                        <v-text-field v-model="race" v-bind="raceProps" label="Digite a raça" type="text" outlined dense
                            color="blue" autocomplete="false" required></v-text-field>
                        <v-select label="Tamanho" :items="possibleAnimalSizes" item-title="label" v-model="size" outlined
                            dense color="blue">
                            <v-list-item v-bind="sizeProps"></v-list-item>
                        </v-select> -->
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
import { ref, watch } from 'vue';
import { TreatmentSchemaSchemaType, treatmentSchema } from '@/stores/treatment';
import { useQuery, useQueryClient } from "vue-query";

const props = defineProps<{
    defaultTreatment?: TreatmentSchemaSchemaType;
}>();

const emit = defineEmits<{
    submit: [TreatmentSchemaSchemaType];
}>();

const { defineField, handleSubmit, resetForm, setValues } = useForm<TreatmentSchemaSchemaType>({
    validationSchema: treatmentSchema,
});

watch(props, (newProps) => {
    if (newProps.defaultTreatment) {
        setValues(newProps.defaultTreatment);
    }
})

const vuetifyConfig = (state: any) => ({
    props: {
        'error-messages': state.errors,
    },
});

// (async () => {
//     veterinarianList.value = await veterinarianStore.getAllVeterinarians();
//     console.log(veterinarianList.value);
// })

const onSubmit = handleSubmit((values) => {
    emit('submit', values);
});

const [veterinarianId, veterinarianIdProps] = defineField<'veterinarianId'>('veterinarianId', vuetifyConfig);
// const [age, ageProps] = defineField<'age'>('age', vuetifyConfig);
// const [race, raceProps] = defineField<'race'>('race', vuetifyConfig);
// const [size, sizeProps] = defineField<'size'>('size', vuetifyConfig);

</script>