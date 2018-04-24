<template>
<div class="WraMyActions row">
  <div class="col-12 mb-2">
    <div class="row no-gutters">
      <div class="col"
           v-show="isList">
        <LightButton @click="reset">Create</LightButton>
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
    <WraMyActionsList :items="items"
                      @select="select"
                      :item.sync="item"></WraMyActionsList>
  </div>
  <div class="col-12"
       v-show="isDetails">
    <TextInput ref="name"
               class="w-50"
               label="Name"
               v-model="item.name"></TextInput>
    <WraProjectsSelect class="mt-3"
                       ref="project"
                       label="Project"
                       v-model="item.project"></WraProjectsSelect>
    <LightLabel>Code</LightLabel>
    <JsEditor v-model="item.code"
              :height="800"></JsEditor>
    <CollapsableCard text="Testing"
                     class="mt-3"
                     v-show="item._id">
      <LightLabel>Payload (JSON)</LightLabel>
      <JsEditor v-model="item.metadata.testingPayload"
                cmMode="text/json"></JsEditor>
      <LightButton @click="test">Test</LightButton>
      <JsEditor class="mt-3"
                v-show="testingResult"
                v-model="testingResult"
                cmMode="text/json"></JsEditor>
      <LightButton @click="testClear">Clear</LightButton>
    </CollapsableCard>
  </div>
</div>

</template>

<script>
import WraProjectsSelect from '@/components/wra/WraProjectsSelect';
import CollapsableCard from '@/components/CollapsableCard';
import { LightLabel } from '@/styledComponents/labels';
import JsEditor from '@/components/JsEditor';
import LightButton from '@/components/LightButton';
import WraMyActionsList from '@/components/wra/WraMyActionsList';
import TextInput from '@/components/TextInput';
import { NotyConfirm } from '@/plugins/noty';
import { call, callClient } from '@/plugins/rpcApi';
export default {
  name: 'WraMyActions',
  props: [],
  fetch() {},
  data() {
    return this.createData()
  },
  async asyncData() {
    return this.createData()
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
    testClear() {
      this.testingResult = ''
    },
    async test() {
      if (!this.item.project) {
        return this.$noty.warning('Project required')
      }
      let payload = {}
      try {
        try {
          payload = JSON.parse(this.item.metadata.testingPayload)
        } catch (err) {
          return this.$noty.warning('Invalid testing payload')
        }
        let res = await callClient(this.item.name, Object.assign({}, payload, {
          $project: this.item.project
        }))
        this.testingResult = JSON.stringify(res, null, 2)
      } catch (err) {
        this.testingResult = JSON.stringify({
          message: err.message
        }, null, 2)
      // return this.$noty.warning('Almost...')
      }
    },
    async remove() {
      if (await NotyConfirm('Confirm Delete?')) {
        let r = await call('wraRemove', {
          model: 'wra_action',
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
      if (!this.$store.state.auth.user) {
        return
      }
      this.items = await call('find', {
        model: 'wra_action',
        /*populate: {
          path: 'project',
          select: 'name'
        }*/
        query:{
          project: {
            $in: [this.$store.state.project.selected._id]
          }
        },
        owner: this.$store.state.auth.user._id
      })
    },
    select(item) {
      this.reset()
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
        return 'name'
      }
      if (!this.item.project) {
        this.$refs.project.focus()
        return 'project'
      }

      return true
    },
    async save(back) {
      if (this.validate() !== true) {
        return this.$noty.warning('Complete ' + this.validate())
      }
      try {
        await call('wraSave', {
          $grabCurrentUser: 'owner',
          model: 'wra_action',
          fields: [
            'name',
            'code',
            'project',
            'metadata'
          ],
          data: this.item
        })
        this.$noty.info('Saved')
        if (back) {
          this.back()
        }
      } catch (err) {
        this.$noty.warning(err.message)
      }
    },
    reset() {
      Object.assign(this.$data, this.createData())
      this.mode = 'details'
    },
    createData() {
      let data = {
        mode: 'list',
        items: [],
        item: {
          _id: '',
          name: '',
          metadata: {
            testingPayload: ''
          }
        },
        testingResult: ''
      }
      // Object.assign(this.$data, data)
      return data
    }
  },
  components: {
    TextInput,
    LightButton,
    WraMyActionsList,
    JsEditor,
    LightLabel,
    CollapsableCard,
    WraProjectsSelect
  },
  created() {},
  mounted() {
    if(!process.server){
      this.refresh()
    }
  }
}

</script>

<style lang="scss" scoped="">
.WraMyActions {}
</style>
