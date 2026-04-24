import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { Todo } from '../components/models';


export const useTodoStore = defineStore('todo', () => {
    // Состояние - массив задач
const todos = ref<Todo[]>([]);
// Вспомогательные функции (пока пустые, для будущего использования) 

function addTodo() {
    // будет реализовано позже
}

function toggleTodo() {
    // будет реализовано позже
} 

function removeTodo() { 
    // будет реализовано позже
}

return {
    todos,
    addTodo,
    toggleTodo,
    removeTodo,
}
});