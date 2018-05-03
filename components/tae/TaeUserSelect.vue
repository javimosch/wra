<template>
<div class="TaeUserSelect">
  <LightLabel v-if="label"
         v-html="label"></LightLabel>
  <SelectKey @onError="(err)=>$noty.warning(err)"
             model="field"
             descriptionField="email"
             :descriptionSearch="['email']"
             :value="value"
             @input="input"
             @change="change"
             @onClear="clear"
             :placeholder="placeholder||''"
             :columns="columns"
             :rows="[]"
             :searchByIdFn="searchByIdFn"
             :populate="['group']"
             :searchAllFn="searchAllFn" ref="selectKey"></SelectKey>
</div>
</template>
<script>
import { call } from '@/plugins/rpcApi';
import SimpleSelect from '@/components/controls/SimpleSelect';
import SelectKey from '@/components/controls/SelectKey';
import { LightLabel } from '@/styledComponents/labels';
export default {
  name: 'TaeUserSelect',
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
    focus(){
      this.$refs.selectKey.focus()
    },
    async searchByIdFn(id){
        return await call('findOne', {
          _id: id,
          model: 'tae_user',
        });
    },
    async searchAllFn() {
      let arr = await call('findPaginate', {
        model: 'tae_user',
        //populate:'group',
        select: [
          '_id',
          'email',
        ]
      })
      return arr.map(d => {
        //d.group = JSON.parse(d.code).group || '';
        return d;
      });
    },
    clear(){
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
    SimpleSelect,
    LightLabel
  },
  async created() {
    // await this.$store.dispatch('adminFields/update')
  },
  mounted() {}
}

</script>

<style lang="scss" scoped="">
.TaeUserSelect {}
</style>
