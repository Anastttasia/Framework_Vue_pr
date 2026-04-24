<template>
  <div>
    <p>{{ title }}</p>

    <q-item v-for="todo in todos" :key="todo.id" @click="increment">
        <q-item-section avatar>
            <q-checkbox v-model="todo.completed" />
        </q-item-section>
        <q-item-section>
            <q-item-label>{{ todo.title}}</q-item-label>
        </q-item-section>
        <q-item-section side>
            <q-btn flat round dense icon="delete" color="negative" />
        </q-item-section>
    </q-item>

    <p>Count: {{ todoCount }} / {{ meta.totalCount }}</p>
    <p>Active: {{ active ? 'yes' : 'no' }}</p>
    <p>Clicks on todos: {{ clickCount }}</p>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import type { Todo, Meta } from './models';

interface Props {
  title: string;
  todos?: Todo[];
  meta: Meta;
  active: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  todos: () => [],
});

const clickCount = ref(0);
function increment() {
  clickCount.value += 1;
  return clickCount.value;
}

const todoCount = computed(() => props.todos.length);
</script>
