<template>
	<div>
    <LightLabel v-show="label" v-html="label"></LightLabel>
		<codemirror ref="myCm" v-model="code" :options="cmOptions"></codemirror>
	</div>	
</template>
<script>
import {LightLabel} from '@/styledComponents/labels'
export default {
  components:{
    LightLabel
  },
  name:'JsEditor',
  props:["cmMode","value",'height','readonly','label'],
  data () {
    return {
      code: this.value||'',
      cmOptions: {
        // codemirror options
        tabSize: 4,
        mode:  this.cmMode||'text/javascript',
        theme: 'base16-dark',
        lineNumbers: true,
        lineWrapping:true,
        line: true
        // more codemirror options, 更多 codemirror 的高级配置...
      }
    }
  },
  watch:{
    value(){
      this.code=this.value
    },
    code(val){
      this.$emit('input',val)
    }
  },
  methods: {
    onCmReady(cm) {
      console.log('the editor is readied!', cm)
    },
    onCmFocus(cm) {
      console.log('the editor is focus!', cm)
    },
    onCmCodeChange(newCode) {
      console.log('this is new code', newCode)
      this.code = newCode
    }
  },
  computed: {
    codemirror() {
      return this.$refs.myCm.codemirror
    }
  },
  mounted() {
    console.log('this is current codemirror object', this.codemirror)
    if(typeof window!=='undefined'){
      window.cm = this.codemirror;
      if(this.height){
        this.codemirror.setSize(null,this.height);
        console.log('HEIGH TO ',this.height)
      }
      if(this.readonly){
        this.codemirror.setOption('readOnly',true)
      }
    }
  }
}
</script>