<template>
<div class="WrapkendEditor">
  <no-ssr>
    <div>
      <div class="row no-gutters">
        <div class="col p-0 d-flex">
          <LightButton to="/app/dashboard"
                       className="float-left m-2 mt-0">Back</LightButton>
        </div>
      </div>
      <EditorSearchSelector ref="searchSelector" v-show="showSelector"
                            @select="selectItem"></EditorSearchSelector>
      <div class="row">
        <div class="col-12 d-flex justify-content-start align-items-center">
          <EditorTab v-for="(i) in items"
                     :key="i._id"
                     :isActive="isTabActive(i._id)"
                     @click="tabClick(i)"
                     @close="tabClose(i)"
                     :id="i._id">
            <span v-html="i.name"></span>
          </EditorTab>
        </div>
        <div class="col-12">
          <AceEditor v-model="item.code" @init="onEditorInitialized"></AceEditor>
        </div>
      </div>
    </div>
  </no-ssr>
</div>

</template>

<script>
import EditorSearchSelector from '@/components/EditorSearchSelector';
import NoSSR from 'vue-no-ssr';
import hotkeys from 'hotkeys-js';
import { call, callClient } from '@/plugins/rpcApi';
import LightButton from '@/components/LightButton';
import AceEditor from '@/components/AceEditor';
import EditorTab from '@/components/EditorTab';
import JsEditor from '@/components/JsEditor';
import _ from 'lodash';
const defaultCode = `
/*        
- Press CTRL+P Select an item (Function, Middleware, Module, etc)
- Press CTRL+N to Create a blank item

# Selector

- Write "midd [middleware name]" to filter middlewares
- Write "func [function name]" to filter functions
- Write "sch [schedule name]" to filter schedule
- Write "mod [module name]" to filter module
*/

        `
export default {
  components: {
    JsEditor,
    LightButton,
    AceEditor,
    EditorTab,
    'no-ssr': NoSSR,
    EditorSearchSelector
  },
  name: 'WrapkendEditor',
  props: [],
  fetch() {},
  data() {
    return {
      showSelector: false,
      items: [ /*
        {
          _id: 1,
          name: 'Hello World',
          code: 'console.log("Hello World!")'
        },
        {
          _id: 2,
          name: 'Sum',
          code: 'console.log(1+1)'
        }*/
      ],
      item: {
        _id: '',
        name: '',
        code: defaultCode
      }
    }
  },
  async asyncData() {
    return {}
  },
  computed: {

  },
  destroyed() {
    hotkeys.unbind('ctrl+p')
  },
  methods: {
    async selectItem(item) {
      this.item = await call('findOne', {
        model: item.type,
        query: {
          _id: item._id
        }
      })
      this.items.push(this.item)
      this.showSelector = false
    },
    noTabs() {
      return this.items.length === 0
    },
    tabClose(item) {
      let index = _.findIndex(this.items, i => i._id === item._id)
      this.items.splice(index, 1)
      if (this.items[index - 1] || this.items[0]) {
        this.tabClick(this.items[index - 1] || this.items[0])
      } else {
        this.item = {
          _id: '',
          name: '',
          code: defaultCode
        }
      }
    },
    isTabActive(id) {
      return this.item._id === id
    },
    tabClick(item) {
      hotkeys.setScope(item._id)
      this.item = item
    },
    onEditorInitialized(editor) {
    	var self = this;
      editor.commands.addCommand({
        name: 'openSearchSelector',
        bindKey: {
          win: 'Ctrl-p',
          mac: 'Ctrl-p'
        },
        exec: function(editor) {
        	self.openSearchSelector();
        }
      })
      editor.commands.addCommand({
        name: 'hideSearchSelector',
        bindKey: {
          win: 'Esc',
          mac: 'Esc'
        },
        exec: function(editor) {
        	self.showSelector = false
        }
      })
    },
    openSearchSelector(){
		this.showSelector = true
		this.$refs.searchSelector.focus()
    },
    async bindKeyboard() {
      if (!process.server) {

        var self = this

        hotkeys('ctrl+p', function(event, handler) {
          event.preventDefault()
          self.openSearchSelector();
        })
        hotkeys('esc', function(event, handler) {
          event.preventDefault()
          self.showSelector = false
        })

        for (var x = 1; x <= 9; x++) {
          ((xx) => {
            hotkeys('ctrl+' + xx, function(event, handler) {
              console.log(x)
              event.preventDefault()
              if (self.items[xx - 1]) {
                self.tabClick(self.items[xx - 1])
              }
            })
          })(x)
        }

      // hotkeys.setScope('editor')
      }
    }

  },

  created() {},
  async mounted() {

    await this.bindKeyboard()

  }
}

</script>

<style lang="scss" scoped="">
.WrapkendEditor {}
</style>
