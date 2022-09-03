import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import 'materialize-css/dist/css/materialize.min.css'
import 'material-design-icons/iconfont/material-icons.css'
import { projectAuth } from './firebase/config.js'

// let app = createApp(App).use(store).use(router)

const pinia = createPinia()
let app

projectAuth.onAuthStateChanged(() => {
  if (!app) {
    app = createApp(App)
      .use(router)
      .use(pinia)
    app.mount('#app')
  }
})
