<template>

  <q-item>

    <q-card style="width: 100%; display: flex; flex-direction: row; padding: 2rem; ">

    <q-item-section avatar>
      <q-checkbox
        :model-value="todo.done"
        @update:model-value="toggle"
        color="primary"
      />
    </q-item-section>

    <q-item-section>
      <q-item-label caption>
        {{ formatDate(todo.date) }}
      </q-item-label>
      
      <q-item-label :class="{ 'text-decoration-line-through text-grey-6': todo.done }">
        {{ todo.title }}
      </q-item-label>
 
    </q-item-section>

    <q-item-section side>
      <q-btn
        flat
        round
        dense
        icon="delete"
        color="negative"
        @click="remove"
      />
    </q-item-section>

    </q-card>

  </q-item>

</template>

<script setup lang="ts">
import type { ToDoItem } from '../types/todo'
import { Dialog } from 'quasar'

interface Props {
  todo: ToDoItem
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'toggle', id: number): void
  (e: 'delete', id: number): void
}>()

const toggle = () => {
  emit('toggle', props.todo.id)
}

const remove = () => {
  Dialog.create({
    title: 'Окно сообщения',
    message: `Вы действительно хотите удалить задачу "${props.todo.title}"?`,
    persistent: true,
    ok: {
      label: 'Удалить',
      color: 'red'
    },
    cancel: {
      label: 'Отмена',
      flat: true
    }
  }).onOk(() => {
    emit('delete', props.todo.id)
  })
}

const formatDate = (date: Date | undefined) => {
  if (!date) return ''
  return new Date(date).toLocaleDateString('en-GB')
}

</script>

<style land="scss" scoped>
.text-decoration-line-through {
    text-decoration: line-through;
}
</style>