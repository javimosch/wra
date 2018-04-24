<template>
	<div class="TeamWIPView container">
		<div class="row">
				<div class="col-12">
					<h3>Team Feature</h3>
					<p>With team, we want to provide a similar experience like dozen of platforms where you can invite existing users or people who doesn't have an account yet (by email) to join your project as a collaborator or team member.</p>
					<p>
						Team members will have access to all project available features.
					</p>
				</div>
		</div>
	</div>
</template>
<script>
	export default {
		layout:'app',
		middleware:['appAuth'],
		name: 'TeamWIPView',
		props:[],
		fetch(){

		},
		data(){
			return{}
		},
		async asyncData(){
			return {}
		},
		computed:{
			project(){
				return this.$store.state.project.selected
			}
		},
		methods:{

		},
		components:{

		},
		created(){

		},
		mounted(){
			if(!this.project._id){
				this.$router.push('/app/dashboard')
			}
		}
	}
</script>
<style lang="scss" scoped>
.TeamWIPView{
	
}
</style>