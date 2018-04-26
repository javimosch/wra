<template>
<div class="Monitoring container">
  <div class="row no-gutters">
    <div class="col-12">
      <h2>Worker is alive: <span v-html="worker.isAlive"></span></h2>
    </div>
    <div class="col-12">
      <ListView :columns="columns"
                :items="logs"></ListView>
    </div>
  </div>
</div>

</template>

<script>
import _ from 'lodash';
import ListView from '@/components/controls/ListView';
import io from 'socket.io-client';
import { call } from '@/plugins/rpcApi';
export default {
  layout: 'app',
  middleware: [
    'appAuth'
  ],
  name: 'Monitoring',
  props: [],
  fetch() {},
  data() {
    return {
      logs: [],
      columns: [
        {
          label: 'Level',
          field: 'level',
          filterOptions: {
            enabled: true
          }
        },
        {
          label: 'File',
          field: 'file',
          filterOptions: {
            enabled: true
          }
        },
        {
          label: 'Message',
          field: 'message',
          filterOptions: {
            enabled: true
          }
        },
        {
          label: 'At',
          field: 'at',
          filterOptions: {
            enabled: true
          }
        }
      ],
      worker: {
        isAlive: false
      },
      workerAliveCheckInterval: null,
      socket: null
    }
  },
  async asyncData() {
    return {}
  },
  computed: {
    projectId() {
      return this.$store.state.project && this.$store.state.project.selected && this.$store.state.project.selected._id
    }
  },
  methods: {
    captureLogs() {
      var self = this
      const socket = self.socket = io(process.env.RPC_ENDPOINT + this.projectId + '_logs', {
        autoConnect: false
      })

      socket.on('connect', function() {
        socket.on('line', d => {
          if (typeof d === 'object') {

            d.message = d.message.map(m => {
              try {
                return m.indexOf('{') !== -1 ? JSON.parse(m) : m
              } catch (err) {
                return m
              }
            })

            self.logs.push(d)
            self.logs = _.orderBy(self.logs, [
              'at'
            ], [
              'desc'
            ])
          }
        })
      })
      socket.on('event', function(data) {})
      socket.on('disconnect', function() {})

      self.socketAutoConnectInterval = setInterval(() => {
        if (!socket.connected) {
          console.log('Waiting socket server at', process.env.RPC_ENDPOINT + this.projectId + '_logs')
          socket.open()
        } else {
          // console.log('Waiting orders (', socket.id, ')')
        }
      }, 2000)

    }
  },
  components: {
    ListView
  },
  created() {},
  destroyed() {
    if (this.workerAliveCheckInterval && !process.server) {
      clearInterval(this.workerAliveCheckInterval)
    }
    if (this.socketAutoConnectInterval && !process.server) {
      clearInterval(this.socketAutoConnectInterval)
    }
    if (self.socket) {
      self.socket.off('line')
      self.socket.disconnect()
    }
  },
  async mounted() {
    if (process.server) {
      return
    }
    var self = this

    let projectId = await this.$store.dispatch('project/setSelectedFromLocalStorage')

    if (!projectId) {
      console.warn('projectId no detected')
      return self.$router.push('/app/dashboard')
    }

    self.captureLogs()

    self.workerAliveCheckInterval = setInterval(async () => {
      try {
        if (!self.projectId) {
          return
        }
        let res = await call('workerIsAlive', {
          project: self.projectId
        })
        self.worker.isAlive = res.isAlive
        if (self.worker.isAlive) {
          clearInterval(self.workerAliveCheckInterval)
        }
      } catch (err) {
        console.error(err)
      }
    }, 5000)
  }
}

</script>

<style lang="scss" scoped="">
.Monitoring {}
</style>
