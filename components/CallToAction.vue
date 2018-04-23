<template>
	<div class="CallToAction container">
		<div class="row no-gutters mt-2">
    <div class="col-12">
      <p class="text-center">
      	
      	<strong>Wrapkend</strong> is an <strong>open-source</strong> solution that includes a scalable server, a singleprotocol <strong>RPC API</strong>, an administration console and a set of tools that provide advanced functionalities like real-time pub/sub, blazing fast search, error tracking, and reporting.
      </p>
      <b-btn 
      class="mx-auto d-block" @click.stop="track" href="/app/login" target="_self" variant="warning" size="lg">Discover</b-btn>
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
p{
	font-family: $font2;
	font-size: 14px;
	font-weight: 300;
	color:$color4;
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