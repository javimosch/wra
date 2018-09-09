<template>
	<div class="Pricing">
		<div class="row no-gutters">
    <div class="col-12">
      <div class="row no-gutters">
        <div class="col-md-12 mt-3">
          <div class="card">
            <div class="card-header">
              <h3 class="text-center">Community</h3></div>
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
                      <p class="m-0">Unlimited Project Files</p>
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
                      <p class="m-0">1 Projects</p>
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
                      <p class="m-0">1 Service Account</p>
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
                      <p class="m-0">Analytics and Reports</p>
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
                      <p class="m-0">Plugins</p>
                    </div>
                  </div>
                </li>


              </ul>
            </div>
            <div class="card-footer">
              <h4 class="text-center">FREE</h4></div>
          </div>
        </div>
        <div class="col-md-6 mt-3" v-if="false">
          <div class="card" >
            <div class="card-header">
              <h3 class="text-center">TIER 1</h3></div>
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
                      <p class="m-0">500 RPC Functions</p>
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
                      <p class="m-0">20 Projects</p>
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
                      <p class="m-0">15 service accounts</p>
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
                      <p class="m-0">200 Function Middlewares</p>
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
                      <p class="m-0">200 Schedules tasks</p>
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
                      <p class="m-0">Analytics and Reports</p>
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
                      <p class="m-0">Graphical Function builder</p>
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
                      <p class="m-0">Graphical Report builder</p>
                    </div>
                  </div>
                </li>



              </ul>
            </div>
            <div class="card-footer">
              <h4 class="text-center">250€ / Month</h4></div>
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
   background-color:$color2;  
   border-color:$color2;
   color:$color6;
  }
  p{
    color:$color3;
  }
  .card-body{
    padding-bottom:50px;
  }
</style>