import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home'
import login from '@/components/login'
import register from '@/components/register'
import firebase from 'firebase'
Vue.use(Router)
const router =  new Router({
  routes: [
    {
      path: '*',
      redirect: '/login'
    },
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'login',
      component: login,
      meta: {
        autentificado: false
      } 
    },
    {
      path: '/register',
      name: 'register',
      component: register,
      meta: {
        autentificado: false
      } 
    },
    {
      path: '/home',
      name: 'home',
      component: home,
      meta: {
        autentificado: true
      },
      
    }
  ]
})

router.beforeEach((to, from, next) => {


  let usuario = firebase.auth().currentUser;
  console.log(usuario);
  let autorizacion = to.matched.some(record => record.meta.autentificado);


  if (autorizacion && !usuario){
    next('login');


  } else if (!autorizacion && usuario) {
    next('home');


  } else {
    next();
  }
})



export default router;
