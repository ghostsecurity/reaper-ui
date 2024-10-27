<template>
  <div class="flex h-full flex-col">
    <div class="flex items-center p-2">
      <div class="flex items-center gap-2">
        <Tooltip>
          <TooltipTrigger as-child>
            <Button variant="ghost"
                    size="icon"
                    :disabled="!endpoint">
              <Archive class="size-4" />
              <span class="sr-only">Archive</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>Archive</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger as-child>
            <Button variant="ghost"
                    size="icon"
                    :disabled="!endpoint">
              <ArchiveX class="size-4" />
              <span class="sr-only">Move to junk</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>Move to junk</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger as-child>
            <Button variant="ghost"
                    size="icon"
                    :disabled="!endpoint"
                    @click="clearResults">
              <Trash2 class="size-4" />
              <span class="sr-only">Move to trash</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>Clear all results</TooltipContent>
        </Tooltip>
        <Separator orientation="vertical"
                   class="mx-1 h-6" />
        <Tooltip>
          <Popover>
            <PopoverTrigger as-child>
              <TooltipTrigger as-child>
                <Button variant="ghost"
                        size="icon"
                        :disabled="!endpoint">
                  <Clock class="size-4" />
                  <span class="sr-only">Snooze</span>
                </Button>
              </TooltipTrigger>
            </PopoverTrigger>
            <PopoverContent class="flex w-[535px] p-0">
              <div class="flex flex-col gap-2 border-r px-2 py-4">
                <div class="px-4 text-sm font-medium">
                  Snooze until
                </div>
                <div class="grid min-w-[250px] gap-1">
                  <Button variant="ghost"
                          class="justify-start font-normal">
                    Later today
                    <span class="ml-auto text-muted-foreground">
                      {{ format(addHours(today, 4), "E, h:m b") }}
                    </span>
                  </Button>
                  <Button variant="ghost"
                          class="justify-start font-normal">
                    Tomorrow
                    <span class="ml-auto text-muted-foreground">
                      {{ format(addDays(today, 1), "E, h:m b") }}
                    </span>
                  </Button>
                  <Button variant="ghost"
                          class="justify-start font-normal">
                    This weekend
                    <span class="ml-auto text-muted-foreground">
                      {{ format(nextSaturday(today), "E, h:m b") }}
                    </span>
                  </Button>
                  <Button variant="ghost"
                          class="justify-start font-normal">
                    Next week
                    <span class="ml-auto text-muted-foreground">
                      {{ format(addDays(today, 7), "E, h:m b") }}
                    </span>
                  </Button>
                </div>
              </div>
              <div class="p-2">
                <Calendar />
              </div>
            </PopoverContent>
          </Popover>
          <TooltipContent>Snooze</TooltipContent>
        </Tooltip>
      </div>
      <div class="ml-auto flex items-center gap-2">
        <Tooltip>
          <TooltipTrigger as-child>
            <Button variant="ghost"
                    size="icon"
                    :disabled="!endpoint">
              <Reply class="size-4" />
              <span class="sr-only">Reply</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>Reply</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger as-child>
            <Button variant="ghost"
                    size="icon"
                    :disabled="!endpoint">
              <ReplyAll class="size-4" />
              <span class="sr-only">Reply all</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>Reply all</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger as-child>
            <Button variant="ghost"
                    size="icon"
                    :disabled="!endpoint">
              <Forward class="size-4" />
              <span class="sr-only">Forward</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>Forward</TooltipContent>
        </Tooltip>
      </div>
      <Separator orientation="vertical"
                 class="mx-2 h-6" />
      <DropdownMenu>
        <DropdownMenuTrigger as-child>
          <Button variant="ghost"
                  size="icon"
                  :disabled="!endpoint">
            <MoreVertical class="size-4" />
            <span class="sr-only">More</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>Mark as unread</DropdownMenuItem>
          <DropdownMenuItem>Star thread</DropdownMenuItem>
          <DropdownMenuItem>Add label</DropdownMenuItem>
          <DropdownMenuItem>Mute thread</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
    <Separator />
    <div v-if="endpoint"
         class="flex flex-1 flex-col">
      <div class="flex items-start p-4">
        <div class="flex items-start gap-4 text-sm">
          <div class="grid gap-1">
            <div class="font-semibold">
              {{ endpoint.path }}
            </div>
            <div class="line-clamp-1 text-xs">
              {{ endpoint.method }}
            </div>
            <div class="flex items-center justify-between gap-2 text-xs">
              <div>
                {{ endpoint.hostname }}
              </div>
            </div>
          </div>
        </div>
        <div v-if="endpoint.created_at"
             class="ml-auto space-y-4 text-xs text-muted-foreground">
          <div>
            {{ format(new Date(endpoint.created_at), "PPpp") }}
          </div>
          <div>
            <Popover v-model:open="attackTemplateSelectOpen">
              <PopoverTrigger as-child>
                <Button variant="outline"
                        role="combobox"
                        :aria-expanded="attackTemplateSelectOpen"
                        class="w-[200px] justify-between">
                  {{ attackTemplateSelectValue
                    ? testTypes.find((tt) => tt.value === attackTemplateSelectValue)?.label
                    : "Select test type..." }}
                  <CaretSortIcon class="ml-2 size-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent class="w-[200px] p-0">
                <Command>
                  <CommandInput class="h-9"
                                placeholder="Search test type..." />
                  <CommandEmpty>No test type found.</CommandEmpty>
                  <CommandList>
                    <CommandGroup>
                      <CommandItem v-for="tt in testTypes"
                                   :key="tt.value"
                                   :value="tt.value"
                                   @select="(ev) => {
                                    if (typeof ev.detail.value === 'string') {
                                      attackTemplateSelectValue = ev.detail.value
                                    }
                                    attackTemplateSelectOpen = false
                                  }">
                        {{ tt.label }}
                        <CheckIcon class="ml-auto size-4"
                                   :class="attackTemplateSelectValue === tt.value ? 'opacity-100' : 'opacity-0'" />
                      </CommandItem>
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>
          <div class="w-full">
            <Button class="w-full"
                    :disabled="attackRunning"
                    v-if="!attackRunning && !attackComplete"
                    @click="startAttack">
              <PocketKnifeIcon class="mr-2 size-4" /> Start attack
            </Button>
            <Button class="w-full"
                    :disabled="attackRunning"
                    v-if="attackRunning">
              <RefreshCwIcon class="mr-2 size-4 animate-spin" /> Attack running...
            </Button>
            <Button class="w-full"
                    v-if="attackComplete && !attackRunning">
              <ScrollText class="mr-2 size-4" /> View report
            </Button>
          </div>
        </div>
      </div>
      <Separator />
      <div class="h-screen justify-center space-y-2 overflow-y-auto bg-muted/50 p-1 text-sm">
        <div v-for="result in endpointStore.results"
             :key="result.id"
             class="flex flex-col items-start gap-2 rounded-md border bg-background/95 p-3 text-left text-sm transition-all hover:bg-accent/50">
          <Badge variant="outline"
                 class="border-green-600/20 bg-green-50 px-1 text-green-700">
            <div class="text-2xs font-semibold uppercase">
              Success
            </div>
          </Badge>
          <span class="text-xs text-muted-foreground">{{ result.request }}</span>
        </div>
        <div v-if="endpointStore.results.length < 1"
             class="text-foreground-muted p-8 font-medium">
          No results yet. Start an attack.
        </div>
      </div>
    </div>
    <div v-else
         class="p-8 text-center text-muted-foreground">
      No endpoint selected
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Archive, ArchiveX, Clock, Forward, MoreVertical, PocketKnifeIcon, RefreshCwIcon, Reply, ReplyAll, ScrollText, Trash2 } from 'lucide-vue-next'
import { computed, ref } from 'vue'
import { addDays, addHours, format, nextSaturday } from 'date-fns'
import { Calendar } from '@/components/ui/calendar'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { Badge } from '@/components/ui/badge'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import { CaretSortIcon, CheckIcon } from '@radix-icons/vue'
import type { Endpoint } from '@/stores/endpoint'
import { useEndpointStore } from '@/stores/endpoint'
interface EndpointDisplayProps {
  endpoint: Endpoint | undefined
}

