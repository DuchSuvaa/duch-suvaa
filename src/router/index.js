import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Sound from '../views/Sound.vue'
import Contact from '../views/Contact.vue'
import Admin from '../views/Admin.vue'
import Add from '../views/Add.vue'
import { projectAuth } from '@/firebase/config.js'

const requireAuth = (to, from, next) => {
  let user = projectAuth.currentUser
  if (!user) {
    next( '/admin' )
  } else {
    next()
  }
}

const requireNoAuth = (to, from, next) => {
  let user = projectAuth.currentUser
  if (user) {
    next( '/add' )
  } else {
    next()
  }
}

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/sound',
    name: 'Sound',
    component: Sound
  },
  {
    path: '/contact',
    name: 'Contact',
    component: Contact
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin,
    beforeEnter: requireNoAuth
  },  {
    path: '/add',
    name: 'add',
    component: Add,
    beforeEnter: requireAuth
  }  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
