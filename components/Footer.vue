<template>
	<div class="Footer">
		<div class="row no-gutters">
		<footer></footer>  
		</div>
		<div class='row no-gutters'>
			<div class="credits w-100">
					© by <a href="https://misitioba.com" target="_blank">MisitioBA</a> - <a href="#">Privacy Policy</a>
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
	margin-top:300px;
}
a{
	color:$color1;
}
a:hover{
	color:$color5;
}
footer{
	position:relative;
	height: 50px;
  width: 100%;
}
footer:before{
	content: '';
    display: block;
    position: absolute;
    width: 100%;
    height: 145px;
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