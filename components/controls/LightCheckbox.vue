<template>
	<div class="LightCheckbox">
		<LightLabel v-show="label" v-html="label"></LightLabel>
		<b-form-checkbox 
                     @input="input"
                     :value="value"
                     ></b-form-checkbox>
	</div>
</template>
<script>
import {LightLabel} from '@/styledComponents/labels'
	export default {
		name: 'LightCheckbox',
		props:['value','label'],
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
.LightCheckbox{
	
}
</style>