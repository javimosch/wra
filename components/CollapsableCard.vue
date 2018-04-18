<template>
<div class="CollapsableCard card">
  <div class="row no-gutters">
    <div class="col-12" @click="toggle">
      <slot name="title" >
        <h5 class="text-center mx-auto m-2 p-0"
          v-html="text"></h5>
      </slot>
    </div>
    <div class="col-12 p-2" v-show="shouldCollapse">
    	<div :class="cardClass" >
    		<slot></slot>
    	</div>
    </div>
  </div>
</div>

</template>

<script>
export default {
  name: 'CollapsableCard',
  props: [
    'text','animation','collapsed'
  ],
  fetch() {},
  data() {
    return {
    	isCollapsed:false
    }
  },
  async asyncData() {
    return {}
  },
  computed: {
    shouldCollapse(){
      if(this.collapsed===undefined) return this.isCollapsed
        else return this.collapsed
    },
  	cardClass(){
  		return ` animated ${this.animation||'fadeIn'}`
  	}
  },
  methods: {
  	toggle(){
      this.isCollapsed = !this.isCollapsed
      this.$emit('update:collapsed',!this.collapsed)
  	}
  },
  components: {

  },
  created() {
    if(this.collapsed===undefined){
      this.$emit('update:collapsed',false)
    }
  },
  mounted() {}
}

</script>

<style lang="scss" scoped>
.CollapsableCard {}
	h5,.Title{
		color:$color1;
	}
	h5:hover,.Title:hover{
		cursor:pointer;
	}
  .animated{
    animation-fill-mode: backwards;
  }
</style>
