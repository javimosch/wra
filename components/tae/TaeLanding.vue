<template>
<div class="TaeLanding pt-5 pb-5">
  <div class="row no-gutters">
    <div class="col-12">
      <h2 class="text-center">ERROR TRACKING FOR JAVASCRIPT STARTUPPERS</h2>
    </div>
  </div>
  <CallToAction></CallToAction>
  <div class="parallax"
       data-rellax-speed="-0.5">
    
       <LandingSection title="Simple pricing" class="mt-5 mb-5"
                    :css="'background-color:white;'">
      <Pricing></Pricing>
    </LandingSection>
  </div>
  <div class="parallax"
       data-rellax-speed="-1">
    <LandingSection title="Inspirations"
                    :css="'background-color:white;'">
      <Partners v-if="true"></Partners>
    </LandingSection>
  </div>
  <div class="parallax"
       data-rellax-speed="-1.1">
    <CallToAction></CallToAction>
  </div>
</div>

</template>

<script>
import LandingSection from '@/components/LandingSection';
import LandingStats from '@/components/LandingStats';
import CallToAction from '@/components/CallToAction';
import Partners from '@/components/Partners';
import LandingBenefits from '@/components/LandingBenefits';
import Pricing from '@/components/Pricing';
import { startParallax } from '@/plugins/parallax';
export default {
  name: 'TaeLanding',
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
    Partners,
    LandingSection,
    LandingStats
  },
  created() {
    if (process.env.nuxtHome) {
      this.$router.push(process.env.nuxtHome)
    }
  },
  mounted() {
    if (process.server) {
      return
    }

    startParallax('.parallax')
  }
}

</script>

<style lang="scss" scoped="">
.TaeLanding {
  background-color: $color3;
}

h2 {
  font-family: $font2;
  word-spacing: 17px;
  font-size:25px;
}
</style>
