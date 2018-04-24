<template>
<div class="wMenu">

  <LightLabel>Social menu</LightLabel>
  <ul class="list-group">
   <li class="list-group-item">
      <b-link to="/app/my-collections/fields" @click="click" :disabled="true">Marketplace</b-link>
    </li>
    <li class="list-group-item">
      <b-link to="/app/my-collections/fields" @click="click" :disabled="true">Chat</b-link>
    </li>
  </ul>

  <div v-show="isRoot" class="mb-5">
    <LightLabel>Root Menu</LightLabel>
    <ul class="list-group">
    	<li class="list-group-item">
        <b-link to="/admin/users" @click="click">System users</b-link>
      </li>
      <li class="list-group-item">
        <b-link to="/admin/api-actions" @click="click">System actions</b-link>
      </li>
      <li class="list-group-item">
        <b-link to="/admin/middlewares" @click="click" :disabled="false">System middlewares</b-link>
      </li>
      <li class="list-group-item">
        <b-link to="/admin/logging" @click="click" :disabled="false">System stdin</b-link>
      </li>
    </ul>
  </div>

  <LightLabel>Main menu</LightLabel>
  <ul class="list-group">
   <li class="list-group-item">
      <b-link to="/app/my-collections/fields" @click="click" :disabled="!hasPrj">Collections Fields</b-link>
    </li>
  </ul>
  
  <LightLabel>Project menu</LightLabel>
  <MenuProjectSelector class="mb-3" :value="item._id" @change="change" @clear="clear"></MenuProjectSelector>
  <LightLabel class="mt-0"><span v-html="projectName"></span></LightLabel>
  <ul class="list-group">
    <li class="list-group-item">
      <b-link to="/app/dashboard/my-account" @click="click">My account</b-link>
    </li>
    <li class="list-group-item">
      <b-link to="/app/dashboard" @click="click">Dashboard</b-link>
    </li>
    <li class="list-group-item">
      <b-link to="/wip/team" @click="click" :disabled="!hasPrj">Team</b-link>
    </li>
    <li class="list-group-item">
    	<b-link to="/app/my-collections" @click="click" :disabled="!hasPrj">Collections</b-link>
      
    </li>
    <li class="list-group-item">
    	<b-link to="/app/my-actions" @click="click" :disabled="!hasPrj">RPC Functions</b-link>
    </li>
    <li class="list-group-item">
    	<b-link to="/app/dashboard/middlewares" @click="click" :disabled="true">Middlewares</b-link>
    </li>
    <li class="list-group-item">
    	<b-link to="/wip/analytics" @click="click"  :disabled="false">Analytics</b-link>
    </li>
    <li class="list-group-item">
    	<b-link to="/wip/schedules" @click="click" :disabled="false">Schedules</b-link>
    </li>
    <li class="list-group-item">
    	<b-link to="/app/my-projects" @click="click" >Projects</b-link>
    </li>
  </ul>
  
</div>

</template>

<script>
import {LightLabel} from '@/styledComponents/labels'
import MenuProjectSelector from '@/components/menu/MenuProjectSelector'
export default {
  name: 'wMenu',
  props: [],
  fetch() {},
  data() {
    return {
      item:{
        _id:'',
        name:''
      }
    }
  },
  async asyncData() {
    return {}
  },
  computed: {
    selectedProjectId(){
      return this.$store.state.project.selected._id
    },
    hasPrj(){
      return this.item._id!=''&&this.item._id!=null
    },
    projectName(){
      return this.item._id?('Selected: '+this.item.name):'(Select a project)'
    },
  	isRoot(){
  		return this.$store.state.auth.user && this.$store.state.auth.user.role==='root'
  	}
  },
  methods: {
    clear(){
      Object.assign(this.item,{
        _id:''
      })
    },
    change(i){
      console.log('CHANGE',i)
      Object.assign(this.item,i)
      this.$store.commit('project/setSelected',this.item)

      if(!process.server){
        window.localStorage.setItem('project.selected',this.item._id)
      }

    },
    click(){
      this.$emit('select')
    }
  },
  components: {
    MenuProjectSelector,
    LightLabel
  },
  created() {},
  mounted() {
    if(process.server) {
      return
    }
    if(this.selectedProjectId){
      this.item._id = this.selectedProjectId
    }else{
      let _id = window.localStorage.getItem('project.selected')
      if(_id){
        this.item._id = _id
      }
    }
  }
}

</script>

<style lang="scss" scoped="">
.wMenu {}

a:hover {
  border-color: $color2;
  outline-color: $color2;
  text-decoration-color: none;
  color: $color2;
}

a {
  color: grey;
  border: 0!important;
  border-top: 0;
  border-bottom: 0;
  font-size: 12px;
}
a[disabled],a.disabled{
  color: lightgrey;
}
</style>
