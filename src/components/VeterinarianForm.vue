<template>
    <v-form @submit="onSubmit">
        <v-row align="center" justify="center">
            <v-col cols="12" sm="10">
                <v-row>
                    <v-col cols="12" md="6">
                        <v-text-field v-model="name" v-bind="nameProps" label="Digite o nome" type="text" outlined dense
                            color="blue" autocomplete="false" class="mt-8" required />
                        <v-text-field v-model="crmv" v-bind="crmvProps" label="Digite a CRMV" type="text" outlined dense
                            color="blue" autocomplete="false" required></v-text-field>
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
import { watch } from 'vue'
import { VeterinarianSchemaType, veterinarianSchema } from '@/stores/veterinarian';

const props = defineProps<{
    defaultVeterinarian?: VeterinarianSchemaType;
}>();

const emit = defineEmits<{
    submit: [VeterinarianSchemaType];
}>();

const { defineField, handleSubmit, resetForm, setValues } = useForm<VeterinarianSchemaType>({
    validationSchema: veterinarianSchema,
});

watch(props, (newProps) => {
    if (newProps.defaultVeterinarian) {
        setValues(newProps.defaultVeterinarian);
    }
})

const vuetifyConfig = (state: any) => ({
    props: {
        'error-messages': state.errors,
    },
});

const onSubmit = handleSubmit((values) => {
    emit('submit', values);
});

const [name, nameProps] = defineField<'name'>('name', vuetifyConfig);
const [crmv, crmvProps] = defineField<'crmv'>('crmv', vuetifyConfig);

</script>