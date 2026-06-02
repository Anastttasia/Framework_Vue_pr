import { createApp } from 'vue'
import { Quasar, Notify, Dialog } from 'quasar'
import { createPinia } from 'pinia'

import router from './router'
import App from './App.vue'

import '@quasar/extras/material-icons/material-icons.css'
import 'quasar/src/css/index.sass'

const app = createApp(App)

app.use(Quasar, {
  plugins: { Notify, Dialog },
  config: {
    notify: {
      position: 'top-right'
    }
  }
})

const pinia = createPinia()

app.use(pinia)
app.use(router)

app.mount('#app')
