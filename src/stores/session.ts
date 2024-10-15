/**
 * Session management store
 */
import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useSessionStore = defineStore('session', () => {
  const loggedIn = ref(false)

  const signIn = () => {
    loggedIn.value = true
  }

  const signOut = () => {
    loggedIn.value = false
  }

  return {
    loggedIn,
    signIn,
    signOut,
  }
})
