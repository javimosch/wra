<template>
	<div class="Pricing ">
		<div class="row mt-5">
    <div class="col-12">
      <h2 class="text-center">Pricing (Monthly)</h2>
      <p class="text-center">Pricing is currently disabled and free accounts had no limitations until we raise 7/500 users.</p>
      <div class="row">
        <div class="col-md-6 mt-3">
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
                      <p class="m-0">All the features</p>
                    </div>
                  </div>
                </li>
                <li class="list-group-item border-0">
                  <div class="row">
                    <div class="col-4">
                      <div class="float-right d-block">
                        <i class="fas fa-times"></i>
                      </div>
                    </div>
                    <div class="col-8">
                      <p class="m-0">1000 errors per month limit</p>
                    </div>
                  </div>
                </li>
                <li class="list-group-item border-0">
                  <div class="row">
                    <div class="col-4">
                      <div class="float-right d-block">
                        <i class="fas fa-times"></i>
                      </div>
                    </div>
                    <div class="col-8">
                      <p class="m-0">5 projects limit</p>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            <div class="card-footer">
              <h4 class="text-center">0€</h4></div>
          </div>
        </div>
        <div class="col-md-6 mt-3">
          <div class="card">
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
h2{
  font-family: $font1;
  color:black;
}
.card-header,.card-footer{
   background-color:$color4;  
   border-color:$color4;
  }
</style>