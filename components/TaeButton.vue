<template>
	<div class="TaeButton">
		<slot></slot>
	</div>
</template>
<script>
	export default {
		name: 'TaeButton',
		props:[],
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
.TaeButton{
	
}
a,button{
	max-width: 200px;
    background-color:$color4;
  }
  a:hover,button:hover{
   background-color:$color1; 
   border-color:$color1;
   color:$color6;
  }
</style>