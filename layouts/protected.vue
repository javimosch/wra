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
import {integrateFacebook} from '@/plugins/facebook'
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


    integrateFacebook();
    
    //Login using token
    await this.$store.dispatch('auth/update')
    //Ensure session
    if(!this.$store.state.auth.hasSession){
      await this.$store.dispatch('auth/ensureSession')
    }

    if (typeof window !== 'undefined') {
      (function(d, s, id) {
        var js,
          fjs = d.getElementsByTagName(s)[0]
        if (d.getElementById(id)) {
          return
        }
        js = d.createElement(s)
        js.id = id
        js.src = 'https://connect.facebook.net/fr_FR/sdk.js#xfbml=1&version=v2.12&autoLogAppEvents=1'
        fjs.parentNode.insertBefore(js, fjs)
      }(document, 'script', 'facebook-jssdk'))
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
