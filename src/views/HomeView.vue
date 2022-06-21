<template>
	<div class="home">
		<h1>Home</h1>
		<div v-if="$store.state.isLoggedIn">
			username: {{$store.state.username}} <br>
			email: {{$store.state.email}} <br>
			token: {{$store.state.token}} <br>
			isadmin: {{$store.state.isadmin}} <br>
		</div>
		
	</div>

</template>

<script>

export default {
	name: 'HomeView',
}
</script>
