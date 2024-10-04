<template>
  <Table>
    <TableCaption>Recently seen hosts.</TableCaption>
    <TableHeader>
      <TableRow>
        <TableHead class="w-[140px]">
          Host
        </TableHead>
        <TableHead>IP</TableHead>
        <TableHead>First Seen By</TableHead>
        <TableHead class="text-right">
          Last Seen
        </TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      <TableRow v-for="host in filteredHosts"
                :key="host.host"
                class="cursor-pointer">
        <TableCell class="font-medium">
          {{ host.host }}
        </TableCell>
        <TableCell>{{ host.ip }}</TableCell>
        <TableCell>{{ host.first_seen_by }}</TableCell>
        <TableCell class="text-right">
          {{ host.last_seen }}
        </TableCell>
      </TableRow>
    </TableBody>
  </Table>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

const props = defineProps<{
  inScope: boolean
}>()

const filteredHosts = computed(() => {
  return props.inScope ? hosts.filter((host) => host.in_scope) : hosts.filter((host) => !host.in_scope)
})

const hosts = [
  {
    host: 'example.com',
    ip: '192.168.1.1',
    first_seen_by: 'user',
    last_seen: '2021-01-01',
    in_scope: true,
  },
  {
    host: 'tesla.com',
    ip: '192.168.1.2',
    first_seen_by: 'user',
    last_seen: '2024-01-01',
    in_scope: false,
  },
  {
    host: 'ford.com',
    ip: '192.168.1.3',
    first_seen_by: 'user',
    last_seen: '2024-01-01',
    in_scope: true,
  },
  {
    host: 'puma.com',
    ip: '192.168.1.4',
    first_seen_by: 'user',
    last_seen: '2024-01-01',
    in_scope: true,
  },
  {
    host: 'nike.com',
    ip: '192.168.1.5',
    first_seen_by: 'user',
    last_seen: '2024-01-01',
    in_scope: false,
  },
  {
    host: 'adidas.com',
    ip: '192.168.1.6',
    first_seen_by: 'user',
    last_seen: '2024-01-01',
    in_scope: true,
  },
  {
    host: 'reebok.com',
    ip: '192.168.1.7',
    first_seen_by: 'user',
    last_seen: '2024-01-01',
    in_scope: true,
  },
  {
    host: 'converse.com',
    ip: '192.168.1.8',
    first_seen_by: 'user',
    last_seen: '2024-01-01',
    in_scope: false,
  },
  {
    host: 'underarmour.com',
    ip: '192.168.1.9',
    first_seen_by: 'user',
    last_seen: '2024-01-01',
    in_scope: true,
  },
  {
    host: 'newbalance.com',
    ip: '192.168.1.10',
    first_seen_by: 'user',
    last_seen: '2024-01-01',
    in_scope: true,
  },
]
</script>
