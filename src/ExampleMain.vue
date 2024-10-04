<template>
  <div class="hidden h-full md:flex">
    <div class="flex w-64 flex-col">
      <div class="p-2">
        <AccountSwitcher :is-collapsed="false"
                         :accounts="accounts" />
      </div>
      <Separator />
      <SideNav :is-collapsed="false"
               :links="links" />
      <Separator />
      <SideNav :is-collapsed="false"
               :links="links2" />
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
import { type LinkProp } from '@/components/SideNav.vue'
import Separator from '@/components/ui/separator/Separator.vue'
import { useConfigStore } from '@/stores/config'

import { accounts } from '@/data/mails'

defineProps<{
  wsConnected: boolean
}>()

const config = useConfigStore()
const links: LinkProp[] = [
  {
    title: 'Explore',
    label: '1,289',
    icon: 'lucide:earth',
    href: '/explore',
    shortcut: 'E'
  },
  {
    title: 'Scan',
    label: '9',
    icon: 'lucide:binoculars',
    shortcut: 'S',
    href: '/scan',
  },
  {
    title: 'Tamper/Attack',
    label: '',
    icon: 'lucide:pocket-knife',
    shortcut: 'T'
  },
  {
    title: 'Fuzz',
    label: '23k',
    icon: 'lucide:repeat-1',
    shortcut: 'F'
  },
  {
    title: 'Replay',
    label: '',
    icon: 'lucide:replace-all',
    href: '/replay',
    shortcut: 'R'
  },
  {
    title: 'Automate',
    label: '',
    icon: 'lucide:waypoints',
    shortcut: 'A'
  },
  {
    title: 'Collaborate',
    label: '',
    icon: 'lucide:users',
    shortcut: 'C'
  },
  {
    title: 'AI Assist',
    label: '',
    icon: 'lucide:brain-circuit',
    shortcut: 'X'
  },
  {
    title: 'Logs',
    label: '',
    icon: 'lucide:scroll-text',
    href: '/logs',
    shortcut: 'L'
  },
  {
    title: 'Inbox Temp',
    label: '1',
    icon: 'lucide:inbox',
    href: '/inbox',
    shortcut: 'I'
  },
  {
    title: 'Settings',
    label: '',
    icon: 'lucide:settings',
    shortcut: '.'
  },
]

const links2: LinkProp[] = [
  {
    title: 'Image',
    label: '972',
    icon: 'lucide:file-image',
  },
  {
    title: 'Font',
    label: '342',
    icon: 'lucide:file-type',
  },
  {
    title: 'CSS',
    label: '128',
    icon: 'lucide:file-axis-3d',
  },
  {
    title: 'JSON',
    label: '2.3MB',
    icon: 'lucide:file-json',
  },
  {
    title: 'Form',
    label: '21',
    icon: 'lucide:file-code',
  },
  {
    title: 'WebSocket',
    label: '2',
    icon: 'lucide:file-cog',
  },
  {
    title: 'Other',
    label: '21',
    icon: 'lucide:file-question',
  },
]
</script>
