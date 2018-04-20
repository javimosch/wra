<template>
	<div class="TextInput">
		<label v-show="label" v-html="label"></label>
		<input ref="input" class="w-100" type="text" :value="value" @keyup="keyup" :disabled="isDisabled" />
	</div>
</template>
<script>
	export default {
		name: 'TextInput',
		props:['value','label','disabled'],
		fetch(){

		},
		data(){
			return{}
		},
		async asyncData(){
			return {}
		},
		computed:{
			isDisabled(){
				return this.disabled!==undefined?this.disabled:false
			}
		},
		methods:{
			focus(){
				this.$refs.input.focus();
			},
			keyup(e){
				this.$emit('input',e.target.value)
			}
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
.TextInput{
	
}
label{
	font-size:8px;
	display:block;
	min-width: 200px;
	margin-top:20px;
	color:grey;
}
input:hover,input:active,input:focus{
	text-decoration: none;
	box-shadow: none;
	outline:1px solid grey;
}
input[disabled]:hover,input[disabled]:active,input[disabled]:focus{
	outline:0px
}
</style>