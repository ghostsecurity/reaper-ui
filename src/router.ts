import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

import InboxMain from './components/InboxMain.vue'
import ExploreMain from './components/ExploreMain.vue'
import ReplayMain from './components/ReplayMain.vue'
import LogsMain from './components/LogsMain.vue'
import ScanMain from './components/ScanMain.vue'

const routes: Array<RouteRecordRaw> = [
  { path: '/', name: 'root', component: InboxMain },
  { path: '/inbox', name: 'inbox', component: InboxMain },
  { path: '/replay', name: 'replay', component: ReplayMain },
  { path: '/explore', name: 'explore', component: ExploreMain },
  { path: '/collaborate', name: 'collaborate', component: ExploreMain },
  { path: '/scan', name: 'scan', component: ScanMain },
  { path: '/logs', name: 'logs', component: LogsMain },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router