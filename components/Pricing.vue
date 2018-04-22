<template>
	<div class="Pricing">
		<div class="row no-gutters">
    <div class="col-12">
      <div class="row no-gutters">
        <div class="col-md-12">
          <div class="card">
            <div class="card-header">
              <h3 class="text-center">FREE</h3></div>
            <div class="card-body">
              <ul class="list-group mt-4">
                

                <li class="list-group-item border-0">
                  <div class="row">
                    <div class="col-4">
                      <div class="float-right d-block">
                        <i class="fas fa-check"></i>
                      </div>
                    </div>
                    <div class="col-8">
                      <p class="m-0">Track errors in real-time</p>
                    </div>
                  </div>
                </li>

                <li class="list-group-item border-0">
                  <div class="row">
                    <div class="col-4">
                      <div class="float-right d-block">
                        <i class="fas fa-check"></i>
                      </div>
                    </div>
                    <div class="col-8">
                      <p class="m-0">Multi-project support</p>
                    </div>
                  </div>
                </li>

                <li class="list-group-item border-0">
                  <div class="row">
                    <div class="col-4">
                      <div class="float-right d-block">
                        <i class="fas fa-check"></i>
                      </div>
                    </div>
                    <div class="col-8">
                      <p class="m-0">Multi-user support</p>
                    </div>
                  </div>
                </li>

                <li class="list-group-item border-0">
                  <div class="row">
                    <div class="col-4">
                      <div class="float-right d-block">
                        <i class="fas fa-check"></i>
                      </div>
                    </div>
                    <div class="col-8">
                      <p class="m-0">Smart error-stack explorer</p>
                    </div>
                  </div>
                </li>

                <li class="list-group-item border-0">
                  <div class="row">
                    <div class="col-4">
                      <div class="float-right d-block">
                        <i class="fas fa-check"></i>
                      </div>
                    </div>
                    <div class="col-8">
                      <p class="m-0">NodeJS integration</p>
                    </div>
                  </div>
                </li>
                
              </ul>
            </div>
            <div class="card-footer">
              <h4 class="text-center">0€ / Month</h4></div>
          </div>
        </div>
        <div class="col-md-6 mt-3" v-if="false">
          <div class="card" >
            <div class="card-header">
              <h3 class="text-center">PAID</h3></div>
            <div class="card-body">
              <ul class="list-group mt-4">
                <li class="list-group-item border-0">
                  <div class="row">
                    <div class="col-4">
                      <div class="float-right d-block">
                        <i class="fas fa-check"></i>
                      </div>
                    </div>
                    <div class="col-8">
                      <p class="m-0">All the features</p>
                    </div>
                  </div>
                </li>
                <li class="list-group-item border-0">
                  <div class="row">
                    <div class="col-4">
                      <div class="float-right d-block">
                        <i class="fas fa-check"></i>
                      </div>
                    </div>
                    <div class="col-8">
                      <p class="m-0">Unlimited errors per month</p>
                    </div>
                  </div>
                </li>
                <li class="list-group-item border-0">
                  <div class="row">
                    <div class="col-4">
                      <div class="float-right d-block">
                        <i class="fas fa-check"></i>
                      </div>
                    </div>
                    <div class="col-8">
                      <p class="m-0">Unlimited projects</p>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            <div class="card-footer">
              <h4 class="text-center">10€</h4></div>
          </div>
        </div>
      </div>
    </div>
  </div>
	</div>
</template>
<script>
import {startParallax} from '@/plugins/parallax';
	export default {
		name: 'Pricing',
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
.Pricing{
	
}
h3,h4{
  margin:0px;
  padding:0px;
  line-height: 50px;
}
.card{
  max-width:450px;
  margin:0 auto;
  display:block;
}
.card-header,.card-footer{
   background-color:$color1;  
   border-color:$color1;
   color:$color6;
  }
  p{
    color:$color3;
  }
  .card-body{
    padding-bottom:50px;
  }
</style>