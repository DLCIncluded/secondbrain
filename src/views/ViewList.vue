<template>
	<div class="home">
		<h1>{{list.name}}</h1>
		
		<div>
			<p v-for="item in listItems" :key="item._id">{{item.name}} - {{ item.status ? 'done' : 'not done'}} - <button @click="markItemDone(item._id,item.status)">mark {{ item.status ? 'not done' : 'done'}}</button> - <button @click="deleteItem(item._id)">delete</button></p>
		</div>

		<form @submit.prevent="addItem()">
			<div>
				<label for="name">Item name: </label><input type="text" name="name" id="name" v-model="newItem">
			</div>
			<button type="submit">Add</button>
		</form>


		<br>
		<button @click="deleteDone()">Delete done</button>
		<br><br>
		<button @click="deleteList()">Delete list</button>
		
	</div>

</template>

<script>
import axios from 'axios'
export default {
	name: 'HomeView',
	data() {
		return {
			listid: null,
			list: [],
			listItems: null,
			newItem: '',
		}
	},
	methods: {
		loadList(){
			var v = this;
			axios.get('lists/'+this.listid, {headers: { 'Authorization': 'Bearer '+this.$store.state.token}}).then(res => {
				console.log(res.data)
				v.list = res.data
				v.listItems = res.data.listItems
			}).catch((error)=>{
				console.log(error.response.data)
			})
		},
		addItem(){
			var v = this;
			if(this.newItem == ''){
				console.log('add name')
				return;
			}
			let payload = {
				name: this.newItem,
			}
			axios.post(`lists/item/${this.listid}`, payload, {headers: { 'Authorization': 'Bearer '+this.$store.state.token}}).then(res => {
				console.log(res.data)
				v.newItem = ''
				v.loadList();
			}).catch((error)=>{
				console.log(error.response.data)
			})
		},
		deleteItem(id){
			// @route	DELETE /api/lists/item/:listid/:id
			var v = this;
			axios.delete(`lists/item/${this.listid}/${id}`, {headers: { 'Authorization': 'Bearer '+this.$store.state.token}}).then(res => {
				console.log(res.data)
				v.loadList();
			}).catch((error)=>{
				console.log(error.response.data)
			})
		},
		markItemDone(id, status){
			// @route	PUT /api/lists/item/:listid/:id
			var v = this;
			let payload = {
				status: !status
			}
			axios.put(`lists/item/${this.listid}/${id}`, payload, {headers: { 'Authorization': 'Bearer '+this.$store.state.token}}).then(res => {
				console.log(res.data)
				v.loadList();
			}).catch((error)=>{
				console.log(error.response.data)
			})
		},
		deleteList(){
			if(confirm('Are you sure?') == true){
				console.log('delete list ' + this.listid)
				var v = this;
				axios.delete(`lists/${this.listid}`, {headers: { 'Authorization': 'Bearer '+this.$store.state.token}}).then(res => {
					console.log(res.data)
					this.$router.push('/')
				}).catch((error)=>{
					console.log(error.response.data)
				})
			}else{
				console.log('dont delete')
			}
		},
		deleteDone(){
			if(confirm('Are you sure?') == true){
				console.log('delete done from list ' + this.listid)
				var v = this;
				axios.patch(`lists/item/${this.listid}`,  'dummy', {headers: { 'Authorization': 'Bearer '+this.$store.state.token}}).then(res => {
					console.log(res.data)
					v.loadList();
				}).catch((error)=>{
					console.log(error.response.data)
				})
			}else{
				console.log('dont delete')
			}
		}
	},
	mounted(){
		console.log('Pullling list id: '+this.$route.params.id)
		this.listid = this.$route.params.id;
		this.loadList();
	},
	beforeCreate(){
		this.listid = this.$route.params.id;
	}
}
</script>
