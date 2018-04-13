<template>
<div class="Home pt-5 pb-5 container">
  <div class="row no-gutters">
    <div class="col-12">
      <h2 class="text-center">JAVASCRIPT ERROR TRACKING SIMPLE AS FU*CK</h2>
    </div>
  </div>
  <CallToAction></CallToAction>
  <LandingBenefits></LandingBenefits>
  <div class="parallax" data-rellax-speed="-0.5">
    <Pricing></Pricing>
  </div>
    <div class="parallax" data-rellax-speed="-0.3">
    <Partners v-if="false"></Partners>
    <CallToAction></CallToAction>
  </div>
</div>

</template>

<script>
import CallToAction from '@/components/CallToAction';
import Partners from '@/components/Partners';
import LandingBenefits from '@/components/LandingBenefits';
import Pricing from '@/components/Pricing';
import {startParallax} from '@/plugins/parallax';
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
    LandingBenefits,
    Partners
  },
  created() {
    if (process.env.nuxtHome) {
      this.$router.push(process.env.nuxtHome)
    }
  },
  mounted() {
    if(process.server)return;

      startParallax('.parallax')
  }
}

</script>

<style lang="scss" scoped="">
.Home {
  background-color: $color3;
}
h2{
  font-family: Gaegu,cursive;
}
</style>
