import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useAxiosClient } from '@/stores/axios'

const axios = useAxiosClient()

export type Domain = {
  id?: number
  name: string
  hosts?: number
  firstSeen?: Date
  lastSeen?: Date
  selected?: boolean
}

type Host = {
  id?: number
  domainId?: number
  name: string
  addresses: Address[]
  firstSeen: Date
  lastSeen: Date
}

type Address = {
  id?: number
  name: string
}

export const useScanStore = defineStore('scan', () => {
  const domains = ref<Domain[]>([])
  const errors = ref<string>('')

  const addDomain = (domain: Domain) => {
    domains.value.push(domain)
  }

  const numHosts = computed(() => {
    return domains.value.reduce((total, domain) => total + (domain.hosts ?? 0), 0)
  })

  const createDomain = (domain: Domain) => {
    return new Promise((resolve, reject) => {
      axios
        .post('/api/domains', domain)
        .then((response) => {
          addDomain(response.data)
          errors.value = '' // Clear any previous errors
          resolve(response.data)
        })
        .catch((error) => {
          console.error(error)
          errors.value = error.message
          reject(error)
        })
    })
  }

  const getDomains = () => {
    axios
      .get('/api/domains')
      .then((response) => {
        domains.value = response.data
      })
      .catch((error) => {
        console.error(error)
        errors.value = error.message
      })
  }

  const deleteDomain = (domain: Domain) => {
    axios
      .delete(`/api/domains/${domain.id}`)
      .then(() => {
        domains.value = domains.value.filter((d) => d.id !== domain.id)
      })
      .catch((error) => {
        console.error(error)
        errors.value = error.message
      })
  }

  return {
    addDomain,
    domains,
    numHosts,
    getDomains,
    createDomain,
    deleteDomain,
    errors,
  }
})
