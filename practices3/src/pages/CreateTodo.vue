<template>
  <q-page padding class="q-pa-md ">
    <div class="text-h6 flex flex-center">Создать задачу</div>

    <q-form ref="formRef" @submit.prevent="onSubmit">

      <q-input
        v-model="title"
        label="Название задачи"
        outlined
        clearable
        :rules="[val => !!val || 'Введите название Вашей задачи']"
        lazy-rules
        class="q-mb-md"
      />

      <div class="row q-col-gutter-sm">

        <div class="col">
          <q-btn
            type="submit"
            color="green"
            icon="add"
            label="Добавить"
            unelevated
            class="q-mr-sm"
            :disable="!isFormValid"
          />
          <q-btn
            label="Отмена"
            color="red"
            icon="cancel"
            unelevated
            to="/"
          />
        </div>
      </div>

    </q-form>
  </q-page>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useTodoStore } from '@/stores/todoStore'

const title = ref('')
const formRef = ref()

const store = useTodoStore();

const emit = defineEmits<{
  (e: 'add-todo', value: string): void
}>()

const isFormValid = computed(() => {
  return title.value?.trim().length ?? 0 > 0
})

const onSubmit = async () => {

  console.log('submit handler');

  const isValid = await formRef.value.validate()

  if (!isValid) return

  store.addTodo(title.value.trim());
  title.value = '';

  formRef.value.resetValidation();
}

</script>