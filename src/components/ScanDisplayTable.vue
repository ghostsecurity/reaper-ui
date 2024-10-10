<script setup lang="ts">
import tasks from './tabledata/tasks.json'
import DataTable from './table/DataTable.vue'
import { columns } from './table/columns'
</script>

<template>
  <div class="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
    <DataTable :data="tasks"
               :columns="columns" />
  </div>
</template>