<template>
  <TooltipProvider :delay-duration="0">
    <ResizablePanelGroup
      id="resize-panel-group-1"
      direction="horizontal"
      class="h-full items-stretch">
      <ResizableHandle id="resize-handle-1" />
      <ResizablePanel id="resize-panel-2" :default-size="defaultLayout[1]" :min-size="30">
        <Tabs default-value="all">
          <div class="flex items-center px-4 py-2">
            <h1 class="text-xl font-bold">
              Explore
            </h1>
            <TabsList class="ml-auto">
              <TabsTrigger value="all" class="text-zinc-600 dark:text-zinc-200">
                All mail
              </TabsTrigger>
              <TabsTrigger value="unread" class="text-zinc-600 dark:text-zinc-200">
                Unread
              </TabsTrigger>
            </TabsList>
          </div>
          <Separator />
          <div class="bg-background/95 p-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <form>
              <div class="relative">
                <Search class="absolute left-2 top-2.5 size-4 text-muted-foreground" />
                <Input v-model="searchValue" placeholder="filter..." class="pl-8" />
              </div>
            </form>
          </div>
          <TabsContent value="all" class="m-0">
            <MailList v-model:selected-mail="selectedMail" :items="filteredMailList" />
          </TabsContent>
          <TabsContent value="unread" class="m-0">
            <MailList v-model:selected-mail="selectedMail" :items="unreadMailList" />
          </TabsContent>
        </Tabs>
      </ResizablePanel>
      <ResizableHandle id="resiz-handle-2" with-handle />
      <ResizablePanel id="resize-panel-3" :default-size="defaultLayout[2]">
        <MailDisplay :mail="selectedMailData" />
      </ResizablePanel>
    </ResizablePanelGroup>
  </TooltipProvider>
</template>

<script lang="ts" setup>
import { Search } from 'lucide-vue-next'

import { computed, ref } from 'vue'
import { refDebounced } from '@vueuse/core'
import type { Mail } from '../data/mails'
import MailList from './MailList.vue'
import MailDisplay from './MailDisplay.vue'
import { Separator } from '@/components/ui/separator'
import { Input } from '@/components/ui/input'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs'
import { TooltipProvider } from '@/components/ui/tooltip'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable'
// data
import { mails } from '../data/mails'

const selectedMail = ref<string | undefined>(mails[0].id)
const searchValue = ref('')
const debouncedSearch = refDebounced(searchValue, 250)

const defaultLayout = ref([20, 30, 70])
// const navCollapsedSize = ref(2)

const filteredMailList = computed(() => {
  let output: Mail[] = []
  const searchValue = debouncedSearch.value?.trim()
  if (!searchValue) {
    output = mails
  }
  else {
    output = mails.filter((item) => {
      return item.name.includes(debouncedSearch.value)
        || item.email.includes(debouncedSearch.value)
        || item.name.includes(debouncedSearch.value)
        || item.subject.includes(debouncedSearch.value)
        || item.text.includes(debouncedSearch.value)
    })
  }

  return output
})

const unreadMailList = computed(() => filteredMailList.value.filter(item => !item.read))

const selectedMailData = computed(() => mails.find(item => item.id === selectedMail.value))
</script>