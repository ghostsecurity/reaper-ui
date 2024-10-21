/**
 * Requests store
 */
import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useAxiosClient } from '@/stores/axios'
const axios = useAxiosClient()

export const useRequestStore = defineStore('request', () => {
  const requests = ref<Request[]>([])

  const getRequests = () => {
    axios
      .get('/api/requests')
      .then((response) => {
        requests.value = response.data
      })
      .catch((error) => {
        console.error("[request.ts]", error)
      })
  }

  return {
    requests,
    getRequests,
  }
})
