<template>
  <ScrollArea class="flex h-screen">
    <div class="flex flex-1 flex-col gap-2 p-2 pt-0">
      <div>
        <ul class="space-y-0.5 text-sm">
          <li v-for="(host, index) in hosts"
              :key="host.name + index">
            <div class="flex items-center justify-between rounded-md bg-secondary px-2 py-1">
              <span class="text-xs font-semibold">{{ host.name }}</span>
              <span v-if="host.endpoints?.length > 0"
                    class="text-xs font-semibold text-muted-foreground">{{ host.endpoints.length }}</span>
            </div>
            <ul v-if="host.endpoints"
                class="pl-2 pt-1 text-xs">
              <li v-for="(endpoint, jdx) in host.endpoints"
                  :key="endpoint.path + jdx">
                <div class="flex items-center">
                  <svg width="18"
                       height="26"
                       viewBox="0 0 18 44"
                       fill="none"
                       stroke="currentColor"
                       xmlns="http://www.w3.org/2000/svg"
                       class="-top-2 left-4 text-foreground">
                    <path d="M1 -4 V18"
                          stroke-width="2" />
                    <path v-if="jdx != host.endpoints.length - 1"
                          d="M1 -4 V48"
                          stroke-width="2" />
                    <path d="M1 14V17.5C1 20.2614 3.23858 22.5 6 22.5H15"
                          stroke-width="2" />
                  </svg>
                  <div class="my-1 w-full cursor-pointer rounded-sm pr-1 hover:bg-secondary">
                    <span
                          class="rounded-sm border border-green-300 bg-green-100 px-0.5 text-2xs font-medium text-green-700">GET</span>
                    <span class="ml-1 text-foreground/80">{{ endpoint.path }}</span>
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <div>
        <Button @click="exploreStore.addHost({ name: 'api.homedepot.com', endpoints: [] })">Add Host</Button>
        <Button @click="exploreStore.addEndpoint('api.homedepot.com', { path: '/foo/bar' })">Add Endpoint</Button>
      </div>
    </div>
  </ScrollArea>
</template>

<style scoped>
.list-move,
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(15px);
}

.list-leave-active {
  position: absolute;
}
</style>

<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Button } from '@/components/ui/button'
import { useExploreStore } from '@/stores/explore'

const exploreStore = useExploreStore()
const { hosts } = storeToRefs(exploreStore)

// type Host = {
//   id: number
//   name: string
//   endpoints: Endpoint[]
// }

// type Endpoint = {
//   id: number
//   name: string
// }

// const hosts: Host[] = [
//   {
//     id: 1,
//     name: 'homedepot.com',
//     endpoints: [],
//   },
//   {
//     id: 2,
//     name: 'hdstatic.com',
//     endpoints: [
//       {
//         id: 10,
//         name: '/api/v1/accounts',
//       },
//       {
//         id: 11,
//         name: '/users',
//       },
//       {
//         id: 12,
//         name: '/products',
//       },
//     ],
//   },
//   {
//     id: 3,
//     name: 'hdx.com',
//     endpoints: [],
//   },
//   {
//     id: 4,
//     name: 'thehomedepot.com',
//     endpoints: [],
//   },
// ]

</script>