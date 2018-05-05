<template>
	<div class="ApiActions container">
		<div class="row no-gutters">
			<div class="col-12">
				<ApiActionsAdminCrud></ApiActionsAdminCrud>
			</div>
		</div>
	</div>
</template>
<script>
import ApiActionCrudView from '@/components/ApiActionCrudView';
import ApiActionsAdminCrud from '@/components/ApiActionsAdminCrud';
import {call} from '@/plugins/rpcApi';
	export default {
		middleware:['rootAuth'],
		layout: 'app',
		name: 'ApiActions',
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
			ApiActionCrudView,
			ApiActionsAdminCrud
		},
		created(){

		},
		mounted(){

		}
	}
</script>
<style lang="scss" scoped>
.ApiActions{
	
}
</style>