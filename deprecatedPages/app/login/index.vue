<template>
<div class="AdminLogin container">
  <div class="row">
    <div class="col-12 col-md-6 mt-5">
      <WelcomeText></WelcomeText>
    </div>
    <div class="col-12 col-md-6 mt-5">
      
      <div class="row justify-content-center">
        <div class="col-12 mt-2 d-flex justify-content-center">
          <TextInput class=""
                     label="Email"
                     v-model="email"
                     placeholder="your email"></TextInput>
        </div>
        <div class="col-12 mt-2 d-flex justify-content-center">
          <TextInput ref="pwd"
                     class=""
                     label="Password"
                     v-model="password"
                     type="password"
                     placeholder="password"></TextInput>
        </div>
        <div class="col-12 d-flex justify-content-center mt-4">
          <div>
            <LightButton size="md"
                         class='mt-2 mx-auto d-block'
                         @click="login"
                         variant="primary">SignIn/SignUp</LightButton>
            <p class="BottomText m-0 mt-3">No email verification required</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

</template>

<script>
import WelcomeText from '@/components/WelcomeText'
import LightButton from '@/components/LightButton';
import TextInput from '@/components/TextInput';
import { call } from '@/plugins/rpcApi';
export default {
  middleware: [
    'loggedCheck'
  ],
  layout: 'app-guess',
  name: 'AdminLogin',
  props: [],
  fetch() {},
  data() {
    return {
      email: '',
      password: '',
      done: false
    }
  },
  async asyncData() {
    return {}
  },
  computed: {
    defaultPassword() {
      return process.env.loginPwd || ''
    },
    isLogged() {
      return this.$store.state.auth.isLogged
    }
  },
  methods: {
    afterLogin(user) {
      if (this.done) {
        return
      }
      this.done = true
      this.$store.commit('auth/setUser', user)
      this.$noty.info('Welcome ' + user.email)
      if (user.role === 'root') {
        this.$router.push('/app/dashboard')
      } else {
        this.$router.push('/app/dashboard')
      }
    },
    async login() {
      try {
        let res = await call('wraAppLogin', {
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

        if(err.message==='EMAIL_NOT_FOUND'){
          return this.$noty.info('We reached the maximum quota of 50 accounts for the pre-release version. We will be happy to e-mail you as soon as we scale up the current limit!',{
            killer:true,
            timeout:null
          })          
        }

        this.$noty.warning(err.message)
      }
    }
  },
  components: {
    LightButton,
    TextInput,
    WelcomeText
  },
  created() {},
  mounted() {
    if (!process.server && this.$store.state.auth.isLogged) {
      this.afterLogin(this.$store.state.auth.user)
    }
  },
  watch: {
    isLogged(v) {
      if (v) {
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

.BottomText {
  font-size: 10px;
}
</style>
