<template>
<div class="EditorSearchSelector m-0 p-0">
  <div class="d-flex justify-content-center align-items-center">
    <input class="m-0" ref="input"
           placeholder="Search..."
           v-model="searchValue" />
  </div>
  <div class="d-flex justify-content-center align-items-center mt-1">
    <ul class="list-group  ResultList" v-show="showResults">
      <li class="list-group-item" v-for="item in items" :key="item._id" v-html="item.name" @click="select(item)">
      	
      </li>
    </ul>
  </div>
</div>

</template>

<script>
import { call, callClient } from '@/plugins/rpcApi';
export default {
  name: 'EditorSearchSelector',
  props: [],
  fetch() {},
  watch: {
    /*
    - Write "midd [middleware name]" to filter middlewares
- Write "func [function name]" to filter functions
- Write "sch [schedule name]" to filter schedule
- Write "mod [module name]" to filter module
*/
    searchValue(val) {
      if (val) {
        if (this.shouldSearchMiddlewares()) {
          return this.searchMiddlewares()
        }
        if (this.shouldSearchEverything()) {
          return this.searchEverything()
        }
      }
    }
  },
  data() {
    return {
    	items:[],
      coldownTime: 1000,
      coldown: null,
      updateQueued: false,
      updating: false,
      updatedAt: null,
      searchValue: ''
    }
  },
  async asyncData() {
    return {}
  },
  computed: {
  	showResults(){
  		return this.items.length>0&&this.searchValue!==''
  	}
  },
  methods: {
  	focus(){
  		var self = this
  		//this.$refs.input.focus()
  		setTimeout(()=>self.$refs.input.focus(),500)
  		console.info('focus input')
  	},
  	select(item){
  		this.$emit('select',item)
  		this.searchValue=''
  		this.items=[]
  	},
    queueSearch(o) {
      var self = this
      setTimeout(() => {
        if (self.updating) {
          return self.queueSearch(o)
        }
        self.search(o)
      }, self.coldownTime)
    },
    removeSearchPrefix(v){
    	return v.replace('midd ','').replace('func ','').replace('sch ','').replace('mod ','')
    },
    async search(options = {}) {

      if (this.updating && !this.updateQueued) {
        this.updateQueued = true
        return this.queueSearch(options)
      }

      if (this.coldown && Date.now() - this.coldown < this.coldownTime && !this.updateQueued) {
        this.updateQueued = true
        return this.queueSearch(options)
      }

      this.coldown = Date.now() + this.coldownTime
      this.updating = true

      try {
        let res = await call('searchItems', {
          type: options.type||'api_action',
          fieldName:'name',
          fieldValue:this.removeSearchPrefix(this.searchValue),
          select:'_id name'
        })
        this.items = res 
        /*
        .map(i => _.pick(i, [
          '_id',
          'name',
          'type'
        ]))
        */
        this.updating = false;
        this.updatedAt = Date.now()
      } catch (err) {
      	console.warn(err)
      	this.updating = false;
      }
    },
    searchMiddlewares() {
      return this.search({
        type: 'api_action_middleware'
      })
    },
    searchEverything() {
      return this.search()
    },
    shouldSearchMiddlewares() {
      return this.searchValue.indexOf('midd ') !== -1 && this.searchValue.length >= 4
    },
    shouldSearchEverything() {
      return this.searchValue.length >= 4
    }
  },
  components: {

  },
  created() {},
  mounted() {}
}

</script>

<style lang="scss" scoped="">
.EditorSearchSelector {
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 50px;
  background: rgba(255, 255, 255, 0.2);
  z-index: 999;
}

input {
  min-width: 300px;
  height: 50px;
  line-height: 50px;
  background: #333;
  color: white;
  text-align: center;
  border: 0px;
  border-radius: 0px 0px 5px 5px;
}

.ResultList {
  z-index: 999;
}

.list-group-item {
      border-radius: 0px;
    min-width: 300px;
    max-height: 32px;
    line-height: 20px;
    font-size: 10px;
    padding: 5px;
    cursor:pointer;
}
</style>
