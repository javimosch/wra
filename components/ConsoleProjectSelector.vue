<template>
<div class="ConsoleProjectSelector">
  <div class="row no-gutters">
  	<div class="col-12 col-md-4">
  		<LightLabel>Project</LightLabel>
  		<MenuProjectSelector class="mb-3"
                       :value="item._id"

                       @change="change"
                       @clear="clear"></MenuProjectSelector>
  	<LightLabel class="mt-0"><span v-html="projectName"></span></LightLabel>
  	</div>
  </div>
</div>

</template>

<script>
import { LightLabel } from '@/styledComponents/labels';
import MenuProjectSelector from '@/components/menu/MenuProjectSelector';
import _ from 'lodash';
export default {
  components: {
    LightLabel,
    MenuProjectSelector
  },
  name: 'ConsoleProjectSelector',
  props: [],
  fetch() {},
  data() {
    return {
    	item:{
    		_id:''
    	}
    }
  },
  async asyncData() {
    return {}
  },
  computed: {
  	projectName() {
      return this.item._id ? ('Selected: ' + this.item.name) : '(Select a project)'
    }
  },
  methods: {
    onProjectChange(item) {
      this.$store.commit('project/setSelected', _.cloneDeep(item))
      if (!process.server) {
        window.localStorage.setItem('project.selected', JSON.stringify(item))
      }
    },
    change(i) {
      Object.assign(this.item, i)
      this.onProjectChange(this.item)
    },
    clear() {
      var self = this
      _.keys(this.item).forEach(k => self.item[k] = null)
      this.onProjectChange(this.item)
    },
    selectedProjectId() {
      return this.$store.state.project.selected && this.$store.state.project.selected._id
    }
  },

  created() {},
  mounted() {
    if (process.server) {
      return
    }
    if (!this.$store.state.auth.isLogged) {
      return
    }
    if (this.selectedProjectId) {
      this.item._id = this.selectedProjectId
    } else {
      var item
      try {
        item = JSON.parse(window.localStorage.getItem('project.selected'))
        this.$store.commit('project/setSelected', _.cloneDeep(item))
      } catch (err) {}
      if (item) {
        this.item._id = item._id
      }
    }
  }
}

</script>

<style lang="scss" scoped="">
.ConsoleProjectSelector {}
</style>
