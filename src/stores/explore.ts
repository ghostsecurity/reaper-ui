import { ref, reactive } from 'vue'
import { defineStore } from 'pinia'

type Host = {
  id?: number
  name: string
  endpoints: Endpoint[]
}

type Endpoint = {
  id?: number
  path: string
}

export const useExploreStore = defineStore('explore', () => {
  const hosts = ref<Host[]>([])

  const addHost = (host: Host) => {
    console.info("adding host", host.name)
    hosts.value.push(reactive(host))
  }

  const addEndpoint = (hostname: string, endpoint: Endpoint) => {
    const host = hosts.value.find(h => h.name === hostname)
    if (host) {
      if (!host.endpoints) {
        console.info("adding first endpoint to host", host.name, endpoint.path)
        host.endpoints = reactive([endpoint])
      } else {
        console.info("adding endpoint to host", host.name, endpoint.path)
        host.endpoints.push(reactive(endpoint))
      }
    } else {
      console.warn(`Host ${hostname} not found. Creating new host.`)
      addHost({ name: hostname, endpoints: [endpoint] })
    }
  }

  return {
    hosts,
    addHost,
    addEndpoint,
  }
})
