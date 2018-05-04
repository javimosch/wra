<template>
	<div class="ProjectsBlocks d-flex p-2 bd-highlight">
		<div class="ProjectBlock d-flex justify-content-center align-items-center" v-for="(item) in items" :key="item._id" @click="openProject(item)">
			<p class="ProjectName" v-html="item.name"></p>
		</div>
		
		<div class="ProjectBlock d-flex justify-content-center align-items-center">
			<i class="ProjectBlockPlus fas fa-plus" @click="createProject()"></i>
		</div>
	</div>
</template>
<script>
	import {getCurrentUserProjects} from '@/plugins/wraProjects'
	import {call} from '@/plugins/rpcApi';
	export default {
		name: 'ProjectsBlocks',
		props:[],
		fetch(){

		},
		data(){
			return{
				items:[]
			}
		},
		async asyncData(){
			return {}
		},
		computed:{

		},
		methods:{
			createProject(){
				window.sessionStorage.setItem('projectDetails','create')
				this.$store.$router.push({
					name:'app-projects'
				})
			},
			openProject(item){
				window.sessionStorage.setItem('projectDetails',item._id)
				this.$store.$router.push({
					name:'app-projects'
				})
			}
		},
		components:{

		},
		created(){

		},
		async mounted(){
			if(process.server){
				return
			}
			this.items = await getCurrentUserProjects(this.$store.state.auth)
		}
	}
</script>
<style lang="scss" scoped>
.ProjectsBlocks{
	
}
.ProjectBlock{
	height:150px;
	width:150px;
	background:#E6E6EA;
	margin:5px;
	cursor:pointer;
}
.ProjectBlockPlus{
	font-size:30px;
	color:#35B7C9;
}
.ProjectName{
	margin:0px;
	padding:0px;
	display:block;
	text-align: center;
	padding:5px 0px;
}
</style>