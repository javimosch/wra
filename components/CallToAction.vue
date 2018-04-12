<template>
	<div class="CallToAction">
		<div class="row mt-5">
    <div class="col-12">
      <h2 class="text-center">1 minute integration</h2>
      <b-btn 
		v-ga="track" 
      class="mx-auto d-block" to="/dashboard" variant="warning" size="lg">Give a try</b-btn>
    </div>
  </div>
	</div>
</template>
<script>
	export default {
		name: 'CallToAction',
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
			track(){
				if(process.server) return
				return this.$ga.commands.trackButtonClick.bind(this, 'give-a-try')
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
.CallToAction{
	
}
a{
	max-width: 200px;
    background-color:$color4;
  }
  a:hover{
   background-color:$color1; 
   border-color:$color1;
   color:$color6;
  }
</style>