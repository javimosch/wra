<template>
<div class="wMenu">
  <div v-show="isRoot" class="mb-2">
    <label>Root Menu</label>
    <ul class="list-group">
    	<li class="list-group-item">
        <b-link to="/admin/users" @click="click">System users</b-link>
      </li>
      <li class="list-group-item">
        <b-link to="/admin/api-actions" @click="click">System actions</b-link>
      </li>
      <li class="list-group-item">
        <b-link to="/admin/middlewares" @click="click" :disabled="true">System middlewares</b-link>
      </li>
      <li class="list-group-item">
        <b-link to="/admin/logging" @click="click" :disabled="false">System stdin</b-link>
      </li>
    </ul>
  </div>
  <ul class="list-group">
    <li class="list-group-item">
      <b-link to="/app/dashboard/my-account" @click="click">My account</b-link>
    </li>
    <li class="list-group-item">
      <b-link to="/app/dashboard" @click="click">Dashboard</b-link>
    </li>
    <li class="list-group-item">
      <b-link to="/app/my-users" @click="click">Users</b-link>
    </li>
    <li class="list-group-item">
    	<b-link to="/app/my-collections" @click="click" :disabled="false">Collections</b-link>
      <div>
        <b-link to="/app/my-collections/fields" @click="click" :disabled="false">Collections Fields</b-link>
      </div>
    </li>
    <li class="list-group-item">
    	<b-link to="/app/my-actions" @click="click" :disabled="false">RPC Functions</b-link>
    </li>
    <li class="list-group-item">
    	<b-link to="/app/dashboard/middlewares" @click="click" :disabled="true">Middlewares</b-link>
    </li>
    <li class="list-group-item">
    	<b-link to="/app/dashboard/analytics" @click="click"  :disabled="true">Analytics</b-link>
    </li>
    <li class="list-group-item">
    	<b-link to="/app/dashboard/schedules" @click="click" :disabled="true">Schedules</b-link>
    </li>
    <li class="list-group-item">
    	<b-link to="/app/my-projects" @click="click" >Projects</b-link>
    </li>
  </ul>
</div>

</template>

<script>
export default {
  name: 'wMenu',
  props: [],
  fetch() {},
  data() {
    return {}
  },
  async asyncData() {
    return {}
  },
  computed: {
  	isRoot(){
  		return this.$store.state.auth.user && this.$store.state.auth.user.role==='root'
  	}
  },
  methods: {
    click(){
      this.$emit('select')
    }
  },
  components: {

  },
  created() {},
  mounted() {}
}

</script>

<style lang="scss" scoped="">
.wMenu {}

a:hover {
  border-color: $color2;
  outline-color: $color2;
  text-decoration-color: none;
  color: $color2;
}

a {
  color: grey;
  border: 0!important;
  border-top: 0;
  border-bottom: 0;
  font-size: 12px;
}
a[disabled],a.disabled{
  color: lightgrey;
}
</style>
