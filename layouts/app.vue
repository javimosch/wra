<template>
<div class="APP"
     v-esc="escape">
  <div v-show="!isLogged"
       class="d-flex justify-content-center align-items-center h-100 position-fixed w-100">
    <LoadingDiamond v-show="!isLogged"></LoadingDiamond>
  </div>
  <div class="container-fluid"
       v-show="isLogged">
    <div class="row">
      <div class="col-sm-12">
        <AppHeader :nav="true"></AppHeader>
      </div>
    </div>
    <wSidebar class="animated slideInLeft"
              v-show="sidebar">
      <wMenu @select="escape"></wMenu>
    </wSidebar>
    <wSidebarToggle @click="toggleSidebar"
                    v-show="showSidebarToggle">
      <b-btn size="xs"
             @click="toggleSidebar()"
             class="rounded-0">Sidebar</b-btn>
    </wSidebarToggle>
    <div class="row no-gutters">
      <div class="col-md-2 d-none d-md-block">
        <wMenu @select="escape"></wMenu>
      </div>
      <div class="col-12 col-md-10 pl-0 pr-0">
        <nuxt/>
      </div>
    </div>
  </div>
  <div class="container-fluid m-0 p-0"
       v-show="isLogged">
    <AppFooter></AppFooter>
  </div>
</div>

</template>

<script>
import {call} from '@/plugins/rpcApi';
import VueEsc from 'vue-esc';
import { wSidebar, wSidebarToggle } from '@/styledComponents/sidebars';
import AppHeader from '@/components/wra/WraHeader';
import LoadingDiamond from '@/components/LoadingDiamond';
import AppFooter from '@/components/wra/WraFooter';
import wMenu from '@/components/wMenu';
import $ from 'jquery';
import Vue from 'vue';
Vue.use(VueEsc)
export default {
  name: 'appLayout',
  components: {
    AppHeader,
    AppFooter,
    wMenu,
    wSidebar,
    wSidebarToggle,
    LoadingDiamond
  },
  data() {
    return {
      sidebar: false,
      innerWidth: 0
    }
  },
  computed: {
    showSidebarToggle() {
      if (process.server) {
        return false
      }
      return !this.sidebar && this.innerWidth < 768
    },
    isLogged() {
      return this.$store.state.auth.isLogged
    }
  },
  methods: {
    escape(event) {
      if (this.sidebar) {
        this.sidebar = false
      }
    },
    toggleSidebar() {
      console.log('TOGGLE')
      this.sidebar = !this.sidebar
    },
    resize() {
      this.innerWidth = window.innerWidth
      if (window.innerWidth < 992) {
        //this.sidebar = true
      }else{
        this.sidebar = false
      }
    }
  },
  destroyed() {
    $(window).off('resize', this.resize)
  },
  created() {},
  async mounted() {
    if (process.server) {
      return
    }

    if (!this.$store.state.auth.isLogged) {
      const isLogged = (await call('taeIsLogged')).isLogged
      if (!isLogged) {
        window.location.href = '/app/login'
      }else{
        await this.$store.dispatch('auth/update')
      }
    }

    this.$ma.setRouterTracking(true)

     $(window).on('resize', this.resize)
     this.resize()
  }
}

</script>

<style>
</style>
