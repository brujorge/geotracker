import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
const routerOptions = [
  {path:'/dashboard', component: 'Dashboard'},
  {path:'/nuevo', component: 'NuevoTrabajo'},
  {path:'/historial', component: 'Historial'},
  {path:'/*', component: 'NotFound'},
]
const routes = routerOptions.map(route => {
  return {
    ...route,
    component: () => import(`@/components/${route.component}.vue`)
  }
})

const router = new Router({
  routes,
  mode: 'history'
})

export default router