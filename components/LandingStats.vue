<template>
<div class="LandingStats container">
  <ScrollContainer @change="change">
    <ScrollItem id="LandingStats" >
      <div class="row no-gutters justify-content-center pb-5">
        <div class="col-12 col-md-4">
          <h2 class="text-center" v-html="number1"></h2>
          <p class="text-center">Startups</p>
        </div>
        <div class="col-12 col-md-4">
          <h2 class="text-center">200</h2>
          <p class="text-center">Startups</p>
        </div>
        <div class="col-12 col-md-4">
          <h2 class="text-center">200</h2>
          <p class="text-center">Startups</p>
        </div>
      </div>
    </ScrollItem>
  </ScrollContainer>
</div>

</template>

<script>

import { ScrollContainer, ScrollItem } from 'vue-scrollmonitor';
export default {
  name: 'LandingStats',
  props: ['nOne'],
  fetch() {},
  data() {
    return {
    	number1:0,
    	number2:300,
    	number3:400
    }
  },
  async asyncData() {
    return {}
  },
  computed: {

  },
  methods: {
  	change(state){
  		if(state && state.LandingStats && state.LandingStats.isFullyInViewport){
  			this.number1 = this.nOne || 500;
  		}
  	}
  },
  components: {
    ScrollContainer,
    ScrollItem
  },
  created() {},
  mounted() {}
}

</script>

<style lang="scss" scoped="">
.LandingStats {}

h2,
p {
  color: white;
}

h2 {
  font-size: 45px;
  padding: 0px;
}
</style>
