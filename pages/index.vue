<template>
<div class="Home pt-5 pb-5 container">
  <div class="row no-gutters">
    <div class="col-12">
      <h1 class="text-center">TRACK JAVASCRIPT ERRORS</h1>
    </div>
  </div>
  <CallToAction></CallToAction>
  <LandingBenefits></LandingBenefits>
  <Pricing></Pricing>
  <CallToAction></CallToAction>
</div>

</template>

<script>
import CallToAction from '@/components/CallToAction';
import LandingBenefits from '@/components/LandingBenefits';
import Pricing from '@/components/Pricing';
export default {
  layout: 'public',
  name: 'Home',
  props: [],
  fetch() {},
  async asyncData() {
    return {}
  },
  computed: {

  },
  methods: {

  },
  components: {
    CallToAction,
    Pricing,
    LandingBenefits
  },
  created() {
    if (process.env.nuxtHome) {
      this.$router.push(process.env.nuxtHome)
    }
  },
  mounted() {}
}

</script>

<style lang="scss" scoped="">
.Home {
  background-color: $color3;
}
</style>
