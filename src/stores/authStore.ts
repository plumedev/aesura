import { auth, db } from '@/plugins/firebase'
import type { User } from 'firebase/auth'
import { onAuthStateChanged } from 'firebase/auth'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export interface AuthUser {
  uid: string
  email: string | null
  displayName: string | null
  isTutorialActive: boolean
}

export const useAuthStore = defineStore('auth', () => {

  const user = ref<AuthUser | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)
  const authInitialized = ref(false)

  const isAuthenticated = computed(() => !!user.value)
  const currentUser = computed(() => user.value)
  const isTutorialActive = computed(() => user.value?.isTutorialActive ?? false)
  const isAuthReady = computed(() => authInitialized.value)

  const setUser = (firebaseUser: User | null) => {
    if (firebaseUser) {
      user.value = {
        uid: firebaseUser.uid,
        email: firebaseUser.email,
        displayName: firebaseUser.displayName,
        isTutorialActive: false
      }
    } else {
      user.value = null
    }
  }

  const fetchUserData = async (uid: string) => {
    try {
      const userDocRef = doc(db, 'users', uid)
      const userDoc = await getDoc(userDocRef)

      // Utilisateur existe, récupérer ses données
      if (userDoc.exists()) {
        const userData = userDoc.data()
        user.value = {
          ...user.value!,
          isTutorialActive: userData.isTutorialActive ?? true
        }
      } else {
        await setDoc(userDocRef, {
          email: user.value?.email,
          displayName: user.value?.displayName,
          isTutorialActive: true,
          createdAt: new Date()
        })
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des données utilisateur:', error)
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

  // Initialiser l'écouteur d'état d'authentification
  const initAuthListener = () => {
    onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // Utilisateur connecté, mettre à jour le store
        setUser(firebaseUser)
        // Récupérer les données utilisateur depuis Firestore
        await fetchUserData(firebaseUser.uid)
      } else {
        // Utilisateur déconnecté
        setUser(null)
      }
      // Marquer l'authentification comme initialisée
      authInitialized.value = true
    })
  }

  return {

    user,
    loading,
    error,

    isAuthenticated,
    currentUser,
    isTutorialActive,
    isAuthReady,

    setUser,
    setLoading,
    setError,
    clearError,
    logout,
    fetchUserData,
    initAuthListener
  }
})
