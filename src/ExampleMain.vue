<template>
  <div class="hidden h-full md:flex">
    <div class="flex w-64 flex-col">
      <div class="p-2">
        <AccountSwitcher :is-collapsed="false"
                         :accounts="accounts" />
      </div>
      <Separator />
      <SideNav :is-collapsed="false" />
      <Separator />
      <SideNavSecondary :is-collapsed="false" />
      <div class="mt-auto">
        <Separator />
        <div class="my-3 ml-5 flex cursor-pointer items-center space-x-2 text-xs font-medium"
             @click="config.toggleThemeDark()">
          <Icon icon="lucide:moon"
                class="size-4" />
          <span>Mode</span>
          <div class="mx-4 flex-none rounded-full"
               :class="wsConnected ? 'bg-green-400/20 p-1 text-green-400' : 'bg-red-500/20 p-1 text-red-500'">
            <div class="size-2 rounded-full bg-current"></div>
          </div>
        </div>
      </div>
    </div>
    <router-view />
  </div>
</template>

<script lang="ts" setup>
import { Icon } from '@iconify/vue'
import AccountSwitcher from '@/components/AccountSwitcher.vue'
import SideNav from '@/components/SideNav.vue'
import SideNavSecondary from './components/SideNavSecondary.vue'
import Separator from '@/components/ui/separator/Separator.vue'
import { useConfigStore } from '@/stores/config'

import { accounts } from '@/data/mails'

defineProps<{
  wsConnected: boolean
}>()

const config = useConfigStore()
</script>
