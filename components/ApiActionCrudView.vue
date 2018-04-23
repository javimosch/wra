<template>
<div class="ApiActionCrudView">
  <CollapsableCard :text="itemName"
                   :collapsed.sync="collapsed">
    <div slot="title">
      <h3 class="text-center m-0 Title"
          v-html="itemName"></h3>
    </div>
    <div class="row">
      <div class="col-12"
           v-show="!item.name">
        <p>Edition</p>
        <ApiActionSelect @onClear="onClear"
                         v-model="item._id"
                         @change="onSelect"></ApiActionSelect>
        <hr>
      </div>
      <div class="col-12 col-md-8 offset-md-2 mt-2">
        <b-form-input v-model="item.name"
                      class="mt-2"
                      placeholder="name"></b-form-input>
        <div v-show="isSaveVisible">
          <b-btn class="mx-auto d-block mt-2"
                 size="lg"
                 variant="warning"
                 v-html="saveLabel"
                 @click="save"></b-btn>
        </div>
        <div class="alert alert-danger mt-2" v-show="isItemProtected"
             role="alert">
          <p><strong>Important</strong>Protected items like this can only be edited manually.</p>
        </div>
      </div>
      <div class="col-12 mt-3">
        <label>Code</label>
        <JsEditor v-show="true"
                  :height="600"
                  class="text-left"
                  cmMode="text/javascript"
                  v-model="item.code"></JsEditor>
      </div>
    </div>
  </CollapsableCard>
</div>

</template>

<script>
import CollapsableCard from '@/components/CollapsableCard';
import JsEditor from '@/components/JsEditor';
import ApiActionSelect from '@/components/controls/ApiActionSelect';
import { getRoomSocket } from '@/plugins/taeSockets';
import { call } from '@/plugins/rpcApi';
import _ from 'lodash';
export default {
  name: 'ApiActionCrudView',
  props: [],
  fetch() {},
  data() {
    return {
      item: {
        _id: '',
        name: '',
        code: ''
      },
      socket: null,
      original: {},
      collapsed: false
    }
  },
  async asyncData() {
    return {}
  },
  computed: {
    isItemProtected(){
      return this.item._id && this.item.protected
    },
    isSaveVisible() {
      if (!this.item.name) {
        return false
      }
      if (this.item.protected) {
        return false
      }
      return true
    },
    itemName() {
      return this.item.original || this.item.name || '(Choice or create a record)'
    },
    saveLabel() {
      return this.item._id ? 'Update' : 'Create'
    }
  },
  destroyed() {
    if (this.socket) {
      this.socket.close()
    }
  },
  methods: {
    onSelect(item) {
      let self = this
      Object.assign(this.item, item)
      this.original = item
      // this.collapsed=false
      if (item && item._id) {
        setTimeout(() => self.$emit('input', item._id), 100)
      }
    },
    onClear() {
      Object.assign(this.item, {
        _id: '',
        name: '',
        code: ''
      })
    },
    async save() {
      let self = this
      let item = await call('saveRecord', Object.assign(_.pick(this.item, [
        '_id',
        'name',
        'code'
      ]), {
        model: 'api_action'
      }))
      this.onSelect(item)
      //this.collapsed = false
      await self.sync()
    },
    sync() {
      call('syncAction', {
        _id: this.item._id
      })
      this.$noty.info('Saved',{
        layout:"bottomRight"
      })
    }
  },
  components: {
    CollapsableCard,
    ApiActionSelect,
    JsEditor
  },
  created() {},
  async mounted() {
    if (process.server) {
      return
    }

    this.socket = this.socket || await getRoomSocket('api_actions', 'coreEnsureActionsSocketRoom')
  }
}

</script>

<style lang="scss" scoped="">
.ApiActionCrudView {}

a,
button {
  max-width: 200px;
  background-color: $color4;
}

a:hover,
button:hover {
  background-color: $color1;
  border-color: $color1;
  color: $color6;
}
</style>
