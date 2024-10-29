<template>
  <div class="flex h-full flex-col">
    <div class="flex items-center p-2">
      <div class="flex items-center gap-2">
        <Tooltip>
          <TooltipTrigger as-child>
            <Button variant="ghost"
                    size="icon"
                    :disabled="!request">
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
                    :disabled="!request">
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
                    :disabled="!request">
              <Trash2 class="size-4" />
              <span class="sr-only">Move to trash</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>Move to trash</TooltipContent>
        </Tooltip>
        <Separator orientation="vertical"
                   class="mx-1 h-6" />
        <Tooltip>
          <Popover>
            <PopoverTrigger as-child>
              <TooltipTrigger as-child>
                <Button variant="ghost"
                        size="icon"
                        :disabled="!request">
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
                    :disabled="!request">
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
                    :disabled="!request">
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
                    :disabled="!request">
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
                  :disabled="!request">
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
    <div v-if="request"
         class="flex flex-1 flex-col">
      <div class="flex items-start p-4">
        <div class="flex items-start gap-4 text-sm">
          <Avatar>
            <AvatarFallback>
              {{ mailFallbackName }}
            </AvatarFallback>
          </Avatar>
          <div class="grid gap-1">
            <div class="font-semibold">
              {{ request.url }}
            </div>
            <div class="line-clamp-1 text-xs">
              {{ request.method }} / res: {{ request.response.content_length }}
            </div>
            <div class="flex items-center justify-between gap-2 text-xs">
              <div>
                <span class="font-medium">Status:</span> {{ request.response.status }}
              </div>
              <div>
                {{ request.response.content_type }}
              </div>
            </div>
          </div>
        </div>
        <div v-if="request.created_at"
             class="ml-auto text-xs text-muted-foreground">
          {{ format(new Date(request.created_at), "PPpp") }}
        </div>
      </div>
      <Separator />
      <div class="h-screen space-y-2 overflow-y-auto whitespace-pre-wrap bg-muted/50 p-2 text-sm text-foreground/80">
        <div class="rounded-md bg-background shadow-sm">
          <div class="rounded-t-md bg-muted p-2 text-xs font-semibold">
            Request Headers
          </div>
          <textarea class="min-h-48 w-full resize-y whitespace-pre rounded-sm bg-background p-2 font-mono text-xs focus:outline-none"
                    name=""
                    spellcheck="false"
                    v-model="headersText"></textarea>
        </div>
        <div class="rounded-md bg-background shadow-sm">
          <div class="rounded-t-md bg-muted p-2 text-xs font-semibold">
            Request Body
          </div>
          <textarea class="min-h-64 w-full resize-y whitespace-pre rounded-sm bg-background p-2 font-mono text-xs focus:outline-none"
                    name=""
                    spellcheck="false"
                    v-model="bodyText"></textarea>
        </div>
        <div class="rounded-md bg-background shadow-sm">
          <div class="rounded-t-md bg-muted p-2 text-xs font-semibold">
            Response
          </div>
          <textarea class="min-h-64 w-full resize-y whitespace-pre rounded-sm bg-background p-2 font-mono text-xs focus:outline-none"
                    name=""
                    disabled
                    spellcheck="false"
                    v-model="responseText"></textarea>
        </div>
      </div>
    </div>
    <div v-else
         class="p-8 text-center text-muted-foreground">
      No message selected
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Archive, ArchiveX, Clock, Forward, MoreVertical, Reply, ReplyAll, Trash2 } from 'lucide-vue-next'
import { computed } from 'vue'
import { addDays, addHours, format, nextSaturday } from 'date-fns'
import { Calendar } from '@/components/ui/calendar'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { type ReaperRequest } from '@/stores/request'

interface ReplayDisplayProps {
  request: ReaperRequest | undefined
}

const props = defineProps<ReplayDisplayProps>()

const headersText = computed(() => {
  if (props.request && props.request.headers.length > 0) {
    return formattedBody(props.request.headers)
  }
  return ''
})

const bodyText = computed(() => {
  if (props.request && props.request.body.length > 0) {
    return formattedBody(props.request.body)
  }
  return ''
})

const responseText = computed(() => {
  if (props.request && props.request.response.body.length > 0) {
    return formattedBody(props.request.response.body)
  }
  return ''
})

const mailFallbackName = computed(() => {
  return props.request?.url
    .split(' ')
    .map(chunk => chunk[0])
    .join('')
})

const today = new Date()

const formattedBody = (body: string) => {
  try {
    return JSON.stringify(JSON.parse(body), null, 2)
  }
  catch {
    return body
  }
}
</script>
