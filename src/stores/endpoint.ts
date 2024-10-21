/**
 * Endpoints store
 */
import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useAxiosClient } from '@/stores/axios'
const axios = useAxiosClient()

export type Endpoint = {
  id?: number
  method: string
  hostname: string
  path: string
  created_at: string
}


export type AttackResult = {
  id: number
  endpoint_id: number
  hostname: string
  ip_address: string
  port: string
  scheme: string
  template_author: string
  template_name: string
  template_severity: string
  url: string
  request: string
  response: string
  created_at: string
}

export const useEndpointStore = defineStore('endpoint', () => {
  const endpoints = ref<Endpoint[]>([])
  const results = ref<AttackResult[]>([])
  const attackRunning = ref(false)

  const getEndpoints = () => {
    axios
      .get('/api/endpoints')
      .then((response) => {
        endpoints.value = response.data
      })
      .catch((error) => {
        console.error("[request.ts]", error)
      })
  }

  const startAttack = (endpoint: Endpoint) => {
    attackRunning.value = true
    console.log("start attack", endpoint)

    const payload = {
      endpoint_id: endpoint.id,
      tags: ['ghost'],
    }
    axios
      .post(`/api/attack`, payload)
      .then((response) => {
        console.log("attack started", response)
      })
      .catch((error) => {
        console.error("[request.ts]", error)
      })
      .finally(() => {
        attackRunning.value = false
      })
  }

  const addResult = (result: AttackResult) => {
    results.value.push(result)
  }

  const clearResults = (endpoint: Endpoint) => {
    axios
      .delete(`/api/attack/${endpoint.id}/results`)
      .then(() => {
        results.value = []
      })
  }

  return {
    addResult,
    attackRunning,
    clearResults,
    endpoints,
    results,
    getEndpoints,
    startAttack,
  }
})
