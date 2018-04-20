<template>
<div class="wMenu">
  <div v-show="isRoot" class="mb-2">
    <label>Root Menu</label>
    <ul class="list-group">
    	<li class="list-group-item">
        <router-link to="/admin/users">All Users</router-link>
      </li>
      <li class="list-group-item">
        <router-link to="/admin/api-actions">All Api actions</router-link>
      </li>
    </ul>
  </div>
  <ul class="list-group">
    <li class="list-group-item">
      <router-link to="/app/dashboard/my-account">My account</router-link>
    </li>
    <li class="list-group-item">
      <router-link to="/app/dashboard" disabled>Dashboard</router-link>
    </li>
    <li class="list-group-item">
      <router-link to="/app/dashboard/users" disabled>Users</router-link>
    </li>
    <li class="list-group-item">
    	<router-link to="/app/dashboard/collections" disabled>Collections</router-link>
    </li>
    <li class="list-group-item">
    	<router-link to="/app/dashboard/api-actions" disabled>Api actions</router-link>
    </li>
    <li class="list-group-item">
    	<router-link to="/app/dashboard/middlewares" disabled>Middlewares</router-link>
    </li>
    <li class="list-group-item">
    	<router-link to="/app/dashboard/analytics" disabled>Analytics</router-link>
    </li>
    <li class="list-group-item">
    	<router-link to="/app/dashboard/schedules" disabled>Schedules</router-link>
    </li>
    <li class="list-group-item">
    	<router-link to="/app/my-projects" >Projects</router-link>
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
  color: $color1;
}

a {
  color: lightgrey;
  border: 0!important;
  border-top: 0;
  border-bottom: 0;
  font-size: 12px;
}
</style>
