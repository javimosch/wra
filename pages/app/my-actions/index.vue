<template>
	<div class="MyActionsIndex container">
		<div class="row no-gutters">
			<div class="col-12">
				<WraMyActions></WraMyActions>
			</div>
		</div>
	</div>
</template>
<script>
	import WraMyActions from '@/components/wra/WraMyActions'
	export default {
		layout:'app',
		middleware:['appAuth'],
		name: 'MyActionsIndex',
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
			WraMyActions
		},
		created(){

		},
		mounted(){

		}
	}
</script>
<style lang="scss" scoped>
.MyActionsIndex{
	
}
</style>