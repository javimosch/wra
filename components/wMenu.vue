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
      <b-link to="/app/dashboard/my-account">My account</b-link>
    </li>
    <li class="list-group-item">
      <b-link to="/app/dashboard" :disabled="true">Dashboard</b-link>
    </li>
    <li class="list-group-item">
      <b-link to="/app/my-users" :disabled="true">Users</b-link>
    </li>
    <li class="list-group-item">
    	<b-link to="/app/my-collections" :disabled="false">Collections</b-link>
    </li>
    <li class="list-group-item">
    	<b-link to="/app/dashboard/api-actions" :disabled="true">Api actions</b-link>
    </li>
    <li class="list-group-item">
    	<b-link to="/app/dashboard/middlewares" :disabled="true">Middlewares</b-link>
    </li>
    <li class="list-group-item">
    	<b-link to="/app/dashboard/analytics" :disabled="true">Analytics</b-link>
    </li>
    <li class="list-group-item">
    	<b-link to="/app/dashboard/schedules" :disabled="true">Schedules</b-link>
    </li>
    <li class="list-group-item">
    	<b-link to="/app/my-projects" >Projects</b-link>
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
