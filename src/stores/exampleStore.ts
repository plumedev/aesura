import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export interface IUser {
  id: number
  name: string
  email: string
}

export const useExampleStore = defineStore('example', () => {
  // État
  const counter = ref<number>(0)
  const users = ref<IUser[]>([])
  const currentUser = ref<IUser | null>(null)

  // Getters (computed)
  const doubleCounter = computed(() => counter.value * 2)
  const usersCount = computed(() => users.value.length)
  const hasUsers = computed(() => users.value.length > 0)

  // Actions
  const increment = () => {
    counter.value++
  }

  const decrement = () => {
    counter.value--
  }

  const reset = () => {
    counter.value = 0
  }

  const addUser = (user: IUser) => {
    users.value.push(user)
  }

  const removeUser = (id: number) => {
    const index = users.value.findIndex(user => user.id === id)
    if (index > -1) {
      users.value.splice(index, 1)
    }
  }

  const setCurrentUser = (user: IUser | null) => {
    currentUser.value = user
  }

  const clearUsers = () => {
    users.value = []
    currentUser.value = null
  }

  return {
    // État
    counter,
    users,
    currentUser,
    // Getters
    doubleCounter,
    usersCount,
    hasUsers,
    // Actions
    increment,
    decrement,
    reset,
    addUser,
    removeUser,
    setCurrentUser,
    clearUsers
  }
})
