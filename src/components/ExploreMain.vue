<template>
  <TooltipProvider :delay-duration="0">
    <ResizablePanelGroup id="resize-panel-group-1"
                         direction="horizontal"
                         class="h-full items-stretch">
      <Separator orientation="vertical" />
      <ResizablePanel id="resize-panel-2"
                      :default-size="defaultLayout[1]"
                      :min-size="20">
        <div class="flex items-center justify-between px-4 py-2">
          <h1 class="text-xl font-bold">
            Explore
          </h1>
          <div class="flex items-center space-x-2">
            <Label for="proxy-status"
                   class="text-xs text-muted-foreground">Proxy {{ exploreStore.proxy?.enabled ? 'on' : 'off' }}</Label>
            <Switch id="proxy-status"
                    @update:checked="handleProxyStatusToggle" />
          </div>
        </div>

        <Separator />
        <div class="bg-background/95 p-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <form>
            <div class="relative">
              <Search class="absolute left-2 top-2.5 size-4 text-muted-foreground" />
              <Input v-model="searchValue"
                     placeholder="filter..."
                     class="pl-8" />
            </div>
          </form>
        </div>

        <ExploreList />
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
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { TooltipProvider } from '@/components/ui/tooltip'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable'
import { useExploreStore } from '@/stores/explore'

const searchValue = ref('')
const defaultLayout = ref([20, 30, 70])
const exploreStore = useExploreStore()

const handleProxyStatusToggle = () => {
  if (exploreStore.proxy?.enabled) {
    exploreStore.proxyStop()
  } else {
    exploreStore.proxyStart()
  }
}
</script>
