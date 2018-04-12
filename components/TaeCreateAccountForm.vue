<template>
<div class="TaeCreateAccountForm card mt-5 p-2 mx-auto">
  <div class="row">
    <div class="col-12 mb-2 mt-3">
      <h5 class="text-center">Ready for an account?</h5>
    </div>
    <div class="col-12">
      <b-form-input placeholder="email"
                    v-model="email" />
    </div>
    <div class="col-12 mt-2">
      <b-form-input placeholder="password"
                    v-model="password"
                    type="password" />
    </div>
    <div class="col-12 mt-3">
      <TaeButton>
        <b-btn class=""
               :disabled="isSaveDisabled"
               @click="save"
               size="lg"
               variant="warning">Login/Create</b-btn>
      </TaeButton>
    </div>
  </div>
</div>

</template>

<script>
import TaeButton from '@/components/TaeButton';
import { call } from '@/plugins/rpcApi';
export default {
  name: 'TaeCreateAccountForm',
  props: [],
  fetch() {},
  data() {
    return {
      email: '',
      password: ''
    }
  },
  async asyncData() {
    return {}
  },
  computed: {
    isSaveDisabled() {
      if (!this.email) {
        return true
      }
      if (!this.password) {
        return true
      }
    }
  },
  methods: {
    async save() {
      if (typeof window === 'undefined') {
        return
      }
      try {
        let res = await call('taeQuickLogin', {
          email: this.email,
          password: this.password
        })
        window.localStorage.setItem('token', res.token)
        window.localStorage.setItem('isLogged', 1)
        this.$store.commit('auth/setUser', res.user)
        this.$noty.info('You are in')
      } catch (err) {
        if(err.message==='PASSWORD_MISMATCH'){
          this.$noty.warning('Wrong password!')
        }else{
          this.$noty.warning(err.message)
        }
      }
    }
  },
  components: {
    TaeButton
  },
  created() {},
  mounted() {}
}

</script>

<style lang="scss" scoped="">
.TaeCreateAccountForm {
  max-width: 300px;
}
</style>
