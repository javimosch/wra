<template>
<div class="WraMyActionsList">
  <h3>My RPC Functions</h3>
  <ListView :columns="columns"
            :items="items"
            @select="select"></ListView>
</div>

</template>

<script>
import { call } from '@/plugins/rpcApi';
import ListView from '@/components/controls/ListView';
export default {
  name: 'WraMyActionsList',
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
          label: 'Project',
          field: 'project.name',
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
        model: 'wra_action',
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
.WraMyActionsList {}
</style>
