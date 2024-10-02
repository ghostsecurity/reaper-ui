<template>
  <ScrollArea class="flex h-screen">
    <div class="divide-y divide-dashed divide-zinc-200 dark:divide-zinc-700">
      <TransitionGroup name="list" appear>
        <button
          v-for="item of items"
          :key="item.id"
          :class="cn(
            'px-3 py-2 text-left text-sm transition-all hover:bg-accent',
            selectedLog === item.id && 'bg-muted',
          )"
          @click="selectedLog = item.id"
        >
          <div class="flex w-full gap-1">
            <div class="flex w-56 space-x-2">
              <div class="text-xs text-muted-foreground">
                {{ formatDate(item.timestamp) }}
              </div>
              <div class="text-center text-xs font-semibold uppercase">
                {{ item.severity }}
              </div>
            </div>
            <div class="w-full">
              <div class="flex flex-wrap text-xs font-medium text-muted-foreground">
                {{ item.message }}
                <div v-for="value, key of rest(item)" :key="key" class="px-1 text-2xs">
                  <span class="log-key rounded-sm bg-blue-50 px-1 py-0 font-mono lowercase text-blue-500 dark:bg-blue-950 dark:text-blue-400">{{ value[0] }}:</span>
                  <span class="log-value pl-1 font-mono font-normal text-muted-foreground">{{ value[1] }}</span>
                </div>
              </div>
            </div>
          </div>
        </button>
      </TransitionGroup>
    </div>
  </ScrollArea>
</template>

<style scoped>
.list-move,
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(15px);
}

.list-leave-active {
  position: absolute;
}
</style>

<script lang="ts" setup>
import { format } from 'date-fns'
import type { Log } from '../data/logs'
import { ScrollArea } from '@/components/ui/scroll-area'
import { cn } from '@/lib/utils'

interface LogListProps {
  items: Log[]
}

defineProps<LogListProps>()
const selectedLog = defineModel<string>('selectedLog', { required: false })

function formatDate(dateString: string) {
  return format(new Date(dateString), 'MMM dd, hh:mm:ss a')
}

function rest(item: Log) {
  // for all keys except id, timestamp, and message, return as array of key-value pairs
  return Object.entries(item)
    .filter(([key]) => !['id', 'timestamp', 'message'].includes(key))
}



</script>
