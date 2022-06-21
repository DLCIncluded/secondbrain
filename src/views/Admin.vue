<template>
	<div class="home" v-if="$store.state.show">
		<h1>You're an admin!</h1>
		This is a test
	</div>

</template>

<script>

export default {
	name: 'Admin',
	beforeCreate(){
		this.$store.dispatch('checkAdmin');
	}
}
</script>
