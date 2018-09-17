<template>
	<div class="Workers container">
		<div class="row no-gutters">
			<div class="col-12">
				<WorkersCrud></WorkersCrud>
			</div>
		</div>
	</div>
</template>
<script>
import WorkersCrud from '@/components/WorkersCrud';
import {call} from '@/plugins/rpcApi';
	export default {
		middleware:['rootAuth'],
		layout: 'app',
		name: 'Workers',
		props:[],
		fetch(){

		},
		async asyncData(){
			return {}
		},
		computed:{

		},
		methods:{
			
		},	
		components:{
			WorkersCrud
		},
		created(){

		},
		mounted(){

		}
	}
</script>
<style lang="scss" scoped>
.Workers{
	
}
</style>