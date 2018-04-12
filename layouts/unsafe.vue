<template>
<div class="UnsafeLayout">
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
  name: 'UnsafeLayout',
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
    if(!this.$store.state.auth.hasSession){
      this.$router.push('/dashboard')
    }
  }
}

</script>

<style lang="scss" >
.UnsafeLayout {}
  body{
  background-color:$color3;
}
</style>
