<template>
  <Table>
    <TableCaption>Recently scanned domains.</TableCaption>
    <TableHeader>
      <TableRow>
        <TableHead class="w-[240px]">
          Domain
        </TableHead>
        <TableHead class="text-center">
          Hosts
        </TableHead>
        <TableHead class="text-center">
          Last Scan
        </TableHead>
      </TableRow>
    </TableHeader>
    <TableBody class="text-xs">
      <TableRow v-for="(domain, index) in filteredDomains"
                :key="domain.name"
                class="cursor-pointer"
                @click="handleRowClick(index)"
                :class="selectedDomainIdx === index ? 'bg-muted/50' : ''">
        <TableCell class="flex items-center font-normal">
          <span class="mr-1 w-0.5 pr-0.5"
                :class="selectedDomainIdx === index ? 'bg-primary' : 'bg-transparent'">&nbsp;</span>
          {{ domain.name }} <span class="ml-2 size-4">
            <LoaderCircle v-if="domain.status === 'pending'"
                          class="size-4 animate-spin" />
          </span>
        </TableCell>
        <TableCell class="text-center font-medium">{{ utils.customNumberFormat(domain.host_count || 0) }}</TableCell>
        <TableCell class="text-center">
          {{ domain.last_scanned_at }}
        </TableCell>
      </TableRow>
    </TableBody>
  </Table>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted } from 'vue'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { LoaderCircle } from 'lucide-vue-next'
import { useScanStore } from '@/stores/scan'
import { useUtilStore } from '@/utils'

const scanStore = useScanStore()
const domains = computed(() => scanStore.domains)
const selectedDomainIdx = ref<number>(0)

interface ScanListProps {
  filter: string
}

const utils = useUtilStore()
const props = defineProps<ScanListProps>()

const filteredDomains = computed(() => {
  if (props.filter === '') {
    return domains.value
  }
  return domains.value.filter((domain) => domain.name.includes(props.filter))
})

// New functions for keyboard navigation
const handleKeyDown = (event: KeyboardEvent) => {
  if (event.key === 'ArrowUp') {
    event.preventDefault()
    moveSelection(-1)
  } else if (event.key === 'ArrowDown') {
    event.preventDefault()
    moveSelection(1)
  }
}

const moveSelection = (direction: number) => {
  const newIndex = selectedDomainIdx.value + direction
  if (newIndex >= 0 && newIndex < filteredDomains.value.length) {
    selectedDomainIdx.value = newIndex
    scanStore.selectDomain(filteredDomains.value[newIndex].id)
  }
}

const handleRowClick = (idx: number) => {
  selectedDomainIdx.value = idx
  scanStore.selectDomain(filteredDomains.value[idx].id)
}

onMounted(() => {
  console.log('ScanList.vue', 'onMounted')
  scanStore.getDomains()

  // Add event listener for keyboard navigation
  window.addEventListener('keydown', handleKeyDown)
})

onUnmounted(() => {
  // Remove event listener when component is unmounted
  window.removeEventListener('keydown', handleKeyDown)
})
</script>
