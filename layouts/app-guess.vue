<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-sm-12">
        <app-header :nav="false"></app-header>
      </div>
    </div>
    <div class="row  no-gutters">
      <div class="col-sm-12">
      <nuxt/>
      </div>
    </div>
  </div>
</template>
<script>
import AppHeader from '@/components/AppHeader';
export default {
  components:{
    AppHeader
  },
   mounted(){
    this.$ma.setRouterTracking(false)
  }
}
</script>
<style>

</style>
