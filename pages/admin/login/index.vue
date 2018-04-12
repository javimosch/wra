<template>
<div class="AdminLogin container">
  <h3 class="text-center">Backoffice</h3>
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
             @click="rootLogin"
             variant="primary">Login</b-btn>
    </div>
  </div>
</div>

</template>

<script>
import { call } from '@/plugins/rpcApi';
export default {
  layout: 'app-guess',
  name: 'AdminLogin',
  props: [],
  fetch() {},
  data() {
    return {
      email: '',
      password:''
    }
  },
  async asyncData() {
    return {}
  },
  computed: {
    defaultPassword() {
      return process.env.loginPwd || ''
    }
  },
  methods: {
    async rootLogin() {
      try {
        let res = await call('taeRootLogin', {
          email: this.email,
          password: this.password
        })
        if (res) {
          window.localStorage.setItem('token', res.token)
          window.localStorage.setItem('isLogged', 1)
          this.$store.commit('auth/setUser', res.user)
          this.$noty.info('Welcome '+res.user.email)
          this.$router.push('/admin/dash');
        } else {
          this.$noty.warning('Wrong password!')
        }
      } catch (err) {
          this.$noty.warning(err.message)
      }
    },
    async login() {

      try {
        let user = await this.$store.dispatch('auth/login', {
          email: this.email,
          pwd: this.$refs.pwd.value
        })
        if (user) {
          this.$router.push('/admin/dash')
        } else {
          this.$noty.warning('Invalid credentials', {
            killer: true,
            timeout: 5000
          })
        }
      } catch (err) {
        this.$noty.warning(err.message)
      }

    }
  },
  components: {

  },
  created() {},
  mounted() {}
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
