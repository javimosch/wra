<template>
	<div></div>
</template>
<script>
export default {
  layout: 'app-guess',
  name: 'Admin',
  mounted() {
    if(!process.server){
      this.$router.push('/admin/login')
    }
  }
}
</script>
<style lang="scss" scoped="">
.Admin {}
</style>
