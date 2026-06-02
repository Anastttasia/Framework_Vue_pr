import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { ITodoItem } from '../types/ITodoItem'
import { useLocalStorage } from '@/composables/useLocalStorage'

export const useTodoStore = defineStore('todo', () => {
  const todos = useLocalStorage<ITodoItem[]>('todos', [])

  const addTodo = (title: string): void => {
    const newTodo: ITodoItem = {
      id: Date.now(),
      date: new Date(),
      title,
      done: false
    }
    todos.value.push(newTodo)
  }

  const removeTodo = (id: number): void => {
    const index = todos.value.findIndex(t => t.id === id)
    if (index !== -1) {
      todos.value.splice(index, 1)
    }
  }

  const toggleTodo = (id: number): void => {
    const todo = todos.value.find(t => t.id === id)
    if (todo) {
      todo.done = !todo.done
    }
  }

  return {
    todos,
    addTodo,
    removeTodo,
    toggleTodo
  }
})
