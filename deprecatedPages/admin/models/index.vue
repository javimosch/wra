<template>
  <div class="ModelsRoot container">
    <div class="row no-gutters">
      <div class="col-12">
        <ModelsCrud></ModelsCrud>
      </div>
    </div>
  </div>
</template>
<script>
  import ModelsCrud from '@/components/ModelsCrud'
  export default {
    layout:'app',
    middleware:['rootAuth'],
    name: 'ModelsRoot',
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
      ModelsCrud
    },
    created(){

    },
    mounted(){

    }
  }
</script>
<style lang="scss" scoped>
.ModelsRoot{
  
}
</style>