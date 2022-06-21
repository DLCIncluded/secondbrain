<template>
	<div class="home">
		<h1>Create List</h1>
		<form @submit.prevent="createList">
			<div>
				<label for="listName">List Name</label> <input type="text" name="listName" id="listName" v-model="listName">
			</div>
			<div>
				<label for="listDescription">List Description</label> <input type="text" name="listDescription" id="listDescription" v-model="listDescription">
			</div>
			<div>
				<button type="submit">Create</button>
			</div>
		</form>
	</div>

</template>

<script>
import axios from 'axios'
export default {
	name: 'CreateList',
	data() {
		return {
			listName: '',
			listDescription: ''
		}
	},
	methods: {
		createList(){
			var v = this;
			if(this.listName == ''){
				console.log('add name')
				return;
			}
			let payload = {
				name: this.listName,
				description: this.listDescription
			}
			axios.post('lists/', payload, {headers: { 'Authorization': 'Bearer '+this.$store.state.token}}).then(res => {
				console.log(res.data)
				v.$router.push(`/list/${res.data._id}`)
			}).catch((error)=>{
				console.log(error.response.data)
			})
		}
	}
}
</script>
