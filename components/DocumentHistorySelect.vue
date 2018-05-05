<template>
<div class="DocumentHistorySelect container m-0 p-0">
  <div class="row no-gutters">
    <div class="col-12 ">
      <div class="ListContainer mx-auto d-block float-sm-right">
        <LightButton :disabled="isDisabled"
                     @click="search"
                     class="mx-auto d-block float-sm-right">History</LightButton>
        <div class="List animated fadeIn" v-show="showList">
          <ul class=" list-group"
              >
            <li class="ListItem list-group-item flex-column justify-content-center align-items-center"
                v-for="(item) in items"
                :key="item._id"
                @click="select(item)">
              <p class="Date"
                 v-html="getDate(item)"></p>
              <p class="Chars"
                 v-html="getChars(item)"></p>
            </li>
            <li class="ListItem list-group-item  flex-column justify-content-center align-items-center"
                v-show="emptyList">
              <p class="Date flex-fill p-2">Empty</p>
              <p class="Chars flex-fill p-1">0 chars</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</div>

</template>

<script>
import { call } from '@/plugins/rpcApi';
import LightButton from '@/components/LightButton';
import moment from 'moment';
import $ from 'jquery';
export default {
  name: 'DocumentHistorySelect',
  props: [
    'id',
    'type',
    'disabled'
  ],
  fetch() {},
  data() {
    return {
      items: [],
      opened: false
    }
  },
  async asyncData() {
    return {}
  },
  computed: {
    emptyList() {
      return this.items.length === 0
    },
    showList() {
      return this.opened
    },
    isDisabled() {
      return this.disabled !== undefined ? this.disabled : false
    }
  },
  methods: {
    async select(item) {
      this.$emit('select', await call('fetchHistoryById', {
        _id: item._id,
        type: this.type
      }))
    },
    getDate(item) {
      return moment(item.updatedAt).format('DD/MM/YYYY HH:mm SSS')
    },
    getChars(item) {
      return `${item.codeLength} characters.`
    },
    async search(e) {
      e.stopPropagation()
      if (!this.id) {
        return
      }
      this.opened = true
      this.items = await call('findHistory', {
        id: this.id,
        type: this.type
      })
    },
    closePanel() {
      this.opened = false
    },
    escPressHandler(e) {
      if (e.keyCode === 27) { // escape key maps to keycode `27`
        this.closePanel()
      }
    }
  },
  components: {
    LightButton
  },
  created() {},
  destroyed() {
    $(window).off('click', self.closePanel)
    $(document).off('keyup', self.escPressHandler)
  },
  async mounted() {
    if (process.server) {
      return
    }
    var self = this
    $(window).on('click', self.closePanel)
    $(document).on('keyup', self.escPressHandler)
  }
}

</script>

<style lang="scss" scoped="">
.DocumentHistorySelect {}

.ListContainer {
  position: relative;
  margin: 0 auto;
  display: block;
  width: 200px;
}

.List {
  position: absolute;
  top: 40px;
  width: 200px;
  min-height: 200px;
  background: lightgray;
  z-index: 999999;
  max-height: 250px;
    overflow: scroll;
}

.ListItem {
  display: flex;
}

.Date {
  font-size: 12px;
  padding: 0px;
  margin: 0px;
}

.Chars {
  font-size: 9px;
  padding: 0px;
  margin: 0px;
}
</style>
