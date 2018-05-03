<template>
<div class="WorkersCrud row">
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
    <WorkersList :items="items"
                 @select="select"
                 :item.sync="item"></WorkersList>
  </div>
  <div class="col-12"
       v-show="isDetails">
    <TextInput ref="name"
               class="w-50"
               label="Name"
               v-model="item.name"></TextInput>
    <WraProjectsSelect label="Project"
                       v-model="item.project"></WraProjectsSelect>
    <TaeUserSelect label="User"
                   v-model="item.user"></TaeUserSelect>
    
    <WorkerResources :projectId="item.project"></WorkerResources>
  </div>
</div>

</template>

<script>
import TaeUserSelect from '@/components/tae/TaeUserSelect';
import WraProjectsSelect from '@/components/wra/WraProjectsSelect';
import WorkerResources from '@/components/WorkerResources';
import LightButton from '@/components/LightButton';
import WorkersList from '@/components/WorkersList';
import TextInput from '@/components/TextInput';
import { NotyConfirm } from '@/plugins/noty';
import { call } from '@/plugins/rpcApi';
export default {
  name: 'WorkersCrud',
  props: [],
  fetch() {},
  data() {
    return {
      mode: 'list',
      items: [],
      item: {
        _id: '',
        name: '',
        user: '',
        project: ''
      }
    }
  },
  async asyncData() {
    return {}
  },
  computed: {
    projectId() {
      return this.$store.state.project && this.$store.state.project.selected && this.$store.state.project.selected._id
    },
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
    async remove() {
      if (await NotyConfirm('Confirm Delete?')) {
        let r = await call('wraRemove', {
          model: 'wra_worker',
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
        model: 'wra_worker',
        populate: [
          {
            path: 'user',
            select: 'email'
          },
          {
            path: 'project',
            select: 'name'
          }
        ]
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
        return 'Name'
      }
      if (!this.item.user) {
        this.$refs.user.focus()
        return 'User'
      }

      return true
    },
    async save(back) {
      if (this.validate() !== true) {
        return this.$noty.warning('Complete ' + this.validate())
      }
      await call('wraSave', {
        model: 'wra_worker',
        data: this.item,
        fields: [
          'name',
          'user',
          'project'
        ]
      })
      this.$noty.info('Saved')
      if (back) {
        this.back()
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
    WorkersList,
    WraProjectsSelect,
    TaeUserSelect,
    WorkerResources
  },
  created() {},
  mounted() {
    if (!process.server) {
      this.refresh()
    }
  }
}

</script>

<style lang="scss" scoped="">
.WorkersCrud {}
</style>
