<template>
	<div class="home">
		<h1>Lists</h1>
		
		<div>
			<p v-for="list in lists" :key="list._id">{{list.name}} - <router-link :to='"/list/"+list._id'> View List</router-link> - <button @click="shareList(list._id)">share</button> - <button @click="deleteList(list._id)">delete</button></p>
		</div>
		
	</div>

</template>

<script>
import axios from 'axios'
export default {
	name: 'HomeView',
	data() {
		return {
			listid: null,
			lists: [],
			listItems: null,
			newItem: '',
		}
	},
	methods: {
		loadLists(){
			var v = this;
			axios.get('lists/', {headers: { 'Authorization': 'Bearer '+this.$store.state.token}}).then(res => {
				console.log(res.data)
				v.lists = res.data
			}).catch((error)=>{
				console.log(error.response.data)
			})
		},
		deleteList(id){
			if(confirm('Are you sure?') == true){
				console.log('delete list ' + id)
				var v = this;
				axios.delete(`lists/${id}`, {headers: { 'Authorization': 'Bearer '+this.$store.state.token}}).then(res => {
					console.log(res.data)
					v.loadLists()
				}).catch((error)=>{
					console.log(error.response.data)
				})
			}else{
				console.log('dont delete')
			}
		},
		shareList(id){
			var v = this;
			var payload = {
				sharewith: '62b089c6c0d17b25479f6c31'
			}
			axios.post(`lists/share/${id}`, payload, {headers: { 'Authorization': 'Bearer '+this.$store.state.token}}).then(res => {
				console.log(res.data)
				v.loadLists()
			}).catch((error)=>{
				console.log(error.response.data)
			})
			
		}
	},
	mounted(){
		this.loadLists();
	},
}
</script>
