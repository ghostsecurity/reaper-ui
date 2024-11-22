import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useAxiosClient } from './axios'

const axios = useAxiosClient()

export const useOpenAIStore = defineStore('openai', () => {
  const apiKey = ref('')
  const model = ref('gpt-4o')
  const errors = ref('')

  const models = [
    { id: 'gpt-4o', name: 'GPT-4 Optimized' },
    { id: 'gpt-4o-mini', name: 'GPT-4 Optimized Mini' },
    { id: 'gpt-4-turbo', name: 'GPT-4 Turbo' },
    { id: 'gpt-4', name: 'GPT-4' },
    { id: 'gpt-3.5-turbo', name: 'GPT-3.5 Turbo' }
  ]

  const updateSettings = (newApiKey: string, newModel: string) => {
    return axios
      .post('/api/openai/config', {
        api_key: newApiKey,
        model: newModel
      })
      .then((response) => {
        apiKey.value = response.data.api_key
        model.value = response.data.model
        errors.value = ''
      })
      .catch((error) => {
        errors.value = error?.response?.data?.error ?? error.message
        throw error
      })
  }

  const getSettings = () => {
    axios
      .get('/api/openai/config')
      .then((response) => {
        apiKey.value = response.data.api_key
        model.value = response.data.model
      })
      .catch((error) => {
        errors.value = error?.response?.data?.error ?? error.message
      })
  }

  return {
    apiKey,
    model,
    models,
    errors,
    updateSettings,
    getSettings
  }
})
