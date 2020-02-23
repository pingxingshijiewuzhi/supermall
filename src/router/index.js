import Vue from 'vue'
import Router from 'vue-router'

const Home = ()=>import('../views/home/home.vue')
const Category = ()=>import('../views/category/category.vue')
const Shopcart = ()=>import('../views/cart/shopcart.vue')
const Profile = () => import('../views/profile/profile.vue')
const Detail = () => import ('../views/detail/Detail.vue')
Vue.use(Router)

const routes = [
  {
    path: '',
    redirect:'/home'
  },
    {
        path: '/home',
        component:Home
      },
      {
        path: '/category',
        component:Category 
      },
      {
        path: '/shopcart',
        component:Shopcart
      },
      {
        path: '/profile',
        component:Profile
      },
      {
        path: '/detail/:iid',
        component:Detail
      }
]

const router = new Router({
    routes,
    mode:'history'
})
export default router