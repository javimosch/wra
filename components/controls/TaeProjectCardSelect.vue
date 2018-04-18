<template>
<div class="TaeProjectCardSelect p-3">
  <CollapsableCard :text="projectName"
                   :collapsed.sync="collapsed"
                   class="p-5">
    <div slot="title">
      <h3 class="text-center m-0 p-0 Title"
          v-html="projectName"></h3>
    </div>
    <div class="row">
      <div class="col-12 col-md-8 offset-md-2"
           v-show="!item.name">
        <p>Select an existing project</p>
        <TaeProjectSelect @onClear="onClear"
                          :value="value"
                          @change="onSelect"></TaeProjectSelect>
      </div>
      <div class="col-12 mt-2">
        <CollapsableCard class="mt-3"
                         text="Details">
          <div class="row pb-3">
            <div class="col-12 col-md-8 offset-md-2 mt-2">
              <p v-show="!item._id">(New project)</p>
              <b-form-input v-model="item.name"
                            class="mt-2"
                            placeholder="name"></b-form-input>
            </div>
          </div>
        </CollapsableCard>
      </div>
      <div class="col-12 mt-1"
           v-show="item._id">
        <CollapsableCard class="mt-3 mb-5"
                         text="Integration"
                         v-show="item._id">
          <CopyPasteScript :project="item._id"></CopyPasteScript>
        </CollapsableCard>
      </div>
      <div class="col-12 mt-2">
        <div class="row no-gutters">
          <div class="col">
            <b-btn class="mx-auto d-block mt-2"
                   size="md"
                   variant="warning"
                   v-html="saveLabel"
                   @click="save"
                   :disabled="!item.name"></b-btn>
          </div>
          <div class="col"
               v-show="item._id">
            <b-btn class="mx-auto d-block mt-2"
                   size="md"
                   variant="secondary"
                   v-html="'Clear'"
                   @click="onClear"></b-btn>
          </div>
        </div>
      </div>
    </div>
  </CollapsableCard>
</div>

</template>

<script>
import CopyPasteScript from '@/components/CopyPasteScript';
import CollapsableCard from '@/components/CollapsableCard';
import TaeProjectSelect from '@/components/controls/TaeProjectSelect';
import { call } from '@/plugins/rpcApi';
import _ from 'lodash';
export default {
  name: 'TaeProjectCardSelect',
  props: [
    'value'
  ],
  fetch() {},
  data() {
    return {
      item: {
        _id: '',
        name: ''
      },
      original: {},
      collapsed: false
    }
  },
  async asyncData() {
    return {}
  },
  computed: {
    projectName() {
      return this.item.original || this.item.name || 'Project'
    },
    saveLabel() {
      return this.item._id ? 'Update' : 'Create'
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
        name: ''
      })
      this.$emit('input', '')
    },
    async save() {
      let self = this

      await this.$store.dispatch('auth/ensureSession')

      let item = await call('saveTaePersonalProject', _.pick(this.item, [
        '_id',
        'name'
      ]))
      this.$noty.info('Saved')
      this.$emit('input', '')
      this.onSelect(item)
      this.collapsed = false
    }
  },
  components: {
    CollapsableCard,
    TaeProjectSelect,
    CopyPasteScript
  },
  created() {},
  mounted() {
    let self = this
    this.$watch('item.name', (v) => {
      if (!v) {
        self.$emit('input', '')
      }
    })
  }
}

</script>

<style lang="scss" scoped="">
.TaeProjectCardSelect {}

a,
button {
  max-width: 200px;
  background-color: $color2!important;
  background-color: $color2!important;
  color: $color6!important;
}

a:hover,
button:hover {
  background-color: $color1!important;
  border-color: $color1!important;
  color: $color6!important;
}
</style>
