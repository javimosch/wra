<template>
<div class="CollectionQuery">
  <div class="row no-gutters">
    <div class="col-12">
      <LightLabel>Project</LightLabel>
    </div>
    <div class="col-12">
      <WraProjectsSelect ref="select"
                         v-model="projectId"></WraProjectsSelect>
    </div>
    <div class="col-12"
         v-show="canQuery">
      <LightButton @click="query">Query</LightButton>
    </div>
    <div class="col-12 mt-2">
      <ListView :columns="columns"
                :items="items"
                @select="selectRow"></ListView>
    </div>
  </div>
</div>

</template>

<script>
import { call } from '@/plugins/rpcApi';
import {LightLabel} from '@/styledComponents/labels'
import WraProjectsSelect from '@/components/wra/WraProjectsSelect'
import LightButton from '@/components/LightButton'
import ListView from '@/components/controls/ListView';
export default {
  name: 'CollectionQuery',
  props: [
    'collection'
  ],
  fetch() {},
  data() {
    return {
      projectId: '',
      items: []
    }
  },
  async asyncData() {
    return {

    }
  },
  computed: {
  	columns(){
  		return this.collection?this.collection.fields.map(f=>{
  			return {
  				label:f.name,
  				field:f.name,
  				filterOptions:{
  					enabled:true
  				}
  			}
  		}):[]
  	},
    canQuery() {
      return !!this.projectId
    }
  },
  methods: {
    query() {
      var self = this
      call('wraCollectionFind', {
        model: this.collection.name,
        project: this.projectId,
      }).then(items => {
        self.items = items
      }).catch(console.error)
    },
    selectRow(doc) {
      call('wraCollectionFindById', {
        model: this.collection.name,
        project: this.projectId,
        _id: doc._id
      }).then(item => {
        console.info(item)
      }).catch(console.error)
    }
  },
  components: {
    ListView,
    LightButton,
    WraProjectsSelect,
    LightLabel
  },
  created() {},
  mounted() {}
}

</script>

<style lang="scss" scoped="">
.CollectionQuery {}
</style>
