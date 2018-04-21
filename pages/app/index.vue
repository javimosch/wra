<template>
	<div></div>
</template>
<script>
export default {
  layout: 'app-guess',
  name: 'App',
  mounted() {
    if(!process.server){
      this.$router.push('/app/login')
    }
  }
}
</script>
<style lang="scss" scoped="">
.App {}
</style>
