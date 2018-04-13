<template>
<div class="ProtectedLayout">
  <MyHeader></MyHeader>
	<nuxt/>
  <MyFooter :contact="false"></MyFooter>
  
</div>
</template>
<script>
import MyHeader from '@/components/Header'
import MyFooter from '@/components/Footer'
import {trackae} from '@/plugins/injection';
import { call } from '@/plugins/rpcApi';

export default {
  name: 'ProtectedLayout',
  props: [],
  fetch() {},
  data() {
    return {}
  },
  async asyncData() {
    return {}
  },
  computed: {

  },
  methods: {

  },
  components: {
    MyHeader,
    MyFooter
  },
  created() {},
  async mounted() {
    trackae('5acf19b62e76546bdabd4e44')
    //Login using token
    await this.$store.dispatch('auth/update')
    //Ensure session
    if(!this.$store.state.auth.hasSession){
      await this.$store.dispatch('auth/ensureSession')
    }
  }
}

</script>

<style lang="scss" >
.ProtectedLayout {}
  body{
  background-color:$color3;
}
</style>
