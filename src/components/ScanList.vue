<template>
  <Table>
    <TableCaption>Recently scanned domains.</TableCaption>
    <TableHeader>
      <TableRow>
        <TableHead class="w-[200px]">
          Domain
        </TableHead>
        <TableHead class="text-center">
          Hosts
        </TableHead>
        <TableHead class="text-center">
          First Scan
        </TableHead>
        <TableHead class="text-center">
          Last Scan
        </TableHead>
      </TableRow>
    </TableHeader>
    <TableBody class="text-xs">
      <TableRow v-for="domain in filteredDomains"
                :key="domain.name"
                class="cursor-pointer">
        <TableCell class="font-medium">
          {{ domain.name }}
        </TableCell>
        <TableCell class="text-center">{{ domain.hosts }}</TableCell>
        <TableCell class="text-center">{{ domain.first_seen }}</TableCell>
        <TableCell class="text-center">
          {{ domain.last_seen }}
        </TableCell>
      </TableRow>
    </TableBody>
  </Table>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useScanStore } from '@/stores/scan'

const scanStore = useScanStore()
const domains = computed(() => scanStore.domains)
const selectedDomain = ref<string>("")

interface ScanListProps {
  filter: string
}

const props = defineProps<ScanListProps>()

const filteredDomains = computed(() => {
  if (props.filter === '') {
    return domains.value
  }
  return domains.value.filter((domain) => domain.name.includes(props.filter))
})

onMounted(() => {
  console.log('ScanList.vue', 'onMounted')
  scanStore.getDomains()
})
</script>
