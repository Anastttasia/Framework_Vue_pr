<template>

    <q-form ref="formRef" @submit.prevent="onSubmit">
        <div class="row q-col-gutter-md items-stretch">
            <div class="col">
                <q-input
                    v-model="title"
                    label="Название задачи"
                    outlined
                    clearable
                    :rules="[val => !!val || 'Введите название Вашей задачи']"
                    dense
                    lazy-rules
                />
            </div>


            <div class="col-auto flex items-start q-pt-md">
                <q-btn
                    class="submit-button"
                    type="submit"
                    color="green"
                    icon="add"
                    label="Добавить"
                    unelevated
                    :disable="!isFormValid"
                />
            </div>
        </div>
    </q-form>
</template>

<script lang="ts" setup>
import { computed, ref, type Ref } from 'vue'
import { useTodoStore } from '@/stores/todoStore'
import type { TodoCreateRequest } from '@/types/todo'

const title = ref('')
const formRef = ref<InstanceType<typeof import('quasar')['QForm']>>()
const store = useTodoStore();

const emit = defineEmits<{
    (e: 'add-todo', value: string): void
}>()

const isFormValid = computed((): boolean => {
  return (title.value?.trim().length ?? 0) > 0
})

const onSubmit = async (): Promise<void> => {
  const isValid = await formRef.value?.validate()
    if (!isValid) return

    const request: TodoCreateRequest = {
        title: title.value.trim()
    }

    const success = store.addTodo(request)
    
    if (success) {
    title.value = ''
    formRef.value?.resetValidation()
  }
}


</script>
