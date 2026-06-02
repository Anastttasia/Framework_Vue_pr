<template>
  <q-page class="q-pa-md">
    <div class="text-h6 flex flex-center">
      Мои задачи
    </div>

    <q-list separator>
    
      <TodoForm />

      <q-item class="no-separator">
        <q-item-section avatar>
          <q-icon 
          name="filter"
          size="24px"
          color="primary" />
      </q-item-section>

        <q-btn-toggle
          v-model="filter"
          toggle-color="primary"
          :options="filterOptions"
          unelevated
          class="full-width"
        />
      </q-item>

        <q-item style="width: 100%;">
        <q-input
          v-model="searchQuery"
          outlined
          dense
          placeholder="Поиск задачи по названию"
          clearable
          style="width: 100%;"
        >
          <template v-slot:prepend>
            <q-icon name="search" />
          </template>
        </q-input>
      </q-item>

      <TodoList
        :items="finalTodos"
        @toggle="toggle"
        @delete="remove"
      />

    </q-list>

  </q-page>
</template>

<script lang="ts" setup>
import { computed, ref, toRef } from 'vue'

import { useTodoStore } from '../stores/todoStore'
import { useTodoFilter } from '../composables/useTodoFilter'
import { useTodoSearch } from '../composables/useTodoSearch'

import TodoForm from '../components/TodoForm.vue';
import TodoList from '../components/TodoList.vue';

const todoStore = useTodoStore()
const todosRef = toRef(todoStore, 'todos')
const searchQuery = ref('')
const { filter, filteredTodos, setFilter } = useTodoFilter(todosRef)
const { searchedTodos: finalTodos } = useTodoSearch(filteredTodos, searchQuery)

const filterOptions = computed(() => [
  { label: 'Все задачи', value: 'all' },
  { label: 'Активные задачи', value: 'active' },
  { label: 'Выполненные задачи', value: 'done' }
])


const toggle = (id: number): void => {
  todoStore.toggleTodo(id)
}

const remove = (id: number): void => {
  todoStore.removeTodo(id)
}

</script>

<style>

.no-separator {
    border-top: none !important;
    padding-bottom: 30px;
    &::before {
        border-top: none !important;
    }
}
</style>


