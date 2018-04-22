<template>
<div class="Partners">
  <div class="row PartnersLine no-gutters justify-content-center">
    <div class="col-12 col-md-6 col-lg-3 mt-3">
      <img class="mx-auto d-block PartnerLogo"
           src="https://s3.amazonaws.com/awsmp-logos/00-Backendless-9-24.png" />
    </div>
  </div>
</div>

</template>

<script>
export default {
  name: 'Partners',
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
  max-width: 250px;
  max-height: 85px;
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
