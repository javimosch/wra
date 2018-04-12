<template>
<div class="TaeErrorsTable">
  
  <ListView :columns="columns"
            :items="items"
            @select="select"></ListView>
</div>

</template>

<script>
import { call } from '@/plugins/rpcApi';
import ListView from '@/components/controls/ListView';
export default {
  name: 'TaeErrorsTable',
  props: [
    'value',
    'items'
  ],
  fetch() {},
  data() {
    return {
      //items: [],
      columns: [
        {
          label: 'Message',
          field: 'message',
          filterOptions: {
            enabled: true
          }
        },
        {
          label: 'Times',
          field: 'count',
          filterOptions: {
            enabled: true
          }
        },
        {
          label: 'Last at',
          field: 'lastAt',
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
        model: 'tae_error',
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

<style lang="scss">
.TaeErrorsTable {}
.TaeErrorsTable tbody{
    background-color:$color6;
  }
</style>
