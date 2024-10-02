import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

import InboxMain from './components/InboxMain.vue'
import ExploreMain from './components/ExploreMain.vue'
import LogsMain from './components/LogsMain.vue'

const routes: Array<RouteRecordRaw> = [
  { path: '/', name: 'Root', component: InboxMain },
  { path: '/inbox', name: 'Inbox', component: InboxMain },
  { path: '/explore', name: 'Explore', component: ExploreMain },
  { path: '/logs', name: 'Logs', component: LogsMain },
  ]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router