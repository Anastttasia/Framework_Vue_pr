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
import { computed, ref } from 'vue'
import { useTodoStore } from '@/stores/todoStore'

const props = defineProps();
const store = useTodoStore();

const title = ref('')
const formRef = ref()

const emit = defineEmits<{
    (e: 'add-todo', value: string): void
}>()

const isFormValid = computed(() => {
    return title.value?.trim().length ?? 0 > 0
})

const onSubmit = async () => {
    const isValid = await formRef.value.validate()
    if (!isValid) return

    store.addTodo(title.value.trim() );
    title.value = '';

    formRef.value.resetValidation();
}

</script>
