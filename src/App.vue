<template>
  <div class="flex h-screen flex-col bg-background">
    <main class="container flex-1 overflow-auto">
      <Dashboard :wsConnected="wsConnected" />
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, type Ref, onMounted, onUnmounted } from 'vue'
import Dashboard from './ExampleMain.vue'
import { useExploreStore } from '@/stores/explore'

const exploreStore = useExploreStore()

/**
 * Websocket connection handling
 */
const wsConnected: Ref<boolean> = ref(false)
const wsStreamUrl: string = import.meta.env.VITE_WS_URL
const MAX_RECONNECT_ATTEMPTS = 25
const HEARTBEAT_INTERVAL = 5000
let ws: WebSocket | null = null
let heartbeatInterval: NodeJS.Timeout | null = null
let reconnectAttempts = 0

function connectWebSocket() {
  ws = new WebSocket(wsStreamUrl)

  ws.onopen = () => {
    wsConnected.value = true;
    console.log("[ws] WebSocket connected")
    reconnectAttempts = 0 // reset the reconnect attempts on a successful connection
    startHeartbeat()
  }

  ws.onclose = (event) => {
    wsConnected.value = false
    if (!event.wasClean && reconnectAttempts < MAX_RECONNECT_ATTEMPTS) {
      reconnect()
    }
    stopHeartbeat()
  }

  ws.onerror = (error) => {
    console.error("[ws] WebSocket error:", error)
    ws?.close()
  }

  // Update the WebSocket message handler
  ws.onmessage = (e) => {
    const payload = e.data

    if (payload === "pong") {
      return
    }

    const data = JSON.parse(payload)
    switch (data.type) {
      case "debug":
        console.log("log:", data)
        break
      case "explore_host":
        console.info("explore_host:", data)
        exploreStore.addHost(data)
        break
      case "explore_endpoint":
        console.info("explore_endpoint:", data)
        exploreStore.addEndpoint(data.host, data)
        break
      case "scan_domain":
        console.info("scan_domain:", data)
        break
      case "scan_host":
        console.info("scan_host:", data)
        break
      default:
        console.log("unknown message type:", data)
        break
    }
  }
}

function reconnect() {
  setTimeout(() => {
    console.log("[ws] Attempting to reconnect...")
    reconnectAttempts++
    connectWebSocket()
  }, generateReconnectDelay(reconnectAttempts))
}

function generateReconnectDelay(attempts: number) {
  const delay = 2000 + attempts * 100
  return delay
}

function startHeartbeat() {
  heartbeatInterval = setInterval(() => {
    if (ws?.readyState === WebSocket.OPEN) {
      ws.send("ping")
    }
  }, HEARTBEAT_INTERVAL)
}

function stopHeartbeat() {
  if (heartbeatInterval) {
    clearInterval(heartbeatInterval)
    heartbeatInterval = null
  }
}

onMounted(() => {
  connectWebSocket();
})

onUnmounted(() => {
  ws?.close()
})

</script>
