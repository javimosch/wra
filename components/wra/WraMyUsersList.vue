<template>
<div class="WraMyUsersList">
  <h3>My Users</h3>
  <ListView :columns="columns"
            :items="items"
            @select="select"></ListView>
</div>

</template>

<script>
import { call } from '@/plugins/rpcApi';
import ListView from '@/components/controls/ListView';
export default {
  name: 'WraMyUsersList',
  props: [
    'item','items'
  ],
  fetch() {},
  data() {
    return {
      columns: [
        {
          label: 'Email',
          field: 'email',
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
        model: 'wra_user',
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
.WraMyUsersList {}
</style>
