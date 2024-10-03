<template>
  <TooltipProvider :delay-duration="0">
    <ResizablePanelGroup
      id="resize-panel-group-1"
      direction="horizontal"
      class="h-full items-stretch">
      <Separator orientation="vertical" />
      <div>
        <Tabs default-value="live">
          <div class="flex items-center px-4 py-2">
            <h1 class="text-xl font-bold">
              Logs
            </h1>
            <TabsList class="ml-auto">
              <TabsTrigger value="live" class="text-zinc-600 dark:text-zinc-200">
                Live
              </TabsTrigger>
              <TabsTrigger value="pause" class="text-zinc-600 dark:text-zinc-200">
                Pause
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
          <TabsContent value="live" class="m-0">
            <LogsList v-model:selected-mail="selectedMail" :items="logs" />
          </TabsContent>
          <TabsContent value="pause" class="m-0">
            <LogsList v-model:selected-mail="selectedMail" :items="logs" />
          </TabsContent>
        </Tabs>
      </div>
    </ResizablePanelGroup>
  </TooltipProvider>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { Search } from 'lucide-vue-next'
import LogsList from './LogsList.vue'
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

import { logs } from '../data/logs'
const selectedMail = ref<string | undefined>(logs[0].id)
const searchValue = ref('')

const defaultLayout = ref([8, 92])

</script>