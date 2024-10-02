<template>
  <TooltipProvider :delay-duration="0">
    <ResizablePanelGroup
      id="resize-panel-group-1"
      direction="horizontal"
      class="h-full items-stretch"
    >
      <ResizablePanel
        id="resize-panel-1"
        :default-size="defaultLayout[0]"
        :collapsed-size="navCollapsedSize"
        collapsible
        :min-size="10"
        :max-size="15"
        :class="cn(isCollapsed && 'min-w-[50px] transition-all duration-300 ease-in-out')"
        @expand="onExpand"
        @collapse="onCollapse"
      >
        <div :class="cn('flex h-[52px] items-center justify-center', isCollapsed ? 'h-[52px]' : 'px-2')">
          <AccountSwitcher :is-collapsed="isCollapsed" :accounts="accounts" />
        </div>
        <Separator />
        <Nav
          :is-collapsed="isCollapsed"
          :links="links"
        />
        <Separator />
        <Nav
          :is-collapsed="isCollapsed"
          :links="links2"
        />
      </ResizablePanel>
      <ResizableHandle id="resize-handle-1" with-handle />
      <ResizablePanel id="resize-panel-2" :default-size="defaultLayout[1]" :min-size="30">
        <Tabs default-value="all">
          <div class="flex items-center px-4 py-2">
            <h1 class="text-xl font-bold">
              Explore
            </h1>
            <TabsList class="ml-auto">
              <TabsTrigger value="all" class="text-zinc-600 dark:text-zinc-200">
                All mail
              </TabsTrigger>
              <TabsTrigger value="unread" class="text-zinc-600 dark:text-zinc-200">
                Unread
              </TabsTrigger>
            </TabsList>
          </div>
          <Separator />
          <div class="bg-background/95 p-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <form>
              <div class="relative">
                <Search class="absolute left-2 top-2.5 size-4 text-muted-foreground" />
                <Input v-model="searchValue" placeholder="filter..." class="pl-8" />
              </div>
            </form>
          </div>
          <TabsContent value="all" class="m-0">
            <MailList v-model:selected-mail="selectedMail" :items="filteredMailList" />
          </TabsContent>
          <TabsContent value="unread" class="m-0">
            <MailList v-model:selected-mail="selectedMail" :items="unreadMailList" />
          </TabsContent>
        </Tabs>
      </ResizablePanel>
      <ResizableHandle id="resiz-handle-2" with-handle />
      <ResizablePanel id="resize-panel-3" :default-size="defaultLayout[2]">
        <MailDisplay :mail="selectedMailData" />
      </ResizablePanel>
    </ResizablePanelGroup>
  </TooltipProvider>
</template>

<script lang="ts" setup>
import { Search } from 'lucide-vue-next'

import { computed, ref } from 'vue'
import { refDebounced } from '@vueuse/core'
import type { Mail } from '../data/mails'
import AccountSwitcher from './AccountSwitcher.vue'
import MailList from './MailList.vue'
import MailDisplay from './MailDisplay.vue'
import Nav, { type LinkProp } from './SideNav.vue'
import { cn } from '@/lib/utils'
import { Separator } from '@/components/ui/separator'
import { Input } from '@/components/ui/input'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs'
import { TooltipProvider } from '@/components/ui/tooltip'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable'
// data
import { accounts, mails } from '../data/mails'

const isCollapsed = ref(false)
const selectedMail = ref<string | undefined>(mails[0].id)
const searchValue = ref('')
const debouncedSearch = refDebounced(searchValue, 250)

const defaultLayout = ref([20, 20, 60])
const navCollapsedSize = ref(2)

const filteredMailList = computed(() => {
  let output: Mail[] = []
  const searchValue = debouncedSearch.value?.trim()
  if (!searchValue) {
    output = mails
  }
  else {
    output = mails.filter((item) => {
      return item.name.includes(debouncedSearch.value)
        || item.email.includes(debouncedSearch.value)
        || item.name.includes(debouncedSearch.value)
        || item.subject.includes(debouncedSearch.value)
        || item.text.includes(debouncedSearch.value)
    })
  }

  return output
})

const unreadMailList = computed(() => filteredMailList.value.filter(item => !item.read))

const selectedMailData = computed(() => mails.find(item => item.id === selectedMail.value))

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

function onCollapse() {
  isCollapsed.value = true
}

function onExpand() {
  isCollapsed.value = false
}
</script>