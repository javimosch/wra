<template>
	<div class="Header mb-4">
		<div>
			<img class="mx-auto d-block mt-0" :src="logo" v-if="false"/>
			<router-link to="/"><h2 class="text-center">Error{t}racky</h2></router-link>
		</div>
		<div class="nav mx-auto d-block mt-2 pb-4">
		  <b-nav class="" justified tabs>

		  	<b-nav-item v-show="isDash" :active="isActive('test')" to="/test">Integration page test</b-nav-item>

		  	<b-nav-item v-show="isLogged" :active="isActive('dashboard')" to="/dashboard">Dashboard</b-nav-item>
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
			return this.routeName == n
		}
	},
	async mounted(){
		if(process.server) {
			return
		}
		await this.$store.dispatch('auth/update');
	},
	computed:{
		isDash(){
			return this.routeName==='index'
		},
		isIndex(){
			return this.routeName==='index'
		},
		routeName(){
			return this.$store.state.route && this.$store.state.route.name;
		},
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
h2{
	font-family: love_ya_like_a_sisterregular;
	color:$color1;
	padding-top:30px;
}
a:hover{
	border-color:$color2;
	outline-color:$color2;
	text-decoration-color: $color2;
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
	ul{
		border-bottom:0px;
	}
</style>