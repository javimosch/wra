<template>
<div class="CollapsableCard card p-2">
  <div class="row">
    <div class="col-12" @click="toggle">
      <slot name="title" >
        <h5 class="text-center m-0"
          v-html="text"></h5>
      </slot>
    </div>
    <div class="col-12 mt-2">
    	<div :class="cardClass" v-show="shouldCollapse">
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
		
    padding:20px;
	}
	h5:hover,.Title:hover{
		cursor:pointer;
	}
  .animated{
    animation-fill-mode: backwards;
  }
</style>
