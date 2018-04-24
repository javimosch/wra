<template>
	<div class="LightSelect mt-3">
		<LightLabel v-show="label" v-html="label"></LightLabel>
		<v-select :value="value" @input="input" 
			:options="options"></v-select>
	</div>
</template>
<script>
	import {LightLabel} from '@/styledComponents/labels'
	export default {
		name: 'LightSelect',
		props:['value','options','label'],
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
			focus(){},
			input(v){
				this.$emit('input',typeof v==='object'?v.value:v)
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
.LightSelect{
	
}
</style>