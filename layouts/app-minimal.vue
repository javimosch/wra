<template>
<div class="APP"
     >
  <div v-show="!isLogged"
       class="d-flex justify-content-center align-items-center h-100 position-fixed w-100">
    <LoadingDiamond v-show="!isLogged"></LoadingDiamond>
  </div>
  <nuxt/>
  <div class="container-fluid m-0 p-0"
       v-show="isLogged">
    <AppFooter class="mt-0"></AppFooter>
  </div>
</div>

</template>

<script>
import { call } from '@/plugins/rpcApi';

import LoadingDiamond from '@/components/LoadingDiamond';
import AppFooter from '@/components/wra/WraFooter';


export default {
  name: 'appLayout',
  components: {
    AppFooter,
    LoadingDiamond
  },
  data() {
    return {
      
    }
  },
  computed: {
    
  },
  methods: {
    async isLogged() {
      return this.$store.state.auth.isLogged || (await call('taeIsLogged')).isLogged
    },
    async handleSecurity() {
      if (!process.server) {
        if (!(await this.isLogged())) {
          window.location.href = '/app/login'
        } else {
          await this.$store.dispatch('auth/update')
        }
      }
    }
  },
  destroyed() {
    
  },
  created() {},
  async mounted() {
      await this.handleSecurity()
  }
}

</script>

<style lang="scss" scoped>
</style>
