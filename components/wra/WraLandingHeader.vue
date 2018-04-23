<template>
<div class="Header p-4">
  <div class="row">
    <div class="col-12 col-sm-4">
      <router-link to="/"
                   class="m-0 p-0 d-block align-self-center w-100 LogoLink">
        <h2 class="text-center m-0 p-0 d-block ">
	          <img class="Logo d-inline" :src="Logo"/>
	          <span class="d-inline">wrapkend</span>
	        </h2>
      </router-link>
    </div>
  </div>
</div>

</template>

<script>
import Logo from '@/assets/logo.png';

export default {
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
    await this.$store.dispatch('auth/update')
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
.Header {
  background-color: $color6;
}

.Logo {
  max-width: 25px;
  margin-right: 10px;
}

.LogoLink {
  text-decoration: none!important;
}

h2,
h2 span {
  font-family: $font3;
  color: $color2;
}

a:hover {
  border-color: $color2;
  outline-color: $color2;
  text-decoration-color: $color2;
}

a,
a:hover {
  border: 0!important;
  border-top: 0;
  border-bottom: 0;
}

.nav {
  max-width: 800px
}

img {
  max-width: 100px;
}

ul {
  border-bottom: 0px;
}
</style>
