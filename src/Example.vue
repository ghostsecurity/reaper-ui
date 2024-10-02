<template>
  <div class="hidden h-full md:flex">
    <div class="flex w-64 flex-col">
      <div class="p-2">
        <AccountSwitcher :is-collapsed="false" :accounts="accounts" />
      </div>
      <Separator />
      <SideNav :is-collapsed="false" :links="links" />
      <Separator />
      <SideNav :is-collapsed="false" :links="links2" />
      <div class="mt-auto">
        <Separator />
        <div class="my-3 ml-5 flex cursor-pointer items-center space-x-2 text-xs font-medium" @click="toggleDarkMode">
          <Icon icon="lucide:moon" class="size-4" />
          <span>Mode</span>
        </div>
      </div>
    </div>
    <router-view />
  </div>
</template>

<script lang="ts" setup>
import { Icon } from '@iconify/vue'
import AccountSwitcher from './components/AccountSwitcher.vue'
import SideNav from './components/SideNav.vue'
import { type LinkProp } from './components/SideNav.vue'

import { accounts } from './data/mails'
import Separator from './components/ui/separator/Separator.vue'

const toggleDarkMode = () => {
  document.documentElement.classList.toggle('dark')
}

const links: LinkProp[] = [
  {
    title: 'Explore',
    label: '1,289',
    icon: 'lucide:earth',
    href: '/explore',
  },
  {
    title: 'Inbox',
    label: '1',
    icon: 'lucide:inbox',
    href: '/inbox',
  },
  {
    title: 'Scan',
    label: '9',
    icon: 'lucide:binoculars',
  },
  {
    title: 'Tamper',
    label: '',
    icon: 'lucide:pocket-knife',
  },
  {
    title: 'Fuzz',
    label: '23k',
    icon: 'lucide:repeat-1',
  },
  {
    title: 'Replay',
    label: '',
    icon: 'lucide:replace-all',
  },
  {
    title: 'Automate',
    label: '',
    icon: 'lucide:waypoints',
  },
  {
    title: 'Collaborate',
    label: '',
    icon: 'lucide:users',
  },
  {
    title: 'AI Assist',
    label: '',
    icon: 'lucide:brain-circuit',
  },
  {
    title: 'Logs',
    label: '',
    icon: 'lucide:scroll-text',
    href: '/logs',
  },
  {
    title: 'Settings',
    label: '',
    icon: 'lucide:settings',
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
    label: '8',
    icon: 'lucide:file-json',
  },
  {
    title: 'Form',
    label: '21',
    icon: 'lucide:file-code',
  },
  {
    title: 'Other',
    label: '21',
    icon: 'lucide:file-question',
  },
]
</script>
