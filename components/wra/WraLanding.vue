<template>
<div class="WraLanding pt-5 pb-5">
  <div class="row no-gutters">
    

    <div class="col-12 mt-5">
      <h2 class="text-center">Backend as a service (BaaS) for Startups</h2>
    </div>
  </div>
  <CallToAction class="mb-5"></CallToAction>
  <div class="mb-5 mt-5">&nbsp;</div>

  
  <LandingSection title="Where we are" class="mt-5"
                    :css="'background-color:white;'">
      <img class="Brands" :src="Brands"/>
    </LandingSection>

  <div class="parallax"
       data-rellax-speed="-0.5">
    
       <LandingSection title="Plans" class="mt-5"
                    :css="'background-color:white;'">
      <Pricing></Pricing>
    </LandingSection>
  </div>

  <LandingSection className="pb-0" title=""
                  :css="'background-color:#033048;position:relative;z-index:20;'">
    <WraLandingStats :one="1200"
                  :two="500"
                  :three="250"></WraLandingStats>
  </LandingSection>

  <div class="parallax"
       data-rellax-speed="-1">
    <LandingSection title="Inspirations" class="p-5"
                    :css="'background-color:white;'">
      <Partners v-if="true" class="mb-5"></Partners>
    </LandingSection>
  </div>
  <div class="parallax"
       data-rellax-speed="-1.1">
       <div class="mt-5"></div>
    <CallToAction></CallToAction>
  </div>
</div>

</template>

<script>
import Brands from '@/assets/brands.svg'
import LandingSection from '@/components/LandingSection';
import WraLandingStats from '@/components/WraLandingStats';
import CallToAction from '@/components/CallToAction';
import Partners from '@/components/Partners';
import LandingBenefits from '@/components/LandingBenefits';
import Pricing from '@/components/Pricing';
import { startParallax } from '@/plugins/parallax';
export default {
  name: 'WraLanding',
  props: [],
  fetch() {},
  data(){
    return {
      Brands
    }
  },
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
    WraLandingStats
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

    ///startParallax('.parallax')
  }
}

</script>

<style lang="scss" scoped="">
.WraLanding {
  background-color: $color3;
}
.Brands{
  max-width: 600px;
  margin: 0 auto;
  display: block;
}
h2 {
  font-family: $font2;
  word-spacing: 17px;
  font-size:25px;
  color:$color2;
  padding-bottom:0px;
}
</style>
