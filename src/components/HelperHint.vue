<template>
  <div v-if="showHint"
       class="px-4 pt-4">
    <Alert>
      <div class="flex items-center gap-2">
        <BadgeInfo class="size-4 text-primary" />
        <AlertTitle class="mb-0">Heads up!</AlertTitle>
        <span class="ml-auto cursor-pointer"
              @click="hideHint">
          ×
        </span>
      </div>
      <AlertDescription class="mt-1">
        <slot />
      </AlertDescription>
    </Alert>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { BadgeInfo } from 'lucide-vue-next'

interface HelperHintProps {
  hintKey: string
}

const showHint = ref(true)
const props = defineProps<HelperHintProps>()
const hintKey = `reaper.hint.${props.hintKey}`

const hideHint = () => {
  showHint.value = false
  localStorage.setItem(hintKey, 'false')
}

onMounted(() => {
  // if local storage has hintKey, don't show
  if (localStorage.getItem(hintKey)) {
    showHint.value = false
  }
})
</script>
