import { createRouter, createWebHistory } from 'vue-router'
import LeSeuil from '@/view/LeSeuil.vue'
import QuiSommesNous from '@/view/QuiSommesNous.vue'
import Contact from '@/view/Contact.vue'
import Rgpd from '@/view/Rgpd.vue'

const routes = [
  {
    path: '/',
    name: 'aux-origines',
    component: LeSeuil,
  },
  {
    path: '/qui-sommes-nous',
    name: 'qui-sommes-nous',
    component: QuiSommesNous,
  },
  {
    path: '/contact',
    name: 'contact',
    component: Contact,
  },
  {
    path: '/rgpd',
    name: 'rgpd',
    component: Rgpd,
  },
]

export default createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, _from, savedPosition) {
    if (savedPosition) return savedPosition
    if (to.hash) return { el: to.hash, behavior: 'smooth' }
    return { top: 0 }
  },
})
