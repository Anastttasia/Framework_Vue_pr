<template>

    <q-list v-if="props.items.length > 0">
      <TransitionGroup
        name="q-transition--scale"
        tag="div"
        appear>
        <TodoItem
            v-for="todo in props.items"
            :key="todo.id"
            :todo="todo"
            @toggle="toggle"
            @delete="remove"
        />
        </TransitionGroup>
    </q-list>

    <div v-else class="text-center q-mt-xl text-grey-6">
      <q-icon name="assignment" size="64px" />
      <div class="text-h6 q-mt-md">
        Задач нет
      </div>
    </div>

</template>

<script setup lang="ts">

import type { ITodoItem } from '../types/ITodoItem'
import TodoItem from '../components/TodoItem.vue'

interface Props {
  items: ITodoItem[]
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'toggle', id: number): void
  (e: 'delete', id: number): void
}>()

const toggle = (id: number) => {
  emit('toggle', id)
}

const remove = (id: number) => {
  emit('delete', id)
}

</script>
