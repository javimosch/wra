<template>
	<div class="Dashboard container">
		
		
		<div class="row">
			<div class="col-12">
				<h3>Admin dash</h3>
			</div>
			
		</div>
	</div>
</template>
<script>

import {call} from '@/plugins/rpcApi';
	export default {
		middleware:['rootAuth'],
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