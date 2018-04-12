<template>
<div class="Dashboard pt-5 pb-5 container">
  <div class="row no-gutters">
    <div class="col-12">
      <TaeProjectCardSelect v-model="project._id"></TaeProjectCardSelect>
      <CollapsableCard text="Integration"
                       v-show="project._id">
        <CopyPasteScript :project="project._id"></CopyPasteScript>
      </CollapsableCard>
    </div>
    <div class="col-12">
      <TaeErrorsTable @change="viewError"
                      :items="items"></TaeErrorsTable>
    </div>
    <div class="col-12" v-show="!isLogged">
      <TaeCreateAccountForm></TaeCreateAccountForm>
    </div>
  </div>
</div>

</template>

<script>
import TaeCreateAccountForm from '@/components/TaeCreateAccountForm';
import TaeProjectCardSelect from '@/components/controls/TaeProjectCardSelect';
import CollapsableCard from '@/components/CollapsableCard';
import CopyPasteScript from '@/components/CopyPasteScript';
import TaeErrorsTable from '@/components/TaeErrorsTable';
import { call } from '@/plugins/rpcApi';
import { watchProjectSocket } from '@/plugins/taeSockets';
import moment from 'moment';
export default {
  layout: 'protected',
  name: 'Dashboard',
  props: [],
  fetch() {},
  data() {
    return {
      projects: [],
      project: {
        _id: ''
      },
      item: {
        _id: null
      },
      items: [],
      watcher: null
    }
  },
  async asyncData() {
    return {}
  },
  computed: {
    isLogged(){
      return this.$store.state.auth.isLogged
    }
  },
  methods: {
    viewError(err) {
      this.item = err
    }
  },
  components: {
    TaeErrorsTable,
    CopyPasteScript,
    CollapsableCard,
    TaeProjectCardSelect,
    TaeCreateAccountForm
  },
  created() {},
  destroyed() {
    if(typeof this.watcher ==='function') this.watcher();
  },
  async mounted() {
    const self = this

    if (process.server) {
      return
    }

    this.$watch('project._id', async(v) => {
      if(!v)return;
      self.items = (await call('findPaginate', {
        model: 'tae_error',
        query: {
          project:v,
          updatedAt: {
            $gte: moment().subtract('1', 'month')._d
          }
        },
        options: {
          sort: '-updatedAt'
        }
      })).map(o=>{
        o.count = o.count.toString()
        return o;
      })


      if(typeof self.watcher==='function'){
        self.watcher();//close socket
      }
      self.watcher = watchProjectSocket(v, {
        onError: err => {
          err.count = err.count.toString()
          let record = this.items.find(d => d._id === err._id)
          if (record) {
            // console.log('Error update',err.message);
            Object.assign(record, err)
          } else {
            // console.log('Error added',err.message);
            self.items.push(err)
          }
          self.items = _.orderBy(self.items, [
            'lastAt'
          ], [
            'desc'
          ])
        }
      })
    })

    // If no project, create a project and link to session
    this.projects = await call('taeGetPersonalProjects')
    this.project = this.projects[0]
  }
}

</script>

<style lang="scss" scoped="">
.Dashboard {
  background-color: $color3;
}
</style>
