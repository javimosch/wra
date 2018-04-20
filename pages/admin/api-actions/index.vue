<template>
	<div class="ApiActions container">
		<div class="row no-gutters">
			<div class="col-12">
				<ApiActionCrudView></ApiActionCrudView>
			</div>
		</div>
	</div>
</template>
<script>
import ApiActionCrudView from '@/components/ApiActionCrudView';
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
			ApiActionCrudView
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