<template>
<div class="WrakendDashboard container">
  <WelcomeText></WelcomeText>
</div>

</template>

<script>
import WelcomeText from '@/components/WelcomeText'
export default {
  layout: 'app',
  middleware: [
    'appAuth'
  ],
  name: 'WrakendDashboard',
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
    WelcomeText
  },
  created() {

  },
  mounted() {
    
  }
}

</script>

<style lang="scss" scoped="">
.WrakendDashboard {}
</style>
