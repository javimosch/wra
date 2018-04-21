<template>
<div class="WraHeader mb-2">
  <div class="row no-gutters mt-2 mb-5">
    <div class="col-12 col-md-6 d-block d-flex justify-content-left align-items-center h-100 mt-4 mt-md-0">
      <router-link to="/" class="m-0 p-0 d-block align-self-center w-100 LogoLink">
        <h2 class="text-center m-0 p-0 d-block ">
          <img class="Logo d-inline" :src="Logo"/>
          <span class="d-inline">wrapkend</span>
        </h2>
    	</router-link>
    	<p class="Subtitle float-left align-self-center d-none d-md-block">Backendless&nbsp;Software</p>
    </div>
    <div class="col-12 col-md-6">
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
                      v-show="isRoot"
                      href="/admin/login" target="_blank">New&nbsp;tab</b-nav-item>

        </b-nav>
      </div>
    </div>
  </div>
</div>

</template>

<script>
import Logo from '@/assets/wra_logo.svg';

export default {
  name: 'WraHeader',
  props: [
    'nav'
  ],
  data() {
    return {
      Logo
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
    },
    isRoot(){
    	return this.$store.state.auth.user&&this.$store.state.auth.user.role==='root'	
    }
  }
}

</script>

<style lang="scss" scoped="">
.WraHeader {
  background-color: $color6;
}
.Logo{
	max-width: 25px;
	margin-right:10px;
}
.Subtitle{
	padding-left:25px;
	padding-top:20px;
	font-size:12px;
}
h2 {
  font-family: love_ya_like_a_sisterregular;
  color: $color2;
  font-size:35px;
  line-height: 50px;
}
.LogoLink{
  text-decoration: none!important;
}

a:hover {
  border-color: $color2;
  outline-color: $color2;
  text-decoration-color: none;
  color:$color2;
}

a{
  color:lightgrey;
  border: 0!important;
  border-top: 0;
  border-bottom: 0;
  font-size:12px;
  text-decoration: underline;
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
