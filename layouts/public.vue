<template>
<div class="PublicLayout">
  <MyHeader></MyHeader>
  <nuxt/>
  <MyFooter :contact="true"></MyFooter>
</div>

</template>

<script>
import MyHeader from '@/components/Header';
import MyFooter from '@/components/Footer';
import { integrateFacebook } from '@/plugins/facebook';
export default {
  name: 'PublicLayout',
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

    // Login using token
    await this.$store.dispatch('auth/update')
    // Ensure session
    if (!this.$store.state.auth.hasSession) {
      await this.$store.dispatch('auth/ensureSession')
    }

    integrateFacebook()

  }
}

</script>

<style lang="scss">
.PublicLayout {}

body {
  background-color: $color3;
}
</style>
