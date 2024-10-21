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

export const useEndpointStore = defineStore('endpoint', () => {
  const endpoints = ref<Endpoint[]>([])

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

  return {
    endpoints,
    getEndpoints,
  }
})
