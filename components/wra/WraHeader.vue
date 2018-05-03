<template>
<div class="WraHeader p-4">
  <div class="row">
    <div class="col-12 col-sm-4">
      
      <a href="/" class="m-0 p-0  align-self-center w-100 LogoLink" 
      v-show="!projectBrandLogo">
          <h2 class="text-center m-0 p-0" v-show="!projectBrandLogo">
            <img class="Logo" :src="Logo" v-show="!projectBrandLogo"/>
            <span class="LogoSpan" v-show="!projectBrandLogo">wrapkend</span>
          </h2>
      </a>

      <a href="/app/dashboard" class="m-0 p-0 d-block align-self-center w-100 LogoLink" v-show="projectBrandLogo">
          <img class="CustomLogo d-inline" :src="projectBrandLogo"/>
      </a>

    </div>
    <div class="col-12 col-sm-6 offset-sm-2">
      <div class="nav mx-auto d-block d-flex justify-content-center align-items-center h-100">
        <b-nav class=""
               justified
               tabs>

          <b-nav-item class="" 
                      v-show="isLogged"
                      :active="isActive('app-my-projects')"
                      to="/app/projects"
                      >Projects</b-nav-item>

          <b-nav-item class="" 
                      v-show="isLogged"
                      @click="logout()">Logout</b-nav-item>

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
      //this.$router.push('/')
      window.location.href = '/app/login'
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
    projectBrandLogo(){
      return this.$store.getters && this.$store.getters['project/brandLogo']
    },
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
  display: inline;
}
.LogoSpan{
 display: inline; 
}
.Subtitle{
	position: relative;
  top:-10px;
	font-size:9px;
}
h2 , h2 span{
  font-family: $font3;
  color: $color2;
  display:block;
  
}
.LogoLink{
  text-decoration: none!important;
  display:block;
}

a:hover {
  border-color: $color2;
  outline-color: $color2;
  text-decoration-color: none;
  color:$color2;
}

a{
  
  border: 0!important;
  border-top: 0;
  border-bottom: 0;
  
  text-decoration: none;
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
.CustomLogo{
  max-width: 250px;
  max-height: 100px;
}
</style>
