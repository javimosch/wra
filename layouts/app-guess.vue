<template>
<div class="Layout">
  <div class="container-fluid">
    <div class="row">
      <div class="col-sm-12">
        <AppHeader :nav="false"></AppHeader>
      </div>
    </div>
    <div class="row  no-gutters">
      <div class="col-sm-12">
        <nuxt/>
      </div>
    </div>
  </div>
  <div class="container-fluid">
    <AppFooter></AppFooter>
  </div>
</div>

</template>

<script>
import AppHeader from '@/components/wra/WraHeader';
import AppFooter from '@/components/wra/WraFooter';
export default {
  components: {
    AppHeader,
    AppFooter
  },
  mounted() {
    this.$ma.setRouterTracking(false)
  }
}

</script>

<style>
</style>
