<template>
	<div class="MyCollectionFieldsIndex container">
		<div class="row no-gutters">
			<div class="col-12">
				<WraMyCollectionFields></WraMyCollectionFields>
			</div>
		</div>
	</div>
</template>
<script>
	import WraMyCollectionFields from '@/components/wra/WraMyCollectionFields'
	export default {
		layout:'app',
		middleware:['appAuth'],
		name: 'MyCollectionFieldsIndex',
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
			WraMyCollectionFields
		},
		created(){

		},
		mounted(){

		}
	}
</script>
<style lang="scss" scoped>
.MyCollectionFieldsIndex{
	
}
</style>