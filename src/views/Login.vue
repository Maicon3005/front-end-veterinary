<template>
  <v-container>
    <v-alert v-show="errorData.hasError" density="compact" type="error" title="Ocorreu um erro"
      :text="errorData.message"></v-alert>
    <v-form @submit="onSubmit">
      <v-row align="center" justify="center">
        <v-col cols="12" sm="10">
          <v-window v-model="step">
            <v-window-item :value="1">
              <v-row>
                <v-col cols="12" md="6">
                  <v-card-text class="mt-12">
                    <h4 class="text-center">Login</h4>
                    <v-row align="center" justify="center">
                      <v-col cols="12" sm="8">
                        <v-text-field v-model="email" v-bind="emailProps" label="Digite seu e-mail" type="email" outlined
                          dense color="blue" autocomplete="false" class="mt-16" />
                        <v-text-field v-model="password" v-bind="passwordProps" label="Digite sua senha" outlined dense
                          color="blue" autocomplete="false" type="password" />
                        <v-btn color="blue" type="submit" dark block tile>ENTRAR</v-btn>
                      </v-col>
                    </v-row>
                  </v-card-text>
                </v-col>
                <v-col cols="12" md="6" class="blue rounded-bl-xl">
                  <div style="  text-align: center; padding: 180px 0;">
                    <v-card-text class="white--text">
                      <h3 class="text-center ">Ainda não tem uma conta?</h3>
                      <h6 class="text-center">Clique em cadastrar e crie uma contra</h6>
                    </v-card-text>
                    <div class="text-center">
                      <v-btn tile outlined dark @click="step++">CADASTRAR</v-btn>
                    </div>
                  </div>
                </v-col>
              </v-row>
            </v-window-item>
            <v-window-item :value="2">
              <v-row>
                <v-col cols="12" md="6" class="blue rounded-br-xl">
                  <div style="  text-align: center; padding: 180px 0;">
                    <v-card-text class="white--text">
                      <h3 class="text-center ">Já possui uma contra?</h3>
                      <h6 class="text-center">Clique em entrar para acessar sua conta</h6>
                    </v-card-text>
                    <div class="text-center">
                      <v-btn tile outlined dark @click="step--">ENTRAR</v-btn>
                    </div>
                  </div>
                </v-col>
                <v-col cols="12" md="6">
                  <v-card-text class="mt-12">
                    <h4 class="text-center">Crie uma conta</h4>
                    <v-row align="center" justify="center">
                      <v-col cols="12" sm="8">
                        <v-text-field v-model="email" v-bind="emailProps" label="Digite seu e-mail" outlined dense
                          color="blue" autocomplete="false" />
                        <v-text-field v-model="password" v-bind="passwordProps" label="Digite uma senha" outlined dense
                          color="blue" autocomplete="false" type="password" />
                        <v-text-field v-model="confirmPassword" v-bind="confirmPasswordProps" label="Confirme sua senha"
                          outlined dense color="blue" autocomplete="false" type="password" />
                        <v-btn color="blue" type="submit" dark block tile>CADASTRAR</v-btn>
                      </v-col>
                    </v-row>
                  </v-card-text>
                </v-col>
              </v-row>
            </v-window-item>
          </v-window>
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>

<script setup lang="ts">

import { useForm } from 'vee-validate';
import * as yup from 'yup';
import { useAuthStore } from '@/stores/auth';
import { ref, watch } from 'vue';
import { api } from '@/services/axios';
import axios from 'axios';
import ProblemDetails from '@/interfaces/ProblemDetails';

const PAGE_LOGIN_ID = 0;
const step = ref<number>(0);
const errorData = ref({ hasError: false as boolean, message: '' as string });

const schema = yup.object().shape({
  email: yup.string().required(),
  password: yup.string().required(),
  confirmPassword: yup.string(),
});

type SchemaType = yup.InferType<typeof schema>;

const { defineField, handleSubmit } = useForm<SchemaType>({
  validationSchema: schema,
});

const vuetifyConfig = (state: any) => ({
  props: {
    'error-messages': state.errors,
  },
});

watch(step, () => {
  errorData.value.hasError = false;
  errorData.value.message = '';
})

const [email, emailProps] = defineField<'email'>('email', vuetifyConfig);
const [password, passwordProps] = defineField<'password'>('password', vuetifyConfig);
const [confirmPassword, confirmPasswordProps] = defineField<'confirmPassword'>('confirmPassword', vuetifyConfig);

const onSubmit = handleSubmit(async (values) => {
  try {
    if (step.value == PAGE_LOGIN_ID) {
      await useAuthStore().login(values.email, values.password);
    } else {
      await api.post('/auth', { email: values.email, password: values.password, confirmPassword: values.confirmPassword });
    }
  } catch (error: unknown) {
    errorData.value.hasError = true;
    if (axios.isAxiosError<ProblemDetails>(error)) {
      errorData.value.message = error.response?.data.title!;
      console.log(error);

      return;
    }
    errorData.value.message = 'Ocorreu um erro inesperado';
  }
});

</script>