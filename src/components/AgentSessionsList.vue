<template>
  <ScrollArea class="flex h-screen">
    <div class="flex flex-1 flex-col gap-2 p-4 pt-0">
      <TransitionGroup name="list"
                       appear>
        <button v-for="item of items"
                :key="item.id"
                :class="cn(
                  'flex flex-col items-start gap-2 rounded-md border p-3 text-left text-sm transition-all hover:bg-accent/50 bg-background/95',
                  selectedSession === item.id && 'bg-muted',
                )"
                @click="selectedSession = item.id">
          <div class="flex w-full flex-col gap-1">
            <div class="flex w-full items-center">
              <div class="flex w-full items-center gap-2">
                <Badge variant="outline">
                  <div class="text-2xs font-semibold">
                    {{ item.id }}
                  </div>
                </Badge>
                <div class="flex w-full justify-between">
                  <div class="text-xs font-semibold">{{ item.domain }}</div>
                  <div v-if="item.messages.length > 0"
                       class="text-right text-xs font-semibold">{{ item.messages.length }} message{{
                        item.messages.length === 1 ? '' : 's' }}</div>
                </div>
              </div>
            </div>

            <div class="flex items-center justify-between gap-2">
              <div class="text-xs font-medium text-muted-foreground">
                {{ item.description }}
              </div>
              <div class="ml-auto text-xs"
                   :class="selectedSession === item.id ? 'text-foreground' : 'text-muted-foreground'">
                {{ formatDistanceToNow(new Date(item.created_at), { addSuffix: true }) }}
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
import { formatDistanceToNow } from 'date-fns'
import { ScrollArea } from '@/components/ui/scroll-area'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import type { AgentSession } from '@/stores/agent'

interface AgentSessionListProps {
  items: AgentSession[]
}

defineProps<AgentSessionListProps>()
const selectedSession = defineModel<number>('selectedSession', { required: false })
</script>
