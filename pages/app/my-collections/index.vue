<template>
	<div class="MyCollections container">
		<div class="row no-gutters">
			<div class="col-12">
				<b-btn variant="primary" size="sm" to="/app/my-collections/fields">Collection fields</b-btn>
				<hr>
			</div>
			<div class="col-12">
				<WraMyCollections></WraMyCollections>
			</div>
		</div>
	</div>
</template>
<script>
	import WraMyCollections from '@/components/wra/WraMyCollections'
	export default {
		layout:'app',
		middleware:['appAuth'],
		name: 'MyCollections',
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
			WraMyCollections
		},
		created(){

		},
		mounted(){

		}
	}
</script>
<style lang="scss" scoped>
.MyCollections{
	
}
</style>