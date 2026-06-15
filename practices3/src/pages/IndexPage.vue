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
           v-model="filterModel"
          toggle-color="primary"
          :options="filterOptions"
          unelevated
          class="full-width"
        />
      </q-item>

        <q-item style="width: 100%;">
        <q-input
          v-model="searchModel"
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

      <div v-if="todoStore.loading" class="text-center q-mt-xl">
        <q-spinner color="primary" size="40px" />
      </div>

      <TodoList
        v-else
        :items="searchedTodos"
        @toggle="toggle"
        @delete="remove"
      />

    </q-list>

  </q-page>
</template>

<script lang="ts" setup>
import { computed } from 'vue'

import { useTodoStore } from '../stores/todoStore'
import { useTodoFilter } from '../composables/useTodoFilter'
import { useTodoSearch } from '../composables/useTodoSearch'

import TodoForm from '../components/TodoForm.vue';
import TodoList from '../components/TodoList.vue';
import type { TodoFilter } from '../types/todo'

const todoStore = useTodoStore()
const filterModel = computed({
  get: () => todoStore.filter,
  set: (val: TodoFilter) => todoStore.setFilter(val)
})

const searchModel = computed({
  get: () => todoStore.searchQuery,
  set: (val: string | null) => todoStore.setSearchQuery(val ?? '')
})

const searchedTodos = computed(() => todoStore.searchedTodos)

const filterOptions = computed(() => [
  { label: 'Все', value: 'all' as TodoFilter },
  { label: 'Активные', value: 'active' as TodoFilter },
  { label: 'Выполненные', value: 'done' as TodoFilter }
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


