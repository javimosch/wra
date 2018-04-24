<template>

  <div class="container mt-5">
  </div>
 
</template>

<script>
var errToJSON = require('error-to-json')
export default {
  props: ['error'],
  layout: 'app-guess',
  created(){
    console.warn(this.error);
  },
  mounted(){
    if(!process.server){
      this.$noty.warning(this.error.message)
      this.$router.push('/app/dashboard')
    }
  },
  methods:{
    displayInfo(){
      return JSON.stringify(this.error);
    },
  	isUnkown(status){
  		return ![401,404,500].includes(status);
  	},
  	back(){
  		if(this.error.statusCode===401){
  			this.$router.push('/admin/login')
  		}else{
  			this.$router.push('/')
  		}
  	}
  },
  computed:{
    errorAsString(){
      return JSON.stringify(errToJSON(this.error),null,2);
    }
  },
  components:{
  	
  }
}
</script>
<style lang="scss" scoped>
  textarea{
    min-height:300px;
  }
</style>