const endpointStore = useEndpointStore()
const attackTemplateSelectOpen = ref(false)
const attackTemplateSelectValue = ref('')
const attackRunning = computed(() => endpointStore.attackRunning)
const attackComplete = computed(() => endpointStore.attackComplete)
const props = defineProps<EndpointDisplayProps>()

const today = new Date()

const startAttack = () => {
  if (props.endpoint) {
    endpointStore.startAttack(props.endpoint)
  }
}

const clearResults = () => {
  if (props.endpoint) {
    endpointStore.clearResults(props.endpoint)
  }
}

const testTypes = [
  { value: '-', label: '-' },
  { value: 'botnet', label: 'botnet' },
  { value: 'bottle', label: 'bottle' },
  { value: 'bouqueteditor_project', label: 'bouqueteditor_project' },
  { value: 'bower', label: 'bower' },
  { value: 'box', label: 'box' },
  { value: 'box-storage', label: 'box-storage' },
  { value: 'bplugins', label: 'bplugins' },
  { value: 'bqe', label: 'bqe' },
  { value: 'brafton', label: 'brafton' },
  { value: 'brandfolder', label: 'brandfolder' },
  { value: 'brave', label: 'brave' },
  { value: 'bravenewcoin', label: 'bravenewcoin' },
  { value: 'bravia', label: 'bravia' },
  { value: 'breach-forums', label: 'breach-forums' },
  { value: 'bricks', label: 'bricks' },
  { value: 'wowcms', label: 'wowcms' },
  { value: 'wowhead', label: 'wowhead' },
  { value: 'wowjoomla', label: 'wowjoomla' },
  { value: 'wowonder', label: 'wowonder' },
  { value: 'wowthemes', label: 'wowthemes' },
  { value: 'wowza', label: 'wowza' },
  { value: 'wp', label: 'wp' },
]
</script>
