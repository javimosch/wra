<template>
	<div class="MyProjects container">
		<div class="row no-gutters">
			<div class="col-12">
				<WraPersonalProjects></WraPersonalProjects>
			</div>
		</div>
	</div>
</template>
<script>
	import WraPersonalProjects from '@/components/wra/WraPersonalProjects'
	export default {
		layout:'app',
		middleware:['appAuth'],
		name: 'MyProjects',
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

		},
		methods:{

		},
		components:{
			WraPersonalProjects
		},
		created(){

		},
		mounted(){

		}
	}
</script>
<style lang="scss" scoped>
.MyProjects{
	
}
</style>