<template>
	<div class="CallToAction container">
		<div class="row no-gutters mt-4">
    <div :class="'col-12 '+className||''">
      <p class="text-center Text">
      	<strong style="color:limegreen;">Wrapkend</strong> is an CloudIDE, Backend As Service, Software as Service solution that provides instant NodeJS App development Workspaces, which allow you to create projects in minutes. A set of ease to use development tools is available to provide functionalities such as real time code editing with live reload, code search, error logging, plugins and reporting.
      </p>
      <b-btn 
      class="mx-auto d-block mt-5" @click.stop="track" href="https://editor.wrapkend.com/register" target="_self" variant="warning" size="lg">Start now</b-btn>
    </div>
  </div>
	</div>
</template>
<script>
	export default {
		name: 'CallToAction',
		props:['className'],
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
.Text{
    font-size: 18px;
    font-weight: 400;
    color: white;
    font-family: 'GT Eesti Display';
    margin-top: 20px;
    padding:30px;
}
a{
	max-width: 200px;
    background-color:$color6;
    border-color:$color6;
    color:$color3;
  }
  a:hover{
   background-color:$color2; 
   border-color:$color2;
   color:$color6;
  }
</style>