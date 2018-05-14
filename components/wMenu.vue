<template>
<no-ssr>
  <div class="wMenu">
    <LightLabel class="text-center">MAIN</LightLabel>
    <ul class="list-group">
      <li class="list-group-item"
          v-show="showSidebarToggle">
        <b-link class=""
                @click="close">
          <div class="row no-gutters">
            <div class="col-12">
              <i class="fas fa-bars mx-auto d-block text-center"></i>
            </div>
            <div class="col-12">
              <span class="mx-auto d-block text-center">Close</span>
            </div>
          </div>
        </b-link>
      </li>
      <li class="list-group-item">
        <b-link to="/app/dashboard"
                class=""
                @click="click">
          <div class="row no-gutters">
            <div class="col-12">
              <i class="fas fa-tachometer-alt mx-auto d-block text-center"></i>
            </div>
            <div class="col-12">
              <span class="mx-auto d-block text-center">Dashboard</span>
            </div>
          </div>
        </b-link>
      </li>
      <li class="list-group-item">
        <b-link to="/app/account"
                @click="click">
          <div class="row no-gutters">
            <div class="col-12">
              <i class="fas fa-user-circle mx-auto d-block text-center"></i>
            </div>
            <div class="col-12">
              <span class="mx-auto d-block text-center">Account</span>
            </div>
          </div>
        </b-link>
      </li>
      <li class="list-group-item">
        <b-link to="/app/projects"
                @click="click">Projects</b-link>
      </li>
      <li class="list-group-item"
          v-show="isRoot">
        <b-link to="/app/my-collections/fields"
                @click="click"
                :disabled="true">Explore</b-link>
      </li>
      <li class="list-group-item"
          v-show="isRoot">
        <b-link to="/app/my-collections/fields"
                @click="click"
                :disabled="true">Chat</b-link>
      </li>
    </ul>
    <LightLabel class="text-center">PROJECT</LightLabel>
    
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
</no-ssr>

</template>

<script>
import NoSSR from 'vue-no-ssr';
import { LightLabel } from '@/styledComponents/labels';
import MenuProjectSelector from '@/components/menu/MenuProjectSelector';
import _ from 'lodash';
import $ from 'jquery';
export default {
  components: {
    MenuProjectSelector,
    LightLabel,
    'no-ssr': NoSSR

  },
  name: 'wMenu',
  props: [
    'header'
  ],
  fetch() {},
  data() {
    return {
      innerWidth:1024
    }
  },
  async asyncData() {
    return {}
  },
  destroyed() {
    $(window).off('resize', this.resize)
  },
  computed: {
    showSidebarToggle() {
      if (process.server) {
        return false
      }
      return this.innerWidth < 768
    },
    selectedProjectId() {
      return this.$store.state.project.selected && this.$store.state.project.selected._id
    },
    hasPrj() {
      return !!this.selectedProjectId
    },
    isRoot() {
      return this.$store.state.auth.user && this.$store.state.auth.user.role === 'root'
    }
  },
  methods: {
    resize() {
      this.innerWidth = window.innerWidth
    },
    close() {
      this.$emit('close')
    },
    click() {
      this.$emit('select')
      window.scroll({
        top: 0,
        behavior: 'smooth'
      })
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

    $(window).on('resize', this.resize)
    this.resize()
  }
}

</script>

<style lang="scss" scoped="">
.wMenu {
  max-width: 200px;
  background-color: #033048;
  padding: 0.5em;
}

a:hover,
a:hover i {
  text-decoration: none;
  color: $color2;
}

a {
  text-align: center;
  margin: 0 auto;
  display: block;
  border: 0!important;
  border-top: 0;
  border-bottom: 0;
  font-size: 12px;
}

a,
a i {
  color: white;
}

a[disabled],
a.disabled {
  color: dimgrey;
}

i {
  font-size: 25px;
}

li {
  border-top-left-radius: 0px;
  border-top-right-radius: 0px;
  background: transparent;
  border: 0px;
  text-align: left;
}

ul {
  margin: 0 auto;
  display: block;
}

.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
</style>
