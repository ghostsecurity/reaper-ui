import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

import InboxMain from './components/InboxMain.vue'
import ExploreMain from './components/ExploreMain.vue'
import ReplayMain from './components/ReplayMain.vue'
import LogsMain from './components/LogsMain.vue'
import ScanMain from './components/ScanMain.vue'

const routes: Array<RouteRecordRaw> = [
  { path: '/', name: 'Root', component: InboxMain },
  { path: '/inbox', name: 'Inbox', component: InboxMain },
  { path: '/replay', name: 'Replay', component: ReplayMain },
  { path: '/explore', name: 'Explore', component: ExploreMain },
  { path: '/scan', name: 'Scan', component: ScanMain },
  { path: '/logs', name: 'Logs', component: LogsMain },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router