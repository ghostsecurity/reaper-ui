<template>
  <div class="flex h-screen w-full flex-col">
    <div class="flex h-10 items-center border-b bg-muted/50 px-4">
      <div class="flex items-center space-x-2">
        <Icon icon="lucide:monitor" class="h-4 w-4" />
        <span class="text-sm font-medium">Integrated Browser</span>
      </div>
    </div>
    <div class="relative flex-1 bg-background">
      <iframe 
        src="http://127.0.0.1:6080/vnc_lite.html?resize=remote&show_dot=true&show_ctrl=false&view_only=false"
        class="absolute inset-0 h-full w-full border-0"
        allow="fullscreen"
      ></iframe>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Icon } from '@iconify/vue'
</script>
