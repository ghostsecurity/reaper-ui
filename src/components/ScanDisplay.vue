<template>
  <div class="flex h-full flex-col">
    <div class="flex items-center p-2">
      <div class="flex items-center gap-2">
        <Tooltip>
          <TooltipTrigger as-child>
            <Button variant="ghost"
                    size="icon"
                    :disabled="!domain">
              <Binoculars class="size-4" />
              <span class="sr-only">Scan domain</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>Scan domain</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger as-child>
            <Button variant="ghost"
                    size="icon"
                    :disabled="!domain"
                    @click="handleDeleteDomain">
              <Trash2 class="size-4" />
              <span class="sr-only">Delete domain</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>Delete domain</TooltipContent>
        </Tooltip>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger as-child>
          <Button variant="ghost"
                  size="icon"
                  :disabled="!domain">
            <MoreVertical class="size-4" />
            <span class="sr-only">More</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>Mark as unread</DropdownMenuItem>
          <DropdownMenuItem>Star domain</DropdownMenuItem>
          <DropdownMenuItem>Add label</DropdownMenuItem>
          <DropdownMenuItem>Mute domain</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
    <Separator />
    <div v-if="domain"
         class="flex flex-1 flex-col">
      <div class="flex items-start p-4">
        <div class="flex items-start gap-4 text-sm">
          <Avatar>
            <AvatarFallback>
              {{ domainAvatarName }}
            </AvatarFallback>
          </Avatar>
          <div class="grid gap-1">
            <div class="font-semibold">
              {{ domain.name }}
            </div>
            <div class="line-clamp-1 text-xs">
              {{ utils.customNumberFormat(domain.host_count || 0) }} hosts
            </div>
            <Tabs default-value="all"
                  v-model="tab"
                  @update:model-value="handleTabChange">
              <div class="flex items-center pt-2">
                <TabsList class="ml-auto">
                  <TabsTrigger value="all"
                               class="text-xs text-zinc-600 dark:text-zinc-200">
                    All
                  </TabsTrigger>
                  <TabsTrigger value="live"
                               class="text-xs text-zinc-600 dark:text-zinc-200">
                    Live
                  </TabsTrigger>
                </TabsList>
              </div>
            </Tabs>
          </div>
        </div>
        <div v-if="domain.last_scanned_at"
             class="ml-auto text-xs text-muted-foreground">
          {{ domain.last_scanned_at }}
        </div>
      </div>
      <Separator />
      <div class="h-screen space-y-2 overflow-y-auto bg-muted/50 p-2 pb-10 text-xs">
        <div v-for="host in filteredHosts"
             :key="host.id"
             class="flex justify-between rounded-md bg-background p-1 shadow-sm">
          <div class="flex items-center gap-2">
            <div class="m-2 flex flex-col items-center rounded-sm p-1"
                 :class="host.status === 'live' ? ' text-primary' : 'text-secondary'">
              <Hexagon class="size-4" />
              <span class="h-4 py-1 text-2xs font-semibold text-primary/80">{{ host.status_code && host.status_code > 0
                ? host.status_code : '-' }}</span>
            </div>
            <div class="flex space-x-4">
              <div class="w-64">
                <div class="truncate font-medium">{{ host.name }}</div>
                <div class="lowercase text-muted-foreground">{{ host.content_type }}</div>
              </div>
              <div class="ml-8 min-w-24">
                <div class="font-medium">server</div>
                <div class="lowercase text-muted-foreground">{{ host.webserver && host.webserver.length > 0 ?
                  host.webserver : '-' }}</div>
              </div>
              <div class="ml-8 min-w-24">
                <div class="font-medium">source</div>
                <div class="lowercase text-muted-foreground">{{ host.source }}</div>
              </div>
              <div class="ml-8 min-w-24">
                <div class="font-medium">{{ host.cdn_type || 'cloud' }}</div>
                <div class="lowercase text-muted-foreground">{{ host.cdn_name || '-' }}</div>
              </div>
              <div class="ml-8 min-w-24">
                <div class="font-medium">tech</div>
                <div class="lowercase text-muted-foreground">{{ host.tech && host.tech.length > 0 ? host.tech : '-' }}
                </div>
              </div>
            </div>
          </div>
          <div class="flex items-center gap-2">
            <div>
              {{ host.updated_at }}
            </div>
            <Button variant="ghost"
                    size="icon"
                    class="h-8">
              <MoreHorizontal class="size-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
    <div v-else
         class="p-8 text-center text-sm text-muted-foreground">
      No domain selected
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, watch } from 'vue'
import { Binoculars, Hexagon, MoreHorizontal, MoreVertical, Trash2 } from 'lucide-vue-next'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import {
  Tabs,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs'

import { useUtilStore } from '@/utils'
import { useScanStore } from '@/stores/scan'

const utils = useUtilStore()
const scanStore = useScanStore()
const domain = computed(() => scanStore.selectedDomain)
const hosts = computed(() => scanStore.hosts)

const domainAvatarName = computed(() => {
  return domain.value?.name.substring(0, 2).toUpperCase()
})

const tab = ref('all')

const handleTabChange = (e: string | number) => {
  tab.value = e as string
}

const handleDeleteDomain = () => {
  if (domain.value) {
    scanStore.deleteDomain(domain.value)
  }
}

const filteredHosts = computed(() => {
  if (tab.value === 'live') {
    return hosts.value.filter((host) => host.status === 'live')
  }
  return hosts.value
})

watch(domain, () => {
  if (domain.value) {
    scanStore.getHosts(domain.value)
  }
})
</script>
