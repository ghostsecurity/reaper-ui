/**
 * Session management store
 */
import { Ref, ref } from 'vue'

interface SessionStore {
  loggedIn: Ref<boolean>
  signIn: () => void
  signOut: () => void
}

const loggedIn = ref(false)

const signIn = () => {
  loggedIn.value = true
}

const signOut = () => {
  loggedIn.value = false
}

export function useSessionStore(): SessionStore {
  return {
    loggedIn,
    signIn,
    signOut,
  }
}
