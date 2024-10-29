<template>
  <Badge variant="outline"
         class="rounded-sm px-1 py-0"
         :class="badgeColorFromStatus(code)">
    <div class="text-2xs font-semibold">
      <slot />
    </div>
  </Badge>
</template>

<script lang="ts" setup>
import { Badge } from '@/components/ui/badge'

defineProps<{
  code: number
}>()

function badgeColorFromStatus(code: number) {
  if (code < 0)
    return 'bg-gray-50 border-gray-500/10 text-gray-600'

  if (code >= 0 && code < 300)
    return 'bg-green-50 border-green-600/20 text-green-700'

  if (code >= 300 && code < 400)
    return 'bg-yellow-50 border-yellow-600/20 text-yellow-700'

  return 'bg-red-50 border-red-600/20 text-red-700'
}</script>