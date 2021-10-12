import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Sound from '../views/Sound.vue'
import Contact from '../views/Contact.vue'
import Auth from '../views/Auth.vue'
import Cart from '../views/Cart.vue'
import Account from '../views/Account.vue'
import Success from '../views/Success.vue'
import Cancelled from '../views/Cancelled.vue'
import { projectAuth } from '@/firebase/config.js'

const requireAuth = (to, from, next) => {
  let user = projectAuth.currentUser
  if (!user) {
    next( '/auth' )
  } else {
    next()
  }
}

const requireNoAuth = (to, from, next) => {
  let user = projectAuth.currentUser
  if (user) {
    next( '/account' )
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
    path: '/auth',
    name: 'Auth',
    component: Auth,
    beforeEnter: requireNoAuth
  },
  {
    path: '/cart',
    name: 'Cart',
    component: Cart,
    beforeEnter: requireAuth
  },
  {
    path: '/account',
    name: 'Account',
    component: Account,
    beforeEnter: requireAuth
  },
  {
    path: '/success',
    name: 'Success',
    component: Success,
    beforeEnter: requireAuth
  },
  {
    path: '/cancelled',
    name: 'Cancelled',
    component: Cancelled,
    beforeEnter: requireAuth
  } 
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
