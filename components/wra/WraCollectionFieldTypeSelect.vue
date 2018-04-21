<template>
	<div class="WCFTypeSelect mt-3">
		<LightLabel>Type</LightLabel>
		<v-select value="String" @input="input" 
			:options="['String','Number','Boolean','Date','Ref']"></v-select>
	</div>
</template>
<script>
	import {LightLabel} from '@/styledComponents/labels'
	export default {
		name: 'WCFTypeSelect',
		props:['value'],
		fetch(){

		},
		data(){
			return{
			}
		},
		async asyncData(){
			return {}
		},
		computed:{

		},
		methods:{
			input(v){
				this.$emit('input',v)
			}
		},
		components:{
			LightLabel
		},
		created(){

		},
		mounted(){

		}
	}
</script>
<style lang="scss" scoped>
.WCFTypeSelect{
	
}
</style>