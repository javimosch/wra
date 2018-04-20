<template>
<div class="AppHeader mb-2">
  <div class="row no-gutters mt-2 mb-5">
    <div class="col-12 col-md-4 d-block d-flex justify-content-center align-items-center h-100">
      <router-link to="/" class="m-0 p-0 d-block">
        <h2 class="text-center m-0 p-0 d-block">errortracky</h2></router-link>
    </div>
    <div class="col-12 col-md-8">
      <div class="nav mx-auto d-block d-flex justify-content-center align-items-center h-100">
        <b-nav class=""
               justified
               tabs>
          <b-nav-item class=""
                      v-show="isLogged"
                      @click="logout()">Logout</b-nav-item>

          <b-nav-item class="" 
                      :active="isActive('index')"
                      v-show="!isLogged"
                      to="/">Homepage</b-nav-item>

          <b-nav-item class="" 
                      v-show="isLogged"
                      href="/admin/login" target="_blank">New&nbsp;tab&nbsp;(admin)</b-nav-item>
          <b-nav-item class="" 
                      v-show="isLogged"
                      href="/app/login" target="_blank">New&nbsp;tab&nbsp;(app)</b-nav-item>

        </b-nav>
      </div>
    </div>
  </div>
</div>

</template>

<script>
import Logo from '@/assets/logo.png';

export default {
  name: 'AppHeader',
  props: [
    'nav'
  ],
  data() {
    return {
      logo: Logo
    }
  },
  methods: {
    async logout() {
      await this.$store.dispatch('auth/logout')
      this.$router.push('/')
    },
    isActive(n) {
      return this.routeName === n
    }
  },
  async mounted() {
    if (process.server) {
      return
    }
    //await this.$store.dispatch('auth/update')
  },
  computed: {
    isDash() {
      return this.routeName === 'index'
    },
    isIndex() {
      return this.routeName === 'index'
    },
    routeName() {
      return this.$store.state.route && this.$store.state.route.name
    },
    isLogged() {
      return this.$store.state.auth.isLogged
    }
  }
}

</script>

<style lang="scss" scoped="">
.AppHeader {
  background-color: $color6;
}

h2 {
  font-family: love_ya_like_a_sisterregular;
  color: $color1;
  font-size:25px;
  line-height: 50px;
}

a:hover {
  border-color: $color2;
  outline-color: $color2;
  text-decoration-color: none;
  color:$color1;
}

a{
  color:lightgrey;
  border: 0!important;
  border-top: 0;
  border-bottom: 0;
  font-size:12px;
}

.nav {
  max-width: 800px
}

img {
  max-width: 50px;
}

ul {
  border-bottom: 0px;
}
</style>
