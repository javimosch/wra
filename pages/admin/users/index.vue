<template>
  <div class="AllUsers container">
    <div class="row no-gutters">
      <div class="col-12">
        <WraAllUsers></WraAllUsers>
      </div>
    </div>
  </div>
</template>
<script>
  import WraAllUsers from '@/components/wra/AllUsersView'
  export default {
    layout:'app',
    middleware:['rootAuth'],
    name: 'AllUsers',
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
      WraAllUsers
    },
    created(){

    },
    mounted(){

    }
  }
</script>
<style lang="scss" scoped>
.AllUsers{
  
}
</style>