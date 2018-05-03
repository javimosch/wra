<template>
<div class="WorkersList">
  <h3>All Workers</h3>
  <ListView :columns="columns"
            :items="items"
            @select="select"></ListView>
</div>

</template>

<script>
import { call } from '@/plugins/rpcApi';
import ListView from '@/components/controls/ListView';
export default {
  name: 'WorkersList',
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
          label: 'User',
          field: 'userName',
          filterOptions: {
            enabled: true
          }
        },
        {
          label: 'Project',
          field: 'projectName',
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
    
  },
  methods: {
    select(doc) {
      call('findOne', {
        model: 'wra_worker',
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
.WorkersList {}
</style>
