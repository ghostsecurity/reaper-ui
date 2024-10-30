<template>
  <div id="wrapper"
       class="flex h-full flex-col">
    <div id="header"
         class="flex flex-none flex-row items-center justify-between">
      <div class="flex items-center space-x-4 p-4">
        <Avatar>
          <AvatarImage src="/avatars/01.png"
                       alt="Image" />
          <AvatarFallback>OM</AvatarFallback>
        </Avatar>
        <div>
          <p class="text-sm font-medium leading-none">
            Reaper AI Agent
          </p>
          <p class="text-xs text-muted-foreground">
            reaper@ghostsecurity.ai
          </p>
        </div>
      </div>
    </div>
    <div id="messages"
         class="flex min-h-0 flex-1 flex-col justify-end overflow-y-auto">
      <div class="space-y-4 p-4">
        <div v-for="(message, index) in messages"
             :key="index"
             class="flex w-max max-w-[75%] flex-col gap-2 rounded-lg px-3 py-2 text-sm"
             :class="message.author_role !== 'agent' ? 'ml-auto bg-primary text-primary-foreground' : 'bg-muted'">
          {{ message.content }}
        </div>
      </div>
    </div>
    <div id="input"
         class="flex-none border-t bg-background p-4">
      <form class="flex w-full items-center space-x-2"
            @submit.prevent="handleUserMessageSubmit">
        <Input v-model="input"
               placeholder="Type a message..."
               class="flex-1" />
        <Button class="flex items-center justify-center p-2.5"
                type="submit"
                :disabled="inputLength === 0">
          <PaperPlaneIcon class="size-4" />
          <span class="sr-only">Send</span>
        </Button>
      </form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, watch } from 'vue'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { PaperPlaneIcon } from '@radix-icons/vue'
import type { AgentMessage } from '@/stores/agent'
import { useAgentStore } from '@/stores/agent'

interface AgentSessionMessagesProps {
  messages: AgentMessage[]
  selectedSessionId: number
}

const props = defineProps<AgentSessionMessagesProps>()
const agentStore = useAgentStore()
const input = ref('')
const inputLength = computed(() => input.value.trim().length)
const messages = computed(() => props.messages)

const handleUserMessageSubmit = () => {
  agentStore.sendUserMessage(props.selectedSessionId, input.value)
  input.value = ''
}

// when message list changes, reset input
watch(messages, () => {
  input.value = ''
})
</script>
