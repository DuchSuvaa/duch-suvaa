import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'materialize-css/dist/css/materialize.min.css'
import 'material-design-icons/iconfont/material-icons.css'
import { projectAuth } from '@/firebase/config.js'

// let app = createApp(App).use(store).use(router)

let app

projectAuth.onAuthStateChanged(() => {
  if (!app) {
    app = createApp(App)
      .use(router)
      .use(store)
    app.mount('#app')
  }
})
