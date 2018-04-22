<template>
  <div class="Index">
      <WraLanding></WraLanding>
  </div>
</template>
<script>
  import WraLanding from '@/components/wra/WraLanding'
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
      WraLanding
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