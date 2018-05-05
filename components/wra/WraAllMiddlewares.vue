<template>
<div class="WraAllMiddlewares row">
  <div class="col-12 mb-2">
    <div class="row no-gutters">
      <div class="col"
           v-show="isList">
        <LightButton @click="create">Create</LightButton>
      </div>
      <div class="col"
           v-show="isList">
        <LightButton @click="refresh">Refresh</LightButton>
      </div>
      <div class="col"
           v-show="isDetails">
        <LightButton @click="save(false)"
                     class="float-left">Save</LightButton>
      </div>
      <div class="col"
           v-show="isDetails">
        <LightButton @click="save(true)">Save and return</LightButton>
      </div>
      <div class="col"
           v-show="isEdition">
        <LightButton @click="remove()">Remove</LightButton>
      </div>
      <div class="col"
           v-show="isDetails">
        <LightButton @click="back">Return</LightButton>
      </div>
    </div>
  </div>
  <div class="col-12"
       v-show="isList">
    <h3>All Middlewares</h3>
    <ListView :columns="columns"
              :items="items"
              @select="select"></ListView>
  </div>
  <div class="col-12"
       v-show="isDetails">
       <DocumentHistorySelect :disabled="!item._id"
                           :id="item._id"
                           type="api_action_middleware_history"
                           @select="onHistorySelect"></DocumentHistorySelect>

    <TextInput ref="name"
               class="w-50"
               label="Name"
               v-model="item.name"></TextInput>
    <LightSelect ref="type"
                 v-model="item.type"
                 label="Type"
                 :options="[{label:'Pre',value:'pre'},{label:'Post',value:'post'}]"></LightSelect>
    
    <JsEditor label="Code"
              class="mt-3"
              :height="800"
              v-model="item.code"></JsEditor>
  </div>
</div>

</template>

<script>
import DocumentHistorySelect from '@/components/DocumentHistorySelect';
import LightSelect from '@/components/controls/LightSelect';
import LightButton from '@/components/LightButton';
import JsEditor from '@/components/JsEditor';
import ListView from '@/components/controls/ListView';
import TextInput from '@/components/TextInput';
import { NotyConfirm } from '@/plugins/noty';
import { call } from '@/plugins/rpcApi';
export default {
  name: 'WraAllMiddlewares',
  props: [],
  fetch() {},
  data() {
    return {
      columns: [
        {
          label: 'Name',
          field: 'name',
          filterOptions: {
            enabled: true
          }
        }
      ],
      mode: 'list',
      items: [],
      item: {
        _id: '',
        email: '',
        password: ''
      }
    }
  },
  async asyncData() {
    return {}
  },
  computed: {
    isList() {
      return this.mode === 'list'
    },
    isDetails() {
      return this.mode === 'details'
    },
    isNew() {
      return !this.item._id
    },
    isEdition() {
      return this.isDetails && !!this.item._id
    }
  },
  methods: {
    async onHistorySelect(historyDoc) {
      await this.save(false, '')
      this.item.code = historyDoc.code
      await this.save(false, 'Restored')
    },
    async remove() {
      if (await NotyConfirm('Confirm Delete?')) {
        let r = await call('removeWhen', {
          model: 'api_action_middleware',
          query: {
            _id: this.item._id
          }
        })
        console.info('RESULT', r)
        this.$noty.error('Item removed')
        this.back()
      }
    },
    async refresh() {
      this.items = await call('findPaginate', {
        model: 'api_action_middleware'
      })
    },
    select(item) {
      this.mode = 'details'
      this.item = {
        ...this.item,...item
      }
    },
    back() {
      this.mode = 'list'
      this.refresh()
    },
    validate() {
      if (!this.item.name) {
        this.$refs.name.focus()
        return 'Email'
      }
      if (!this.item.type) {
        this.$refs.type.focus()
        return 'Type (Pre,Post)'
      }

      return true
    },
    async save(back, customMessage) {
      if (this.validate() !== true) {
        return this.$noty.warning('Complete ' + this.validate())
      }
      try {
        Object.assign(this.item, await call('wraSaveApiActionMiddleware', this.item))
        if (customMessage === undefined) {
          this.$noty.info('Saved')
        } else {
          if (customMessage !== '') {
            this.$noty.info(customMessage)
          }
        }
        if (back) {
          this.back()
        }
      } catch (err) {
        this.$noty.warning(err.message)
      }
    },
    create() {
      var self = this
      Object.keys(this.item).forEach(k => self.item[k] = '')
      this.mode = 'details'
    }
  },
  components: {
    TextInput,
    LightButton,
    LightSelect,
    ListView,
    JsEditor,
    DocumentHistorySelect
  },
  created() {},
  mounted() {}
}

</script>

<style lang="scss" scoped="">
.WraAllMiddlewares {}
</style>
