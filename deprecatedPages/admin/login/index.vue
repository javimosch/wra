<template>
<div class="AdminLogin container">
  <h3 class="text-center">Are you a master Jedi?</h3>
  <div class="row justify-content-center">
    <div class="col-12 col-lg-12 mt-4">
      <input class="form-control "
             v-model="email"
             placeholder="your email" />
    </div>
    <div class="col-12 mt-4">
      <input ref="pwd"
             class="d-block mx-auto form-control"
             v-model="password"
             type="password"
             placeholder="password" />
    </div>
    <div class="col-12">
      <b-btn size="md"
             class='mt-4 mx-auto d-block'
             @click="login"
             variant="primary">Login</b-btn>
    </div>
  </div>
</div>

</template>

<script>
import { call } from '@/plugins/rpcApi';
export default {
  middleware:['loggedCheck'],
  layout: 'app-guess',
  name: 'AdminLogin',
  props: [],
  fetch() {},
  data() {
    return {
      email: '',
      password:'',
      auto:false
    }
  },
  async asyncData() {
    return {}
  },
  computed: {
    defaultPassword() {
      return process.env.loginPwd || ''
    },
    isLogged(){
      return this.$store.state.auth.isLogged
    }
  },
  methods: {
    afterLogin(user) {
      if(user && this.auto){
        return;
      }
      this.auto = true;
      this.$store.commit('auth/setUser', user)
      this.$noty.info('Welcome ' + user.email)
      if (user.role === 'root') {
        this.$router.push('/admin/dash')
      } else {
        this.$router.push('/app/dashboard')
      }
    },
    async login() {
      try {
        let res = await call('taeRootLogin', {
          email: this.email,
          password: this.password
        })
        if (res) {
          window.localStorage.setItem('token', res.token)
          window.localStorage.setItem('isLogged', 1)
          this.afterLogin(res.user)
        } else {
          this.$noty.warning('Wrong password!')
        }
      } catch (err) {
        this.$noty.warning(err.message)
      }
    }
  },
  components: {

  },
  created() {},
  mounted() {
    
  },
  watch:{
    isLogged(v){
      if(v){
        this.afterLogin(this.$store.state.auth.user)
      }
    }
  }
}

</script>

<style lang="scss" scoped="">
.AdminLogin {}

input {
  max-width: 300px;
  margin: 0 auto;
  display: block;
}

button,
a {
  max-width: 200px;
}
</style>
