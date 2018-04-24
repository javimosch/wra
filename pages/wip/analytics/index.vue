<template>
	<div class="SchedulesWIPView container">
		<div class="row">
				<div class="col-12">
					<h3>Analytics Feature</h3>

					<h4>Reports</h4>
					<p>You will be able to build reports based on your collections data.</p>

					<h4>Events</h4>
					<p>They will recorded whenever your functions are being called or manually by you. Analytics will help you to analyze BIG DATA.</p>
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