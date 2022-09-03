import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Sound from '../views/Sound.vue'
import Contact from '../views/Contact.vue'
import Auth from '../views/Auth.vue'
import Cart from '../views/Cart.vue'
import Completed from '../views/Completed.vue'
import Account from '../views/Account.vue'
import PrivacyPolicy from '../views/PrivacyPolicy.vue'
import Cookies from '../views/Cookies.vue'
import { projectAuth } from '../firebase/config.js'

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
    path: '/cart/completed',
    name: 'Completed',
    component: Completed,
    beforeEnter: requireAuth
  },
  {
    path: '/account',
    name: 'Account',
    component: Account,
    beforeEnter: requireAuth
  },
  {
    path: '/privacy',
    name: 'PrivacyPolicy',
    component: PrivacyPolicy,
    beforeEnter: requireAuth
  },
  {
    path: '/cookies',
    name: 'Cookies',
    component: Cookies,
    beforeEnter: requireAuth
  }
]

const router = createRouter({
  // history: createWebHistory(process.env.BASE_URL),
  history: createWebHistory(),
  routes
})

export default router
