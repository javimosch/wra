<template>
	<div class="LightButton mt-2">
		<button @click="click" :disabled="isDisabled" :class="buttonClass">
			<slot></slot>
		</button>
	</div>
</template>
<script>
	export default {
		name: 'LightButton',
		props:['disabled','className','to'],
		fetch(){

		},
		data(){
			return{}
		},
		async asyncData(){
			return {}
		},
		computed:{
			buttonClass(){
				return this.className!==undefined?this.className:'mx-auto d-block'
				
			},
			isDisabled(){
				return this.disabled!==undefined?this.disabled:false
			}
			
		},
		methods:{
			click(e){
				if(this.to){
					return this.$router.push(to)
				}
				return this.$emit('click',e)
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
.LightButton{
	
}
button{
	border-radius: 4px;
    display: inline-block;
    font-family: inherit;
    text-align: center;
    font-size: 16px;
    font-weight: 400;
    line-height: 26px;
    padding: 6px 18px;
    background-color: transparent;
    border: 1px solid #c1c7cd;
    font: 400 11px system-ui;
    color: #0070e0;
    
}
button:hover{
	cursor: pointer;
    text-decoration: none;
    border-color: #0070e0;
    color: #0070e0;
}
button:focus{
	border: 1px solid #0070e0;
    outline: none;
}
button[disabled]{
	color: grey;
}
button[disabled]:focus,button[disabled]:hover{
	border: 1px solid #c1c7cd;
	outline:none;
	color: grey;
	text-decoration: none;
	cursor: default;
}
</style>