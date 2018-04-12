<template>
	<div class="Dashboard container">
		
		
		<div class="row">
			<div class="col-12">
				<ApiActionCrudView></ApiActionCrudView>
			</div>
			<div class="col-12">
				
			</div>
			<div class="col-12">
				
			</div>
		</div>
	</div>
</template>
<script>
import ApiActionCrudView from '@/components/ApiActionCrudView';
import {call} from '@/plugins/rpcApi';
	export default {
		middleware:['auth'],
		layout: 'app',
		name: 'Dashboard',
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
			ApiActionCrudView
		},
		created(){

		},
		mounted(){

		}
	}
</script>
<style lang="scss" scoped>
.Dashboard{
	
}
</style>