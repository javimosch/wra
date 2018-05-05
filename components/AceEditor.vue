<template>
<div class="AceEditor">
  <div class="AceEditorWrapper">
    <div ref="editor"
         :id="editorId"
         class="AceEditorMain">
    </div>
  </div>
</div>

</template>

<script>
import shortid from 'shortid';
export default {
  name: 'AceEditor',
  props: [
    'value'
  ],
  fetch() {},
  data() {
    return {
      editorId: shortid.generate(),
      editor:null
    }
  },
  watch: {
    value(v) {
      if (!!v && this.editor) {
        this.editor.setValue(v, -1)
      }
    }
  },
  async asyncData() {
    return {}
  },
  computed: {

  },
  destroyed(){
    this.editor  && this.editor.destroy && this.editor.destroy()
  },
  methods: {
    async init() {
      var self = this
      if (process.server) {
        return
      }
      var ace = require('brace')
      require('brace/mode/javascript')
      require('brace/theme/terminal')
      var editor = self.editor = ace.edit(this.editorId)
      editor.setOptions({
        maxLines: Infinity
      })
      editor.session.setUseWrapMode(true)
      editor.getSession().setMode('ace/mode/javascript')
      editor.setTheme('ace/theme/terminal')
      editor.getSession().on('change', function() {
        self.$emit('input', editor.getValue())
      })
      if(!!self.value){
      	editor.setValue(self.value, -1)
      }
      self.$emit('init',editor)
    }
  },
  components: {

  },
  created() {},
  async mounted() {
    await this.init()
  }
}

</script>

<style lang="scss" scoped="">
.AceEditor {}

.AceEditorWrapper {
  resize: vertical;
  overflow: auto;
  margin: 0px;
  padding: 5px 0px;
  background: black;
  padding-bottom: 10px;
}

.AceEditorMain {
  min-height: 700px;
  height: 98%;
}
</style>
