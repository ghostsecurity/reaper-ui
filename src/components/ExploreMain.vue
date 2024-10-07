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
              Explore
            </h1>
            <TabsList class="ml-auto">
              <TabsTrigger value="all"
                           class="text-zinc-600 dark:text-zinc-200">
                In scope
              </TabsTrigger>
              <TabsTrigger value="unread"
                           class="text-zinc-600 dark:text-zinc-200">
                Out
              </TabsTrigger>
            </TabsList>
          </div>
          <Separator />
          <div class="bg-background/95 px-2 py-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <form>
              <div class="relative">
                <Search class="absolute left-2 top-2.5 size-4 text-muted-foreground" />
                <Input v-model="searchValue"
                       placeholder="filter..."
                       class="pl-8" />
              </div>
            </form>
          </div>
          <TabsContent value="all"
                       class="m-0">
            <ExploreList />
          </TabsContent>
          <TabsContent value="unread"
                       class="m-0">
            <ExploreList />
          </TabsContent>
        </Tabs>
      </ResizablePanel>
      <ResizableHandle id="resiz-handle-2"
                       with-handle />
      <ResizablePanel id="resize-panel-3"
                      :default-size="defaultLayout[2]">
        <ExploreInstructions />
      </ResizablePanel>
    </ResizablePanelGroup>
  </TooltipProvider>
</template>

<script lang="ts" setup>
import { Search } from 'lucide-vue-next'
import { ref } from 'vue'
import ExploreList from './ExploreList.vue'
import ExploreInstructions from './ExploreInstructions.vue'
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

const searchValue = ref('')
const defaultLayout = ref([20, 30, 70])
</script>