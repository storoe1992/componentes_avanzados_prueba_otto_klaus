import Vue from 'vue'
import VueRouter from 'vue-router'
const Juguetes = () => import('../views/Juguetes')
const Juguete = () => import('../views/Juguete')
const Home = () => import('../views/Home')
import Login from '../views/Login.vue'
import Firebase from 'firebase'


Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    component: Login
  },
  {
    path: '*',
    redirect: '/login'
  },
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/home',
    component: Home,
    meta: {
      login: true
    },
    children : [
      {
        path: '/list',
        name: 'Juguetes',
        component: Juguetes,
        meta: {
          login: true
        },
      },
      {
        path: '/juguete',
        component: Juguete,
        meta: {
          login: true
        },
      },
      {
        path: '/juguete/:jugueteid',
        props:true,
        component: Juguete,
        meta: {
          login: true
        },
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to,from,next) => {
  let user = Firebase.auth().currentUser;
  let authRequeired = to.matched.some(route => route.meta.login);
  if(user && authRequeired){
    next();
  }else if(!authRequeired){
    next();
  }else if(from && from.name != 'Login'){
    next('/login');
  }
});

export default router
