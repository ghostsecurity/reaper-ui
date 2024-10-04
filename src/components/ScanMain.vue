<template>
  <TooltipProvider :delay-duration="0">
    <ResizablePanelGroup id="resize-panel-group-1"
                         direction="horizontal"
                         class="h-full items-stretch">
      <Separator orientation="vertical" />
      <ResizablePanel id="resize-panel-2"
                      :default-size="defaultLayout[1]"
                      :min-size="20">
        <Tabs default-value="in-scope">
          <div class="flex items-center px-4 py-2">
            <h1 class="text-xl font-bold">
              Scan
            </h1>
            <TabsList class="ml-auto">
              <TabsTrigger value="in-scope"
                           class="text-zinc-600 dark:text-zinc-200">
                In scope
              </TabsTrigger>
              <TabsTrigger value="out-of-scope"
                           class="text-zinc-600 dark:text-zinc-200">
                Out of scope
              </TabsTrigger>
            </TabsList>
          </div>
          <Separator />
          <div class="bg-background/95 px-2 py-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <form>
              <div class="relative flex items-center gap-2">
                <Search class="absolute left-2 top-2.5 size-4 text-muted-foreground" />
                <Input v-model="searchValue"
                       placeholder="filter..."
                       class="pl-8" />
                <Button variant="outline">Scan</Button>
              </div>
            </form>
          </div>
          <TabsContent value="in-scope"
                       class="m-0">
            <ScanList :in-scope="true" />
          </TabsContent>
          <TabsContent value="out-of-scope"
                       class="m-0">
            <ScanList :in-scope="false" />
          </TabsContent>
        </Tabs>
      </ResizablePanel>
      <ResizableHandle id="resize-handle-2"
                       with-handle />
      <ResizablePanel id="resize-panel-3"
                      :default-size="defaultLayout[2]">
        <MailDisplay :mail="selectedMailData" />
      </ResizablePanel>
    </ResizablePanelGroup>
  </TooltipProvider>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import ScanList from './ScanList.vue'
import MailDisplay from './MailDisplay.vue'
import { Search } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
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
import { useConfigStore } from '@/stores/config'

const config = useConfigStore()

// data
import { mails } from '../data/mails'

const selectedMail = ref<string | undefined>(mails[0].id)
const searchValue = ref('')

// const debouncedSearch = refDebounced(searchValue, 250)

const defaultLayout = ref([20, 30, 70])


const selectedMailData = computed(() => mails.find(item => item.id === selectedMail.value))
</script>