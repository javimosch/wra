<template>
<div class="Partners">
  <div class="row PartnersLine no-gutters justify-content-center">
    <div class="col-12 col-md-6 col-lg-3 mt-3">
      <img class="mx-auto d-block PartnerLogo"
           src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvOlOsGQm4wJmgoWHtgQAq8AUT9PSM3wewKtYWXy4oI8blF6aW" />
    </div>
    <div class="col-12 col-md-6 col-lg-3 mt-3">
      <img class="mx-auto d-block PartnerLogo"
           src="data:image/png;base64,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" />
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
