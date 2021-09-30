import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Sound from '../views/Sound.vue'
import Contact from '../views/Contact.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/Sound',
    name: 'Sound',
    component: Sound
  },
  {
    path: '/Contact',
    name: 'Contact',
    component: Contact
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
