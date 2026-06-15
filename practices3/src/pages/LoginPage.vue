<template>
  <q-page class="q-pa-md flex flex-center">
    <q-card style="width: 400px; max-width: 90vw">
      <q-card-section>
        <div class="text-h5 text-weight-bold text-center q-mb-md">Вход в систему</div>

        <q-form @submit.prevent="onSubmit">
          <q-input
            v-model="username"
            label="Имя пользователя"
            outlined
            clearable
            :rules="[val => !!val || 'Введите имя пользователя']"
            lazy-rules
            class="q-mb-md"
            autocomplete="username"
          />

          <q-input
            v-model="password"
            label="Пароль"
            type="password"
            outlined
            clearable
            :rules="[val => !!val || 'Введите пароль']"
            lazy-rules
            class="q-mb-md"
            autocomplete="current-password"
          />

          <div v-if="loginError" class="text-negative text-center q-mb-sm">
            {{ loginError }}
          </div>

          <q-btn
            type="submit"
            label="Войти"
            color="primary"
            unelevated
            class="full-width q-mb-sm"
            :loading="isLoading"
            :disable="!isFormValid"
          />

          <div class="text-center text-caption text-grey-6">
            Демо: admin / admin
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useUserStore } from '../stores/userStore'

const router = useRouter()
const route = useRoute()
const userStore = useUserStore()

const username = ref('')
const password = ref('')
const loginError = ref('')

const isLoading = computed(() => userStore.loading)
const isFormValid = computed(() => username.value.trim().length > 0 && password.value.length > 0)

const onSubmit = async (): Promise<void> => {
  loginError.value = ''

  const success = await userStore.login(username.value.trim(), password.value)

  if (success) {
    const redirect = (route.query.redirect as string) || '/'
    router.push(redirect)
  } else {
    loginError.value = 'Неверное имя пользователя или пароль'
  }
}
</script>