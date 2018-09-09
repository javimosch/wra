<template>
<li class="list-group-item MenuItem">
  <b-link :to="to"
          class=""
          @click="click" :disabled="isDisabled">
    <div class="row no-gutters">
      <div class="col-12">
        <i :class="'fas mx-auto d-block text-center '+(icon?icon:'')"></i>
      </div>
      <div class="col-12">
        <span class="mx-auto d-block text-center">
              	<slot></slot>
              </span>
      </div>
    </div>
  </b-link>
</li>

</template>

<script>
export default {
  components: {

  },
  name: 'MenuItem',
  props: [
    'to',
    'icon',
    'disabled'
  ],
  fetch() {},
  data() {
    return {}
  },
  async asyncData() {
    return {}
  },
  computed: {
  	isDisabled(){
  		return this.disabled!=undefined?this.disabled:false
  	}
  },
  methods: {
    click() {
      this.$emit('click')
    }
  },
  created() {},
  mounted() {}
}

</script>

<style lang="scss" scoped="">
.MenuItem {}

a:hover,
a:hover i {
  text-decoration: none;
  color: $color2;
}

a {
  text-align: center;
  margin: 0 auto;
  display: block;
  border: 0!important;
  border-top: 0;
  border-bottom: 0;
  font-size: 12px;
}

a,
a i {
  color: white;
}

a[disabled],
a.disabled,a[disabled] i,a.disabled i  {
  color: dimgrey;
}

i {
  font-size: 25px;
}

li {
  border-top-left-radius: 0px;
  border-top-right-radius: 0px;
  background: transparent;
  border: 0px;
  text-align: left;
}
</style>
