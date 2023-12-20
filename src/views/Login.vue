<template>
  <v-form @submit="onSubmit" class="px-4">
    <v-text-field v-model="email" v-bind="emailProps" label="Digite seu e-mail" type="email" />
    <v-text-field v-model="password" v-bind="passwordProps" label="Digite sua senha" type="password" />
    <v-btn color="gray" type="submit" to="/account/register"> REGISTRAR </v-btn>
    <v-btn color="primary" type="submit"> ENTRAR </v-btn>
    <v-alert v-show="alertMessage.hasMessage" v-bind:title="alertMessage.alert.title" v-bind:type="alertMessage.alert.type"
      v-text="alertMessage.alert.message">
    </v-alert>
  </v-form>
</template>

<script setup lang="ts">

import { useForm } from 'vee-validate';
import * as yup from 'yup';
import { useAuthStore } from '@/stores/auth';
import { useAlertStore } from '@/stores/alert';

const schema = yup.object().shape({
  email: yup.string().required(),
  password: yup.string().required(),
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

const onSubmit = handleSubmit(async (values) => {
  await useAuthStore().login(values.email, values.password);
});
</script>