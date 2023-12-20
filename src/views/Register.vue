<template>
    <v-form @submit="onSubmit" class="px-4">
        <v-text-field v-model="email" v-bind="emailProps" label="Digite seu e-mail" type="email" />
        <v-text-field v-model="password" v-bind="passwordProps" label="Digite uma senha" type="password" />
        <v-text-field v-model="confirmPassword" v-bind="confirmPasswordProps" label="Confirme sua senha" type="password" />
        <v-btn color="gray" type="submit" to="/account/login"> CANCELAR </v-btn>
        <v-btn color="primary" type="submit"> REGISTRAR </v-btn>
        <v-alert v-show="alertMessage.hasMessage" v-bind:title="alertMessage.alert.title"
            v-bind:type="alertMessage.alert.type" v-text="alertMessage.alert.message">
        </v-alert>
    </v-form>
</template>
  
<script setup lang="ts">

import { useForm } from 'vee-validate';
import * as yup from 'yup';
import router from '@/router';
import { api } from '@/services/axios';
import { useAlertStore } from '@/stores/alert';

const schema = yup.object().shape({
    email: yup.string().required(),
    password: yup.string().required(),
    confirmPassword: yup.string().required(),
});

type SchemaType = yup.InferType<typeof schema>;

const { defineField, handleSubmit } = useForm<SchemaType>({
    validationSchema: schema,
});

const alertMessage = useAlertStore();

const vuetifyConfig = (state: any) => ({
    props: {
        'error-messages': state.errors,
    },
});

const [email, emailProps] = defineField<'email'>('email', vuetifyConfig);
const [password, passwordProps] = defineField<'password'>('password', vuetifyConfig);
const [confirmPassword, confirmPasswordProps] = defineField<'confirmPassword'>('confirmPassword', vuetifyConfig);

const onSubmit = handleSubmit(async (values) => {
    try {
        await api.post('/auth', { email: values.email, password: values.password, confirmPassword: values.confirmPassword });
        router.push('/account/login');
    } catch (error: unknown) {
        alertMessage.error('Ocorreu um erro ao criar usuário!');
    }
});
</script>