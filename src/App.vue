<template>
	<nav>
		<router-link to="/">Home</router-link> |
		<router-link to="/about">About</router-link> |
		<span v-if="$store.state.isLoggedIn"><router-link to="/friends">Friends</router-link> | 
		<router-link to="/createlist">Create List</router-link> | 
		<router-link to="/lists">Lists</router-link> | 

		</span> 
		
		<router-link to="/login" v-if="!$store.state.isLoggedIn">Login</router-link>
		<router-link to="/" @click="$store.commit('logout')" v-else>logout</router-link> |
		<span v-if="!$store.state.isLoggedIn"> | 
		<router-link to="/register">Register</router-link></span>
		
		<span v-if="$store.state.isadmin"> 
		<router-link to="/admin">Admin</router-link>
		</span>

	</nav>
	<router-view/>
</template>

<style>

</style>

<script>
export default {
	beforeCreate(){
		this.$store.commit('initialiseStore');
	}
}
</script>