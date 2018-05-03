<template>
<div class="WorkerResources mt-3 row no-gutters">
  <div class="col-12">
    <h3 class="p-0 m-0">Resources</h3>
  </div>
  <div class="col-12">
    <LightButton v-show="connected" class="mb-3"
                 @click="sync">Sync Resources</LightButton>
    <LightButton v-show="connected" class="mb-3"
                 @click="refresh">Refresh</LightButton>
  </div>
  <div class="col-12">
    <ListView :columns="columns"
              :items="items"></ListView>
  </div>
</div>

</template>

<script>
import io from 'socket.io-client';
import { call } from '@/plugins/rpcApi';
import ListView from '@/components/controls/ListView';
import LightButton from '@/components/LightButton';
export default {
  name: 'WorkerResources',
  props: [
    'projectId'
  ],
  fetch() {},
  data() {
    return {
      socket:'',
      items: [],
      columns: [
        {
          label: 'Type',
          field: 'type',
          filterOptions: {
            enabled: true
          }
        },
        {
          label: 'Name',
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
    connected() {
      return this.socket && this.socket.connected
    }
  },
  destroyed() {
    if (this.socketCheck && !process.server) {
      clearInterval(this.socketCheck)
    }
    if (self.socket) {
      self.socket.off('line')
      self.socket.disconnect()
    }
  },
  watch:{
    projectId(v){
      if(v){
        this.updateResources(v)
      }
    }
  },
  methods: {
    sync(){
      call('workerSynchronizeFunctions',{
        project: this.projectId
      }).then(console.info)
    },
    refresh() {
      this.socket.emit('refresh')
    },
    updateResources(projectId) {
      if(this.socket) return
      var self = this
      let uri = process.env.RPC_ENDPOINT + projectId + '_resources';
      const socket = self.socket = io(uri, {
        autoConnect: false
      })
      socket.on('connect', function() {
        socket.on('item', d => {
          console.info('ON_ITEM',d)
          if (!self.items.find(i => i.name === d.name)) {
            self.items.push({
              type: d.type,
              name: d.name
            })
          }
        })
      })
      socket.on('disconnect', function() {})
      self.socketCheck = setInterval(() => {
        if (!socket.connected) {
          console.log('Waiting',uri)
          socket.open()
        }
      }, 2000)

    }
  },
  components: {
    ListView,
    LightButton
  },
  created() {},
  mounted() {
    if (!process.server) {
        if(this.projectId) this.updateResources(this.projectId)

    }
  }
}

</script>

<style lang="scss" scoped="">
.WorkerResources {}
</style>
