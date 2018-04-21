<template>
<div class="WrapPersonalProjectsListView">
  <h3>My projects</h3>
  <ListView :columns="columns"
            :items="formatedItems"
            @select="select"></ListView>
</div>

</template>

<script>
import { call } from '@/plugins/rpcApi';
import ListView from '@/components/controls/ListView';
import moment from 'moment'
export default {
  name: 'WrapPersonalProjectsListView',
  props: [
    'item','items'
  ],
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
        },
        {
          label: 'Last update',
          field: 'updatedAt',
          filterOptions: {
            enabled: true
          }
        }
      ]
    }
  },
  async asyncData() {
    return {}
  },
  computed: {
    formatedItems(){
      return this.items.map(i=>{
        i.updatedAt = moment(i.updatedAt).format('DD/MM/YYYY HH:mm')
        return i
      })
    }
  },
  methods: {
    select(doc) {
      call('findOne', {
        model: 'wra_project',
        _id: doc._id
      }).then(item => {
        this.$emit('input', item._id)
        this.$emit('select', item)
      }).catch(console.error)
    }
  },
  components: {
    ListView
  },
  async created() {
   
  },
  mounted() {}
}

</script>

<style lang="scss" scoped="">
.WrapPersonalProjectsListView {}
</style>
