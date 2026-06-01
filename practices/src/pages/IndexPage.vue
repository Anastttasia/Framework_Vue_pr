<template>
  <q-page class="q-pa-md">
    <div class="text-h6 flex flex-center">
      Мои задачи
    </div>

    <q-list separator>
      
      <TodoForm />

      <TodoList
        :items="todoStore.todos"
        @toggle="toggle"
        @delete="remove"
      />

    </q-list>

  </q-page>
</template>

<script lang="ts" setup>
import { useTodoStore } from '../stores/todoStore'
import TodoForm from '../components/TodoForm.vue';
import TodoList from '../components/TodoList.vue';

const todoStore = useTodoStore()

const toggle = (id: number): void => {
  todoStore.toggleTodo(id)
}

const remove = (id: number): void => {
  todoStore.removeTodo(id)
}

</script>


