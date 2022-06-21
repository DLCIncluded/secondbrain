import { createStore } from 'vuex'
import axios from 'axios'
import router from '@/router/index.js'

export default createStore({
	state: {
		isLoggedIn: false,
		username: '',
		email: '',
		token: '',
		isadmin: false,
		lists: {},
		show: false,
	},
	getters: {
	},
	mutations: {
		initialiseStore(state){
			//check if we have a state stored
			if(localStorage.getItem('store')){
				//replace current state with the stored copy
				this.replaceState(Object.assign(state, JSON.parse(localStorage.getItem('store'))))
			};
		},
		updateUserId(state){
			state.userid='asdf'
		},
		updateLists(state, lists){
			state.lists = lists
		},
		login(state, user){
			state.isLoggedIn = true
			state.username = user.username
			state.email = user.email
			state.token = user.token
			state.isadmin = user.isadmin
		},
		logout(state){
			state.isLoggedIn = false
			state.username = null
			state.email = null
			state.token = null
			state.isadmin = null
			state.show = false
		},
		show(state, show){
			state.show = show
		},
	},
	actions: {
		login({commit},payload){
			// let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyYjA4OWM2YzBkMTdiMjU0NzlmNmMzMSIsImlhdCI6MTY1NTczNzA5MywiZXhwIjoxNjU4MzI5MDkzfQ.zcqxW5pBBESUhdAdNC7sFXOJrLOckytjmA07irT9EAM'
			let formdata = {
				'username': payload.username,
				'password': payload.password
			}
			axios.post('/users/login', formdata).then(res => {
				// console.log(res.data)
				router.replace('/');
				commit('login', res.data)
			}).catch((error)=>{
				console.log(error.response.data)
			})
		},
		register({commit},payload){
			// let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyYjA4OWM2YzBkMTdiMjU0NzlmNmMzMSIsImlhdCI6MTY1NTczNzA5MywiZXhwIjoxNjU4MzI5MDkzfQ.zcqxW5pBBESUhdAdNC7sFXOJrLOckytjmA07irT9EAM'
			// let formdata = {
			// 	'username': payload.username,
			// 	'email': payload.email,
			// 	'password': payload.password
			// }
			axios.post('/users/', payload).then(res => {
				// console.log(res.data)
				router.replace('/');
				commit('login', res.data)
			}).catch((error)=>{
				console.log(error.response.data)
			})
		},
		checkAdmin({commit,state}){
			axios.get('/users/check', {headers: { 'Authorization': 'Bearer '+state.token}}).then(res => {
				console.log(res.data)
				commit('show', true)
			}).catch((error)=>{
				console.log(error.response.data)
				commit('show', false)
				commit('logout')
				router.replace('/');
			})
		}
	},
	modules: {
	}
})
