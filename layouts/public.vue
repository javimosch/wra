<template>
<div class="PublicLayout">
  <MyHeader></MyHeader>
  <nuxt/>
  <WraFooter :contact="true"></WraFooter>
</div>

</template>

<script>
import MyHeader from '@/components/wra/WraLandingHeader';
import WraFooter from '@/components/wra/WraFooter';

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
    WraFooter
  },
  created() {},
  async mounted() {

    // Login using token
    //await this.$store.dispatch('auth/update')
    // Ensure session
    //if (!this.$store.state.auth.hasSession) {
//      await this.$store.dispatch('auth/ensureSession')
  //  }

  }
}

</script>

<style lang="scss">
.PublicLayout {}

body {
  background-color: $color3;
}
</style>
