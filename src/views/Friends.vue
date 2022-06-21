<template>
	<div class="home">
		<h1>Friends</h1>
		<div v-if="$store.state.isLoggedIn">
			username: {{$store.state.username}} <br>
			email: {{$store.state.email}} <br>
			token: <input type="text" :value="$store.state.token"> <br>
			isadmin: {{$store.state.isadmin}} <br>
		</div>
		
		<div>
			<h2>Friends ( {{friendsCount}} )</h2>
			<p v-for="friend in friends" :key="friend._id">
				{{friend.username}} - {{friend._id}} - <button @click="removeFriend(friend._id)">Remove</button>
			</p>
		</div>

		<div>
			<h2>Pending Requests( {{ requestsCount }} )</h2>
			
			<p v-for="request in requests" :key="request._id">
				{{request.requester.username}} - {{request.requester._id}} - <button @click="acceptRequest(request.requester._id)">Accept</button> - <button @click="declineRequest(request.requester._id)">Decline</button>
			</p>
		</div>

		<div>
			<h2>Sent Requests( {{ sentRequestsCount }} )</h2>
			<p v-for="request in sentRequests" :key="request._id">
				{{request.requestee.username}} - {{request.requestee._id}} - <button @click="declineRequest(request.requestee._id)">Cancel</button>
			</p>
		</div>

		<div>
			<h2>Search for friend</h2>
			<form @submit.prevent="search">
				<label for="username">Username:</label> <input type="text" name="username" id="username" v-model="userSearch">
				<button type="submit">Search</button>
			</form>
			<p v-for="user in users" :key="user._id">
				{{user.username}} - <button @click="sendRequest(user._id)">Send Request</button>
			</p>
		</div>

	</div>

</template>

<script>
import axios from 'axios'
export default {
	name: 'Friends',
	data(){
		return {
			friends: null,
			friendsCount: 0,
			requests: null,
			requestsCount: 0,
			sentRequests: null,
			sentRequestsCount: 0,
			users: null,
			userSearch: ''
		}
	},
	methods: {
		updatePage(){
			this.getFriends();
			this.getRequests();
			this.getSentRequests();
		},
		getFriends(){
			var v = this;
			axios.get('users/me', {headers: { 'Authorization': 'Bearer '+this.$store.state.token}}).then(res => {
				console.log(res.data)
				v.friends = res.data.friends
				v.friendsCount = res.data.friends.length
			}).catch((error)=>{
				console.log(error.response.data)
			})
		},
		getSentRequests(){
			var v = this;
			axios.get('users/request/sent', {headers: { 'Authorization': 'Bearer '+this.$store.state.token}}).then(res => {
				console.log(res.data)
				v.sentRequests = res.data.requests
				v.sentRequestsCount = res.data.count
			}).catch((error)=>{
				console.log(error.response.data)
			})
		},
		getRequests(){
			var v = this;
			axios.get('users/request', {headers: { 'Authorization': 'Bearer '+this.$store.state.token}}).then(res => {
				console.log(res.data)
				v.requests = res.data.requests
				v.requestsCount = res.data.count
			}).catch((error)=>{
				console.log(error.response.data)
			})
		},
		acceptRequest(userid){
			var v = this;
			var thisisdumb = 'something'
			axios.put(`users/request/${userid}`, thisisdumb, {headers: { 'Authorization': 'Bearer '+this.$store.state.token}}).then(res => {
				console.log(res.data)
				v.updatePage();
			}).catch((error)=>{
				console.log(error.response.data)
			})
		},
		sendRequest(userid){
			var v = this;
			var thisisdumb = 'something'
			axios.post(`users/request/${userid}`, thisisdumb, {headers: { 'Authorization': 'Bearer '+this.$store.state.token}}).then(res => {
				console.log(res.data)
				v.updatePage();
			}).catch((error)=>{
				console.log(error.response.data)
			})
		},
		declineRequest(userid){
			var v = this;
			axios.delete(`users/request/${userid}`, {headers: { 'Authorization': 'Bearer '+this.$store.state.token}}).then(res => {
				console.log(res.data)
				v.updatePage();
			}).catch((error)=>{
				console.log(error.response.data)
			})
		},
		removeFriend(userid){
			var v = this;
			axios.delete(`users/friend/${userid}`, {headers: { 'Authorization': 'Bearer '+this.$store.state.token}}).then(res => {
				console.log(res.data)
				v.updatePage();
			}).catch((error)=>{
				console.log(error.response.data)
			})
		},
		search(){
			var v = this;
			let payload = {
				username: this.userSearch,
			}
			axios.post('users/search/', payload, {headers: { 'Authorization': 'Bearer '+this.$store.state.token}}).then(res => {
				console.log(res.data)
				v.users = res.data.users
			}).catch((error)=>{
				console.log(error.response.data)
			})
		}
	},
	mounted() {
		this.updatePage();
	}

}
</script>
