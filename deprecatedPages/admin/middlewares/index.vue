<template>
  <div class="SystemMiddlewaresIndex container">
    <div class="row no-gutters">
      <div class="col-12">
        <WraAllMiddlewares></WraAllMiddlewares>
      </div>
    </div>
  </div>
</template>
<script>
  import WraAllMiddlewares from '@/components/wra/WraAllMiddlewares'
  export default {
    layout:'app',
    middleware:['rootAuth'],
    name: 'SystemMiddlewaresIndex',
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
      WraAllMiddlewares
    },
    created(){

    },
    mounted(){

    }
  }
</script>
<style lang="scss" scoped>
.SystemMiddlewaresIndex{
  
}
</style>