<template>
  <TooltipProvider :delay-duration="0">
    <ResizablePanelGroup id="resize-panel-group-1"
                         direction="horizontal"
                         class="h-full items-stretch">
      <Separator orientation="vertical" />
      <ResizablePanel id="resize-panel-2"
                      :default-size="defaultLayout[1]"
                      :min-size="20">
        <Tabs default-value="all">
          <div class="flex items-center px-4 py-2">
            <h1 class="text-xl font-bold">
              AI Agent Sessions
            </h1>
            <TabsList class="ml-auto">
              <TabsTrigger value="all"
                           class="text-zinc-600 dark:text-zinc-200">
                All
              </TabsTrigger>
              <TabsTrigger value="active"
                           class="text-zinc-600 dark:text-zinc-200">
                Active
              </TabsTrigger>
            </TabsList>
          </div>
          <Separator />
          <div class="bg-background/95 p-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div class="relative">
              <Search class="absolute left-2 top-2.5 size-4 text-muted-foreground" />
              <Input v-model="searchValue"
                     placeholder="filter..."
                     class="pl-8" />
            </div>
          </div>
          <TabsContent value="all"
                       class="m-0">
            <AgentSessionsList v-model:selected-session="selectedSession"
                               :items="filteredSessionList" />
          </TabsContent>
          <TabsContent value="active"
                       class="m-0">
            <AgentSessionsList v-model:selected-session="selectedSession"
                               :items="filteredSessionList" />
          </TabsContent>
        </Tabs>
      </ResizablePanel>
      <ResizableHandle id="resiz-handle-2"
                       with-handle />
      <ResizablePanel id="resize-panel-3"
                      :default-size="defaultLayout[2]">
        <AgentSessionDisplay :session="selectedSessionData" />
      </ResizablePanel>
    </ResizablePanelGroup>
  </TooltipProvider>
</template>

<script lang="ts" setup>
import { computed, ref, onMounted } from 'vue'

import { Search } from 'lucide-vue-next'
import { refDebounced } from '@vueuse/core'
import { Separator } from '@/components/ui/separator'
import { Input } from '@/components/ui/input'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs'
import { TooltipProvider } from '@/components/ui/tooltip'
import AgentSessionsList from './AgentSessionsList.vue'
import AgentSessionDisplay from './AgentSessionDisplay.vue'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable'
import { useAgentStore } from '@/stores/agent'
import type { AgentSession } from '@/stores/agent'

const agentStore = useAgentStore()
const sessions = computed(() => agentStore.sessions)

const selectedSession = ref<number | undefined>(sessions.value.length > 0 ? sessions.value[0].id : undefined)
const searchValue = ref('')
const debouncedSearch = refDebounced(searchValue, 250)

const defaultLayout = ref([20, 30, 70])
// const navCollapsedSize = ref(2)

const filteredSessionList = computed(() => {
  let output: AgentSession[] = []
  const searchValue = debouncedSearch.value?.trim()
  if (!searchValue) {
    output = sessions.value
  }
  else {
    output = sessions.value.filter((item) => {
      return item.domain.includes(debouncedSearch.value)
    })
  }

  return output
})


const selectedSessionData = computed(() => sessions.value.find(item => item.id === selectedSession.value))

onMounted(() => {
  agentStore.getSessions()
  if (sessions.value.length > 0) {
    selectedSession.value = sessions.value[0].id
  }
})
</script>
