import type { User } from 'firebase/auth'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export interface AuthUser {
  uid: string
  email: string | null
  displayName: string | null
}

export const useAuthStore = defineStore('auth', () => {

  const user = ref<AuthUser | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  const isAuthenticated = computed(() => !!user.value)
  const currentUser = computed(() => user.value)

  const setUser = (firebaseUser: User | null) => {
    if (firebaseUser) {
      user.value = {
        uid: firebaseUser.uid,
        email: firebaseUser.email,
        displayName: firebaseUser.displayName,
      }
    } else {
      user.value = null
    }
  }

  const setLoading = (isLoading: boolean) => {
    loading.value = isLoading
  }

  const setError = (errorMessage: string | null) => {
    error.value = errorMessage
  }

  const clearError = () => {
    error.value = null
  }

  const logout = () => {
    user.value = null
    error.value = null
  }

  return {

    user,
    loading,
    error,

    isAuthenticated,
    currentUser,

    setUser,
    setLoading,
    setError,
    clearError,
    logout
  }
})
