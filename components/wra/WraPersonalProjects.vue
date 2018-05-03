<template>
<div class="WraPersonalProjects row">
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
  <div class="col-12 mt-3"
       v-show="isList">
    <WraPersonalProjectsListView :items="items"
                                 @select="select"
                                 :item.sync="item"></WraPersonalProjectsListView>
  </div>
  <div class="col-12"
       v-show="isDetails">
    <TextInput ref="appName"
               class="w-50"
               label="App Name"
               v-model="item.appName"
               :disabled="true"></TextInput>
    <TextInput ref="name"
               class="w-50"
               label="Name"
               v-model="item.name"></TextInput>
    <TextInput ref="dbURI"
               class="w-50"
               label="dbURI (Mongoose connection string)"
               v-model="item.dbURI"></TextInput>

    <ProjectLogoUploader 
    :project="item._id" 
    :image="item.images && item.images.brand_logo" class="mt-3"
    ></ProjectLogoUploader>

    <CollapsableCard text="Integration"
                     class="mt-4">
      <TextInput ref="apiKey"
                 class="w-50"
                 label="Client key"
                 :disabled="true"
                 v-model="item.apiKey"></TextInput>
      <LightButton @click="generateApiKey()">Generate client key</LightButton>
      <TextInput ref="serverKey"
                 class="w-50"
                 label="Server key"
                 :disabled="true"
                 v-model="item.serverKey"></TextInput>
      <LightButton @click="generateServerKey()">Generate server key</LightButton>
    </CollapsableCard>
    <StringList v-model="item.dependencies"
                ref="dependencies"
                label="Dependencies (npm modules)"></StringList>
    <CollapsableCard text="Monitor"
                     class="mt-4">
      <LightButton @click="checkDatabase">Check database</LightButton>
    </CollapsableCard>
  </div>
</div>

</template>

<script>
import { NotyConfirm } from '@/plugins/noty';
import LightButton from '@/components/LightButton';
import ProjectLogoUploader from '@/components/ProjectLogoUploader';
import WraPersonalProjectsListView from '@/components/wra/WraPersonalProjectsListView';
import TextInput from '@/components/TextInput';
import StringList from '@/components/controls/StringList';
import CollapsableCard from '@/components/CollapsableCard';
import { call } from '@/plugins/rpcApi';
export default {
  name: 'WraPersonalProjects',
  props: [],
  fetch() {},
  data() {
    return {
      mode: 'list',
      items: [],
      item: {
        _id: '',
        dbURI: '',
        dependencies: [],
        apiKey: '',
        serverKey:'',
        images:{
          brand_logo:{}
        }
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
    generateApiKey() {
      var self = this
      call('wraProjectGenerateApiKey', {
        project: this.item._id
      }).then(r => {
        self.item.apiKey = r.apiKey
        self.$noty.info('Key generated')
      }).catch(err => self.$noty.warning('Try later'))
    },
    generateServerKey() {
      var self = this
      call('wraProjectGenerateServerKey', {
        project: this.item._id
      }).then(r => {
        self.item.serverKey = r.serverKey
        self.$noty.info('Key generated')
      }).catch(err => self.$noty.warning('Try later'))
    },
    async remove() {
      if (await NotyConfirm('Confirm Delete?')) {
        let r = await call('wraRemove', {
          model: 'wra_project',
          query: {
            _id: this.item._id
          }
        })
        console.info('RESULT', r)
        this.$noty.error('Item removed')
        this.back()
      }
    },
    async checkDatabase() {
      let r = await call('wraProjectCheckDatabase', {
        project: this.item._id
      })
      if (r.connected) {
        this.$noty.info('Connection success')
      } else {
        if (r.err.message === 'INVALID_DB_URI') {
          this.$noty.warning('Invalid dbURI format')
        } else {
          this.$noty.warning('Something went wrong')
        }
      }
    },
    async refresh() {
      this.items = await call('wraGetPersonalProjects')
    },
    select(item) {
      this.create()
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
        return 'Name'
      }
      if (!this.item.dbURI) {
        this.$refs.dbURI.focus()
        return 'dbURI'
      }
      if (this.item.dependencies.length === 0) {
        this.$refs.dependencies.focus()
        return 'dependencies (at least one)'
      }

      return true
    },
    async save(back) {
      if (this.validate() !== true) {
        return this.$noty.warning('Complete ' + this.validate())
      }
      await call('wraSavepersonalProject', this.item)
      
      this.$noty.info('Saved')

      
        try {
          await call('wraUpdateSharedWorkerDependencies', {
            project: this.item._id
          })
          this.$noty.info(this.item.name+': Dependencies were updated successfully',{
          	layout:'bottom',
          	timeout:5000
          })
        } catch (err) {
          this.$noty.warning('Unable to update dependencies.', {
            timeout: false
          })
        }
      

      if (back) {
        this.back()
      }
    },
    create() {
      var self = this
      Object.keys(this.item).forEach(k => {
        if (typeof self.item[k] === 'object' && self.item[k].length !== undefined) {
          return self.item[k] = []
        }
        self.item[k] = ''
      })
      this.$refs.dependencies.clear()
      this.mode = 'details'
    }
  },
  components: {
    TextInput,
    LightButton,
    WraPersonalProjectsListView,
    StringList,
    CollapsableCard,
    ProjectLogoUploader
  },
  created() {},
  mounted() {
    this.refresh()
  }
}

</script>

<style lang="scss" scoped="">
.WraPersonalProjects {}
</style>
