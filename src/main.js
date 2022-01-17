import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createRouter, createWebHistory } from 'vue-router'
import dayjs from 'dayjs'

import App from './App.vue'
import Home from '@/views/Home.vue'
import useTodo from '@/stores/useTodo'

import './tailwind.css'

const routes = [{ path: '/', component: Home }]
const router = createRouter({
  history: createWebHistory(),
  routes
})

const app = createApp(App)

app.config.globalProperties.$dayjs = dayjs

app.use(router).use(createPinia())

// init store todos
const store = useTodo()
store.init()

app.mount('#app')
