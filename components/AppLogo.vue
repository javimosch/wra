<template>
  <div class="AppLogo">
    
    <a href="/" class="m-0 p-0  align-self-center w-100 LogoLink" 
      v-show="!projectBrandLogo">
          <h2 class="text-center m-0 p-0" v-show="!projectBrandLogo">
            <!--<img class="Logo" :src="Logo" v-show="!projectBrandLogo"/> -->
            <span class="LogoSpan" v-show="!projectBrandLogo">wrapkend</span>
          </h2>
      </a>

       <a href="/app/dashboard" class="m-0 p-0 d-block align-self-center w-100 LogoLink" v-show="projectBrandLogo">
          <img class="CustomLogo d-inline" :src="projectBrandLogo"/>
      </a>

  </div>
</template>
<script>

//import Logo from '@/assets/wra_logo.svg';
  export default {
    name: 'AppLogo',
    props:[],
    fetch(){

    },
    data(){
      return{
  //      Logo
      }
    },
    async asyncData(){
      return {}
    },
    computed:{
      projectBrandLogo(){
      return this.$store.getters && this.$store.getters['project/brandLogo']
      },
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
.AppLogo{
  
}
.Logo{
  max-width: 25px;
  margin-right:10px;
  display: inline;
}
.LogoSpan{
 display: inline; 
}
.LogoLink{
  text-decoration: none!important;
  display:block;
}
.CustomLogo{
  max-width: 250px;
  max-height: 100px;
}
h2{
  font-size:25px;
}
h2 span{
    font-family: "Trade Winds", cursive;
    color: #F57F22;
    display: block;
}
</style>