<template>
<div :class="{EditorTab:true,'ml-1':true,isActive:isActive}" @click="click">
  <span class="Text" >
  	<slot></slot>
  </span>
  <span class="CloseButton float-right mr-1" @click="close">x</span>
</div>

</template>

<script>
import hotkeys from 'hotkeys-js';
import shortid from 'shortid';
export default {
  name: 'EditorTab',
  props: [
    'isActive','id'
  ],
  fetch() {},
  data() {
    return {
    	//id: shortid.generate()
    }
  },
  async asyncData() {
    return {}
  },
  computed: {

  },
  methods: {
  	click(){
  		this.$emit('click')
  		
  	},
  	close(event){
  		event.preventDefault()
  		event.stopPropagation()
  		this.$emit('close')	
  	},

  	async bindKeyboard() {
      if (!process.server) {
      	var self = this
        hotkeys('ctrl+w',this.id, function(event, handler) {
          event.preventDefault()
          if(self.isActive){
          	self.close()
          }
        })
        
      }
    }
  },
  components: {

  },
  created() {},
  destroyed(){
  	hotkeys.deleteScope(this.id);
  },
  async mounted() {
  	await this.bindKeyboard()
  }
}

</script>

<style lang="scss" scoped="">
.EditorTab {
  height: 25px;
  background-color: #333;
  color: white;
  min-width: 80px;
  text-align: center;
  line-height: 25px;
  font-size: 9px;
  border-radius: 12px 5px 0px 0px;
}

.isActive {
  background-color: black;
}
.CloseButton,.Text{
	cursor:pointer;
}
</style>
