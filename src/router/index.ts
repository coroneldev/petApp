import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
//import HomePage from '../views/HomePage.vue'
import Ingreso from '@/views/Ingreso.vue';
import Dashboard from '@/views/Dashboard.vue';

const routes: Array<RouteRecordRaw> = [
  /* {
     path: '/',
     redirect: '/home'
   },
   {
     path: '/home',
     name: 'Home',
     component: HomePage
   }*/
  {
    path: '/',
    redirect: '/ingreso'
  },
  {
    path: '/ingreso',
    name: 'Ingreso',
    component: Ingreso
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
