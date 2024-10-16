<template>
  <div class="flex h-full flex-col">
    <div class="flex items-center p-2">
      <div class="flex items-center gap-2">
        <Tooltip>
          <TooltipTrigger as-child>
            <Button variant="ghost"
                    size="icon">
              <Archive class="size-4" />
              <span class="sr-only">Archive</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>Archive</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger as-child>
            <Button variant="ghost"
                    size="icon">
              <ArchiveX class="size-4" />
              <span class="sr-only">Move to junk</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>Move to junk</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger as-child>
            <Button variant="ghost"
                    size="icon">
              <Trash2 class="size-4" />
              <span class="sr-only">Move to trash</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>Move to trash</TooltipContent>
        </Tooltip>
      </div>
      <div class="ml-auto flex items-center gap-2">
      </div>
      <Separator orientation="vertical"
                 class="mx-2 h-6" />
      <DropdownMenu>
        <DropdownMenuTrigger as-child>
          <Button variant="ghost"
                  size="icon">
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
    <div class="p-8 text-center text-sm text-muted-foreground">
      To explore hosts and endpoints, start browsing using the Reaper proxy.
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Archive, ArchiveX, MoreVertical, Trash2 } from 'lucide-vue-next'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
</script>