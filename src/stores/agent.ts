/**
 * AI Agent session management store
 */
import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useAxiosClient } from '@/stores/axios'
const axios = useAxiosClient()

export type AgentMessage = {
  id: number
  author_id: number
  agent_session_id: number
  content: string
  created_at: string
}

export type AgentSession = {
  id: number
  domain: string
  messages: AgentMessage[]
  created_at: string
}

export const useAgentStore = defineStore('agent', () => {
  const sessions = ref<AgentSession[]>([])
  const selectedSession = ref<AgentSession | null>(null)

  /**
   * Get all ai agent sessions
   */
  const getSessions = () => {
    axios
      .get('/api/agent/sessions')
      .then((response) => {
        console.log("[agent.ts]", response.data)
        sessions.value = response.data
      })
      .catch((error) => {
        console.error("[agent.ts]", error)
      })
  }

  /**
   * Delete an ai agent session
   * @param session - The session to delete
   */
  const deleteSession = (session: AgentSession) => {
    axios
      .delete(`/api/agent/sessions/${session.id}`)
      .then(() => {
        sessions.value = sessions.value.filter((s) => s.id !== session.id)
      })
      .catch((error) => {
        console.error("[agent.ts]", error)
      })
  }

  /**
   * Select an ai agent session
   * @param session - The session to select
   */
  const selectSession = (session: AgentSession) => {
    selectedSession.value = session
  }

  /**
   * Append a message to an ai agent session
   * @param session - The session to append the message to
   * @param message - The message to append
   */
  const appendMessageToSession = (sessionId: number, message: AgentMessage) => {
    const sessionToUpdate = sessions.value.find((s) => s.id === sessionId)
    if (sessionToUpdate) {
      console.info('[agent.ts] appendMessageToSession: session found', sessionToUpdate)
      console.info('[agent.ts] appendMessageToSession: message', message)
      sessionToUpdate.messages.push(message)
      // update session in sessions array
      // sessions.value = sessions.value.map((s) => s.id === sessionId ? sessionToUpdate : s)
    } else {
      console.error('[agent.ts] appendMessageToSession: session not found, id: ', sessionId)
    }
  }

  return {
    getSessions,
    deleteSession,
    selectSession,
    sessions,
    selectedSession,
    appendMessageToSession,
  }
})
