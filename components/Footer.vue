<template>
	<div class="Footer">
		<div class="row">
		<footer class="w-100">
			<div class="container">
				<div class="row">
					<div class="col-lg-12" v-show="true">
						<h1 class="footer_center_text w-100 text-center">
							<span v-show="contact">Questions?<br>+33 7 82809054</span>
							<span v-show="!contact">&nbsp;<br>&nbsp;</span>
						</h1>
						
					</div>
				</div>	
			</div>

		</footer>  
		</div>
		<div class='row'>
			<div class="credits w-100">
					© MisitioBA - <a href="#">Privacy Policy</a>
			</div>
		</div>
	</div>
</template>
<script>
  export default {
  	props:['contact'],
  	name:"Footer",
  	computed:{
  		showContact(){
  			return this.contact!==false
  		}
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
.footer_center_text{
	color:$color6;
    margin:0px;	
    padding: 100px 0px;
    line-height: 55px;
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