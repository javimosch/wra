<template>
<div class="APP"
     v-esc="escape">
  <div v-show="!isLogged"
       class="d-flex justify-content-center align-items-center h-100 position-fixed w-100">
    <LoadingDiamond v-show="!isLogged"></LoadingDiamond>
  </div>
  <div class="container-fluid m-0 p-0"
       v-show="isLogged">
    
    <div class="row" v-if="false">
      <div class="col-sm-12">
        <AppHeader :nav="true"></AppHeader>
      </div>
    </div>

    <wSidebar class="animated slideInLeft" v-if="false"
              v-show="sidebar">
              <AppLogo class="p-2"></AppLogo>
      <wMenu  @select="escape" @close="escape"></wMenu>
    </wSidebar>

    <wSidebarToggle @click="toggleSidebar"
                    v-show="showSidebarToggle">
      <b-btn size="xs"
             @click="toggleSidebar()"
             class="rounded-0">Sidebar</b-btn>
    </wSidebarToggle>
    <div class="row no-gutters" :style="layoutParentRowStyle">
      
      <div class="col-2 col-md-3 col-lg-2"  v-show="showSidebar">
        <wSidebar2 :style="sidebarMobileStyle">
          <AppLogo class="p-2"></AppLogo>
          <wMenu  @select="escape" @close="escape"></wMenu>
        </wSidebar2>        
      </div>

      <div class="col-10 col-md-9 col-lg-10 pl-0 pr-0">
        <div class="row no-gutters" :style="layoutNuxtRowStyle">
          <div class="col-12">
            <ConsoleProjectSelector></ConsoleProjectSelector>
          </div>
          <div class="col-12" style="min-height: 300px">
            <nuxt/>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="container-fluid m-0 p-0"
       v-show="isLogged">
    <AppFooter class="mt-0"></AppFooter>
  </div>
</div>

</template>

<script>
import ConsoleProjectSelector from '@/components/ConsoleProjectSelector';
import AppLogo from '@/components/AppLogo';
import {call} from '@/plugins/rpcApi';
import VueEsc from 'vue-esc';
import { wSidebar, wSidebar2, wSidebarToggle } from '@/styledComponents/sidebars';
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
    ConsoleProjectSelector,
    AppLogo,
    AppHeader,
    AppFooter,
    wMenu,
    wSidebar,
    wSidebarToggle,
    LoadingDiamond,
    wSidebar2
  },
  data() {
    return {
      sidebar: false,
      innerWidth: 0
    }
  },
  computed: {
    isMobile(){
      return this.innerWidth < 768
    },
    sidebarMobileStyle(){
      return this.isMobile?'position:relative;left:-150px;':''
    },
    layoutParentRowStyle(){
      return this.isMobile?'position:relative;left:150px;':''
    },
    layoutNuxtRowStyle(){
      return this.isMobile?'position:relative;left:-100px;':''
    },
    showSidebar(){
      return (!this.showSidebarToggle&&this.sidebar) || this.innerWidth >= 768
    },
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
