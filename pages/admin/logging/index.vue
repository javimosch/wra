<template>
<div class="Logging container">
  <div class="row">
    <div class="col-12">
    	<LightLabel>Stdout</LightLabel>
      <JsEditor :readonly="true" v-model="stdout"></JsEditor>
    </div>
    <div class="col-12">
      <LightLabel>Stderr</LightLabel>
      <JsEditor :readonly="true" v-model="stderr"></JsEditor>
    </div>
  </div>
</div>

</template>

<script>
import {LightLabel} from '@/styledComponents/labels'
import io from 'socket.io-client';
import JsEditor from '@/components/JsEditor';
import {call} from '@/plugins/rpcApi';
export default {
  layout: 'app',
  middleware: [
    'appAuth'
  ],
  name: 'Logging',
  props: [],
  fetch() {},
  data() {
    return {
      stdout: '',
      stderr: ''
    }
  },
  async asyncData() {
    return {}
  },
  computed: {

  },
  methods: {
    load(d) {
      if (d.stdout) {
        this.stdout += d.stdout
      }
      if (d.stderr) {
        this.stderr += d.stderr
      }
      //console.log(d);
    }
  },
  components: {
    JsEditor,
    LightLabel
  },
  created() {},
  mounted() {
    if (process.server) {
      return
    }
    var self = this
    const socket = io(process.env.RPC_ENDPOINT + 'logging')
    socket.on('connect', function() {
      console.info('Connected')
      socket.on('logging', self.load)
      ///socket.emit('fetchAll')
    })
    socket.on('disconnect', function() {})

    call('wraGetLogs').then(self.load)

  }
}

</script>

<style lang="scss" scoped="">
.Logging {}
</style>
