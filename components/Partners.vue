<template>
<div class="Partners">
  <div class="row PartnersLine no-gutters justify-content-center">
    <div class="col-12 col-md-6 col-lg-3 mt-3"
    style="display: flex;
    justify-content: center;    align-items: center;">
      <img class="mx-auto d-block PartnerLogo"
           src="https://s3.amazonaws.com/awsmp-logos/00-Backendless-9-24.png" />
    </div>
    <div class="col-12 col-md-6 col-lg-3 mt-3" style="    display: flex;">
      <img class="mx-auto d-block PartnerLogo"
           :src="Logo" />
    </div>
  </div>
</div>

</template>

<script>
import Logo from '@/assets/partners/heroku.svg';
export default {
  name: 'Partners',
  props: [],
  fetch() {},
  data() {
    return {
      Logo
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

  },
  created() {},
  mounted() {}
}

</script>

<style lang="scss" scoped="">
.Partners {
  
}
.PartnersLine{

}

h2 {
  color: $color5;
  font-family: $font1;
}

.image {
  width: 200px;
  margin: 0 auto;
  display: block;
}

.PartnerLogo {
    max-width: 200px;
    max-height: 94px;
}
a{
  max-width: 250px;
  background: mediumseagreen;
  font-size:30px;
  border-radius: 20px;
}
a:hover{
  background: darkseagreen;
}
</style>
