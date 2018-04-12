<template>
<div class="Dashboard pt-5 pb-5 container">
  <div class="row no-gutters">
    <div class="col-12">
      <h3>Open the dev console and paste the script code</h3>
    </div>
    <div class="col-12">
      <h4>You don't have the script code for integration?</h4>
      <b-btn to="/dashboard">Come back to dashboard</b-btn>
    </div>
    <div class="col-12 mt-5"
         v-show="!running">
      <h4>You copied the code?</h4>
      <b-btn variant="success"
             @click="test">Start throwing errors</b-btn>
    </div>
    <div class="col-12 mt-5"
         v-show="running">
      <h5>You should see this errors in your project dashboard</h5>
      <b-btn variant="success"
             href="/dashboard" target="_blank">Open dashboard in new tab</b-btn>
      <ul class="list-group mt-2">
        <li class="list-group-item"
            v-for="(item,index) in errors" :key="index">
          <h6 class="m-0"
              v-html="item.message"></h6>
        </li>
      </ul>
    </div>
  </div>
</div>

</template>

<script>
import faker from 'faker'
import { call } from '@/plugins/rpcApi';
export default {
  layout: 'unsafe',
  name: 'Dashboard',
  props: [],
  fetch() {},
  data() {
    return {
      running: false,
      errors:[],
      interval:null
    }
  },
  async asyncData() {
    
      return {
        
      }
    
  },
  computed: {

  },
  destroyed(){
    clearInterval(this.interval)
  },
  methods: {
    test() {
      const self = this;
      this.running = true
      this.interval = setInterval(function() {
        let rnd = parseInt(Math.random(100) * 100, 10)
        try {
          if (rnd < 10) {
            throw new Error(faker.name.jobTitle().toUpperCase())
          }
          if (rnd < 20) {
            throw new Error(faker.date.month().toUpperCase())
          }
          if (rnd < 50) {
            throw new Error(faker.company.companyName().toUpperCase())
          }
          if (rnd < 70) {
            throw new Error(faker.address.city().toUpperCase())
          }
          if (rnd < 100) {
            throw new Error(faker.address.country().toUpperCase())
          }
        } catch (err) {
          self.errors.push(err);
          throw err;
        }

      },3000)
    }
  },
  components: {
  },
  created() {},
  async mounted() {}
}

</script>

<style lang="scss" scoped="">
.Dashboard {
  background-color: $color3;
}
</style>
