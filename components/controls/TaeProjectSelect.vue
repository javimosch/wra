<template>
<div class="TaeProjectSelect">
  <label v-if="label"
         v-html="label"></label>
  <SelectKey @onError="(err)=>$noty.warning(err)"
             model="tae_project"
             descriptionField="name"
             :descriptionSearch="['name']"
             :value="value"
             @input="input"
             @change="change"
             @onClear="onClear"
             :placeholder="placeholder||''"
             :columns="columns"
             :rows="[]"
             :searchByIdFn="searchByIdFn"
             :searchAllFn="searchAllFn"></SelectKey>
</div>
</template>
<script>
import { call } from '@/plugins/rpcApi';
import SimpleSelect from '@/components/controls/SimpleSelect';
import SelectKey from '@/components/controls/SelectKey';
export default {
  name: 'TaeProjectSelect',
  props: [
    'value',
    'label',
    'placeholder'
  ],
  async fetch() {},
  data() {
    return {
      columns: [
        {
          label: 'name',
          field: 'name',
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
    async searchByIdFn(id){
        return await call('findOne', {
          _id: id,
          model: 'tae_project',
          //populate:['fields']
        });
    },
    async searchAllFn() {
      let arr = await call('findPaginate', {
        model: 'tae_project',
        select: [
          '_id',
          'name',
          //'code'
        ],
        query:{
          $or:[
            {
              user:this.$store.state.auth.user&&this.$store.state.auth.user._id
            },
            {
              session:this.$store.state.auth.session&&this.$store.state.auth.session._id
            }
          ] 
        },
        //extractFromJsonField:['code',['group']],
        transform: [
          '_id:_id',
          'name:name',
          //'code:code',
          //'group:group'
        ]
      })
      return arr.map(d => {
        return d;
      });
    },
    onClear(){
      this.$emit('onClear');
      this.$emit('clear');
    },
    input(val) {
      this.$emit('input', val)
    },
    change(d) {
      this.$emit('change', d)
    }
  },
  components: {
    SelectKey,
    SimpleSelect
  },
  async created() {
  },
  mounted() {}
}

</script>

<style lang="scss" scoped="">
.TaeProjectSelect {}
</style>
