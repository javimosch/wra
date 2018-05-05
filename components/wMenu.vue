<template>
<div class="wMenu">
  <LightLabel>Main menu</LightLabel>
  <ul class="list-group">
    <li class="list-group-item">
      <b-link to="/app/dashboard"
              @click="click">Dashboard</b-link>
    </li>
    <li class="list-group-item">
      <b-link to="/app/account"
              @click="click">Account</b-link>
    </li>
    <li class="list-group-item">
      <b-link to="/app/projects"
              @click="click">Projects</b-link>
    </li>
    <li class="list-group-item">
      <b-link to="/app/my-collections/fields"
              @click="click"
              :disabled="true">Explore</b-link>
    </li>
    <li class="list-group-item">
      <b-link to="/app/my-collections/fields"
              @click="click"
              :disabled="true">Chat</b-link>
    </li>
  </ul>
  <LightLabel>Project menu</LightLabel>
  <MenuProjectSelector class="mb-3"
                       :value="item._id"
                       @change="change"
                       @clear="clear"></MenuProjectSelector>
  <LightLabel class="mt-0"><span v-html="projectName"></span></LightLabel>
  <ul class="list-group">
    <li class="list-group-item">
      <b-link to="/wip/team"
              @click="click"
              :disabled="true">Team</b-link>
    </li>
    <li class="list-group-item">
      <b-link to="/app/my-collections"
              @click="click"
              :disabled="!hasPrj">Collections</b-link>
    </li>
    <li class="list-group-item">
      <b-link to="/app/my-actions"
              @click="click"
              :disabled="!hasPrj">Functions</b-link>
    </li>
    <li class="list-group-item">
      <b-link to="/app/dashboard/middlewares"
              @click="click"
              :disabled="true">Middlewares</b-link>
    </li>
    <li class="list-group-item">
      <b-link to="/app/my-actions"
              @click="click"
              :disabled="true">Services</b-link>
    </li>
    <li class="list-group-item">
      <b-link to="/app/my-actions"
              @click="click"
              :disabled="true">Modules</b-link>
    </li>
    <li class="list-group-item">
      <b-link to="/wip/analytics"
              @click="click"
              :disabled="true">Analytics</b-link>
    </li>
    <li class="list-group-item">
      <b-link to="/wip/schedules"
              @click="click"
              :disabled="true">Schedules</b-link>
    </li>
    <li class="list-group-item">
      <b-link to="/app/monitoring"
              @click="click"
              :disabled="!hasPrj">Monitoring</b-link>
    </li>
  </ul>
  <div v-show="isRoot"
       class="mb-5">
    <LightLabel>Root Menu</LightLabel>
    <ul class="list-group">
      <li class="list-group-item">
        <b-link to="/admin/editor"
                @click="click">Editor</b-link>
      </li>
      <li class="list-group-item">
        <b-link to="/admin/users"
                @click="click">Users</b-link>
      </li>
      <li class="list-group-item">
        <b-link to="/admin/api-actions"
                @click="click">Functions</b-link>
      </li>
      <li class="list-group-item">
        <b-link to="/admin/middlewares"
                @click="click"
                :disabled="false">Middlewares</b-link>
      </li>
      <li class="list-group-item">
        <b-link to="/admin/workers"
                @click="click"
                :disabled="false">Workers</b-link>
      </li>
      <li class="list-group-item">
        <b-link to="/admin/logging"
                @click="click"
                :disabled="false">Logs</b-link>
      </li>
      <li class="list-group-item">
        <b-link to="/admin/models"
                @click="click">Models</b-link>
      </li>
      <li class="list-group-item">
        <b-link href="/app/dashboard"
                target="_blank">Open&nbsp;new&nbsp;tab</b-link>
      </li>
    </ul>
  </div>
</div>

</template>

<script>
import { LightLabel } from '@/styledComponents/labels';
import MenuProjectSelector from '@/components/menu/MenuProjectSelector';
import _ from 'lodash';
export default {
  name: 'wMenu',
  props: [],
  fetch() {},
  data() {
    return {
      item: {
        _id: '',
        name: ''
      }
    }
  },
  async asyncData() {
    return {}
  },
  computed: {
    selectedProjectId() {
      return this.$store.state.project.selected._id
    },
    hasPrj() {
      return this.item._id !== '' && this.item._id !== null
    },
    projectName() {
      return this.item._id ? ('Selected: ' + this.item.name) : '(Select a project)'
    },
    isRoot() {
      return this.$store.state.auth.user && this.$store.state.auth.user.role === 'root'
    }
  },
  methods: {
    onProjectChange(item) {
      this.$store.commit('project/setSelected', _.cloneDeep(item))
      if(!process.server){
        window.localStorage.setItem('project.selected', JSON.stringify(item))
      }
    },
    clear() {
      var self = this
      _.keys(this.item).forEach(k=>self.item[k]=null)
      this.onProjectChange(this.item)
    },
    change(i) {
      Object.assign(this.item, i)
      this.onProjectChange(this.item)
    },
    click() {
      this.$emit('select')
      window.scroll({
        top: 0,
        behavior: 'smooth'
      })
    }
  },
  components: {
    MenuProjectSelector,
    LightLabel
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
.wMenu {}

a:hover {
  border-color: $color2;
  outline-color: $color2;
  text-decoration-color: none;
  color: $color2;
}

a {
  color: dimgrey;
  border: 0!important;
  border-top: 0;
  border-bottom: 0;
  font-size: 12px;
}

a[disabled],
a.disabled {
  color: lightgrey;
}

li {
  max-width: 200px;
  background-color: #E6E6EA;
  color: lightgrey;
}
</style>
