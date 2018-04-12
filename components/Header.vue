<template>
	<div class="Header mb-4">
		<div>
			<img class="mx-auto d-block mt-0" :src="logo" />
		</div>
		<div v-if="true" class="nav mx-auto d-block mt-2 pb-4">
		  <b-nav class="" justified tabs>

		  	<b-nav-item v-show="isActive('dashboard')" :active="isActive('dashboard')" to="/test">Integration page test</b-nav-item>

		  	<b-nav-item v-show="isLogged" :active="isActive('admin-chat')" to="/dashboard">Dashboard</b-nav-item>
		    <b-nav-item v-show="isLogged" @click="logout()">Logout</b-nav-item>
		  </b-nav>
		</div>
	</div>
</template>
<script>
	import Logo from '@/assets/logo.png'
	

export default {
	props:['nav'],
	data () {
		return {
			logo: Logo
		}
	},
	methods:{
		async logout(){
			await this.$store.dispatch('auth/logout');
			this.$router.push('/');
		},
		isActive(n){
			return this.$store.state.route && this.$store.state.route.name == n;
		}
	},
	async mounted(){
		await this.$store.dispatch('auth/update');
	},
	computed:{
		isLogged(){
			return this.$store.state.auth.isLogged
		}
	}
}
</script>
<style lang="scss" scoped>
.Header{
	background-color:$color6;
}
a,a:hover{
	border:0!important;
	border-top:0;
	border-bottom:0;
}
	.nav{
		max-width:800px
	}
	img{
		max-width:100px;
	}
</style>