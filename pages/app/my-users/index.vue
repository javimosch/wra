<template>
	<div class="MyUsers container">
		<div class="row no-gutters">
			<div class="col-12">
				<WraMyUsers></WraMyUsers>
			</div>
		</div>
	</div>
</template>
<script>
	import WraMyUsers from '@/components/wra/WraMyUsers'
	export default {
		layout:'app',
		middleware:['appAuth'],
		name: 'MyUsers',
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
			WraMyUsers
		},
		created(){

		},
		mounted(){

		}
	}
</script>
<style lang="scss" scoped>
.MyUsers{
	
}
</style>