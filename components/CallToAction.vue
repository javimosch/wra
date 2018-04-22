<template>
	<div class="CallToAction">
		<div class="row no-gutters mt-5">
    <div class="col-12">
      <h2 class="text-center">Start for free</h2>
      <b-btn 
      class="mx-auto d-block" @click.stop="track" to="/app" variant="warning" size="lg">Give a try</b-btn>
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
				return this.$ma.trackEvent('landing_button','click','call_to_action')
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
h2{
	font-family: $font3;
	font-size: 20px;
}
a{
	max-width: 200px;
    background-color:$color2;
    border-color:$color2;
    color:$color6;
  }
  a:hover{
   background-color:$color1; 
   border-color:$color1;
   color:$color6;
  }
</style>