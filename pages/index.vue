<template>
  <div class="Index">
      <TaeLanding></TaeLanding>
  </div>
</template>
<script>
  import TaeLanding from '@/components/tae/TaeLanding'
  export default {
    layout:'public',
    name: 'Index',
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
      TaeLanding
    },
    created(){

    },
    mounted(){

    }
  }
</script>
<style lang="scss" scoped>
.Index{
  
}
</style>