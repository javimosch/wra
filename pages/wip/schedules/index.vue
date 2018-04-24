<template>
	<div class="SchedulesWIPView container">
		<div class="row">
				<div class="col-12">
					<h3>Schedules Feature</h3>
					<p>You will decide which of your RPC Functions you want to schedule for execution.</p>
				</div>
		</div>
	</div>
</template>
<script>
	export default {
		layout:'app',
		middleware:['appAuth'],
		name: 'SchedulesWIPView',
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
.SchedulesWIPView{
	
}
</style>