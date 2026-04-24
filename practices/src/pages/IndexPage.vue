<template>
  <q-page class="row items-center justify-evenly">
    <todo-item
      title="Мои задачи"
      active
      :todos="todos"
      :meta="meta"
    ></todo-item>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { Todo, Meta } from 'components/models';
import TodoItem from 'components/TodoItem.vue';

const todos = ref<Todo[]>([
  {
    id: 1,
    title: 'Задание 1',
    completed: false,
  },
  {
    id: 2,
    title: 'Задание 2',
    completed: false,
  },
  {
    id: 3,
    title: 'Задание 3',
    completed: false,
  },
  {
    id: 4,
    title: 'Задание 4',
    completed: false,
  },
  {
    id: 5,
    title: 'Задание 5',
    completed: false,
  },
]);

const meta = ref<Meta>({
  totalCount: 1200,
});
</script>
