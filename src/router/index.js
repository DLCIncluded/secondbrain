import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import store from '../store/index'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/login',
    name: 'login',
	meta: {requiresUnAuth: true},
    component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue')
  },
  {
    path: '/register',
    name: 'register',
	meta: {requiresUnAuth: true},
    component: () => import(/* webpackChunkName: "about" */ '../views/Register.vue')
  },
  {
    path: '/admin',
    name: 'admin',
	meta: {requiresAdmin: true},
    component: () => import(/* webpackChunkName: "about" */ '../views/Admin.vue')
  },
  {
    path: '/friends',
    name: 'friends',
	meta: {requiresAuth: true},
    component: () => import(/* webpackChunkName: "about" */ '../views/Friends.vue')
  },
  {
    path: '/createlist',
    name: 'createlist',
	meta: {requiresAuth: true},
    component: () => import(/* webpackChunkName: "about" */ '../views/CreateList.vue')
  },
  {
    path: '/list/:id',
    name: 'list',
	meta: {requiresAuth: true},
    component: () => import(/* webpackChunkName: "about" */ '../views/ViewList.vue')
  },
  {
    path: '/lists/',
    name: 'lists',
	meta: {requiresAuth: true},
    component: () => import(/* webpackChunkName: "about" */ '../views/ViewLists.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach(function(to,from,next){
	if(to.meta.requiresAuth && !store.state.isLoggedIn){
		// if we need to be logged in and we are note logged 
		console.log('need to login first')
		// store.dispatch('addNotification', {
		// 	type: "error",
		// 	message: "Please Login to view that page."
		// });
		next('/login');
	} else if(to.meta.requiresUnAuth && store.state.isLoggedIn){
		console.log('already logged in')
		//if we shouldnt be logged in and try to get to something while logged in ie register / login
		next('/');
	} else {
		next();
	}
})

export default router
