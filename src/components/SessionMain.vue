<template>
  <div
       class="container relative hidden h-full flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
    <div class="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
      <div class="absolute inset-0 bg-zinc-900" />
      <div class="relative z-20 flex items-center text-lg font-bold tracking-tight">
        <svg xmlns="http://www.w3.org/2000/svg"
             viewBox="0 0 24 24"
             fill="none"
             stroke="currentColor"
             strokeWidth="2"
             strokeLinecap="round"
             strokeLinejoin="round"
             class="mr-2 size-6">
          <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
        </svg>
        Ghost Labs
      </div>
      <div class="relative z-20 mt-auto">
        <blockquote class="space-y-2">
          <p class="text-lg">
            &ldquo;In the midst of chaos, there is opportunity.&rdquo;
          </p>
          <footer class="text-sm">
            Sun Tzu
          </footer>
        </blockquote>
      </div>
    </div>
    <div class="lg:p-8">
      <div class="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[300px]">
        <div class="flex flex-col space-y-2 text-center">
          <div class="mx-auto size-48"><img src="../assets/reaper.svg"
                 alt="Reaper Logo" /></div>
          <h1 class="text-2xl font-bold tracking-tight">
            Welcome to Reaper
          </h1>
          <p class="text-sm text-muted-foreground">
            You are the admin, enter a name to continue.
          </p>
        </div>
        <Input v-model="userName"
               placeholder="Enter your username" />
        <div class="h-4 text-xs font-medium text-destructive">{{ errors }}</div>
        <Button @click="handleRegister">Sign in</Button>
        <div class="flex justify-between text-sm text-muted-foreground">
          <Button>
            <GithubIcon class="size-4" />
          </Button>
          <Button>
            <GhostIcon class="size-4" />
          </Button>
          <Button>
            <LinkedinIcon class="size-4" />
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { GithubIcon, GhostIcon, LinkedinIcon } from 'lucide-vue-next'
import { useSessionStore } from '@/stores/session'
import { useConfigStore } from '@/stores/config'
const sessionStore = useSessionStore()
const configStore = useConfigStore()
const userName = ref('Reaper Admin')
const route = useRoute()
const errors = computed(() => sessionStore.errors)

const handleRegister = () => {
  sessionStore.register({
    username: userName.value,
    invite_code: route.query.code as string,
  })
}

onMounted(() => {
  console.log('[theme]', configStore.theme)
})

</script>
