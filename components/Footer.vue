<template>
	<div class="Footer">
		<div class="row no-gutters">
		<footer class="w-100">
			<div class="">
				<div class="row no-gutters">
					<div class="col-lg-12" v-show="true">
						<h1 class="footer_center_text w-100 text-center parallax" data-rellax-speed="0.5">
							<span v-show="contact">Support at<br>+33782809054</span>
							<span v-show="!contact">&nbsp;<br>&nbsp;</span>
						</h1>
						
					</div>
				</div>	
			</div>

		</footer>  
		</div>
		<div class='row no-gutters'>
			<div class="credits w-100">
					© MisitioBA - <a href="#">Privacy Policy</a>
			</div>
		</div>
	</div>
</template>
<script>
  import {startParallax} from '@/plugins/parallax';
  export default {
  	props:['contact'],
  	name:"Footer",
  	computed:{
  		showContact(){
  			return this.contact!==false
  		}
  	},
  	mounted(){
  		if(process.server)return;
      startParallax('.parallax')
  	}
  }
</script>
<style lang="scss" scoped>
.Footer{
	margin-top:200px;
}
a{
	color:$color1;
}
a:hover{
	color:$color5;
}
footer{
	position:relative;
	margin-top:100px;
}
footer:before{
	content: '';
    display: block;
    position: absolute;
    width: 100%;
    height: 390px;
    background: $color3;
    -webkit-transform: skewY(-6deg);
    transform: skewY(-2deg);
    z-index: 0;
    left: 0;
    margin-top: -40px;
}
span{
		font-family: $font1;
}
.footer_center_text{

	color:$color5;
    margin:0px;	
    padding: 100px 0px;
    line-height: 55px;
    background-color:$color6;
}
.credits{
    color: $color5;
    height: 150px;
    background: $color6;
    text-align: right;
    line-height: 150px;
    padding-right: 50px;
    padding-top: 20px;
}
.space{
	height:100px;
}
</style>