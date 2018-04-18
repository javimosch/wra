<template>
<div class="ErrorModalDetails"
     v-esc="close">
  <SimpleModalBackdrop v-show="show">
  </SimpleModalBackdrop>
  <AbsoluteModal v-show="show">


  	<div class="alert alert-warning alert-dismissible fade show" role="alert">
  <p>We are working hard feature called <strong>Smart error-stack explorer</strong> to track your source files in production retrieve the exact trace for each error. Stay tuned.</p>
  <button type="button" class="close" data-dismiss="alert" aria-label="Close">
    <span aria-hidden="true">&times;</span>
  </button>
</div>

  	
    <JsEditor v-model="code"
              cmMode="text/json"></JsEditor>

    <TaeButton class="mt-2">
		<b-btn @click="close">Close (ESC key)</b-btn>
	</TaeButton>
  </AbsoluteModal>
</div>
	
</template>

<script>
import Vue from 'vue';
import VueEsc from 'vue-esc';
Vue.use(VueEsc)
import $ from 'jquery';
import TaeButton from '@/components/TaeButton';
import JsEditor from '@/components/JsEditor';
import { AbsoluteModal, SimpleModalBackdrop } from '@/styledComponents/modal';
import moment from 'moment'
export default {
  name: 'ErrorModalDetails',
  props: [
    'item'
  ],
  watch: {
    item(v) {
      console.log('change', v, process.server)
      if (v) {
        if (!process.server) {

          this.code = JSON.stringify(Object.assign({}, v.metadata || {}, {
            stack: v.stack || '',
            count:v.count,
            lastAt: moment(v.lastAt).format('DD/MM/YYYY HH:mm'),
            message:v.message
          }), null, 2)

          var body = $('html, body')
          body.stop().animate({
            scrollTop: 0
          }, 500, 'swing', function() {})
        }
      }
    }
  },
  fetch() {},
  data() {
    return {
      code: ''
    }
  },
  async asyncData() {
    return {}
  },
  computed: {
    show() {
      return this.item && this.item._id
    }
  },
  methods: {
    close() {
      this.$emit('update:item', {
        _id: null
      })
    }
  },
  components: {
  	TaeButton,
    AbsoluteModal,
    SimpleModalBackdrop,
    JsEditor
  },
  created() {},
  mounted() {}
}

</script>

<style lang="scss" scoped="">
.ErrorModalDetails {}
</style>
