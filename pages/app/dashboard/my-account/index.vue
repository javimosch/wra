<template>
	<div class="MyAccount container">
		<div class="row no-gutters  pt-5">
			
			<div class="col-12 col-md-12">
				<h3>MyAccount</h3>
			</div>
			<div class="col-12 col-md-12">
				
				<TextInput class="w-25" label="ID" v-model="item._id" :disabled="true"></TextInput>
			</div>
			<div class="col-12 col-md-12">
				<TextInput class="w-50" label="Email" v-model="item.email"></TextInput>
			</div>
			<div class="col-12 col-sm-6 col-md-4 d-flex justify-content-start">
				<LightButton @click="save" class="m-0 mr-3" className="d-block">Save</LightButton>
				<LightButton @click="remove" :disabled="true" class="m-0 mr-3" className="d-block">Delete</LightButton>
			</div>
		</div>
	</div>
</template>
<script>
	import {call} from '@/plugins/rpcApi';
	import TextInput from '@/components/TextInput'
	import LightButton from '@/components/LightButton'
	import _ from 'lodash'
	export default {
		middleware:['appAuth'],
		layout:'app',
		name: 'MyAccount',
		props:[],
		fetch(){

		},
		data(){
			return{
				item:{
					_id:'',
					email:''
				}
			}
		},
		async asyncData(){
			return {}
		},
		computed:{

		},
		methods:{
			async save(){
				await call('taeSaveMyAccount',_.pick(this.item,['_id','email']))
				this.$noty.info('Saved')
			},
			remove(){
				console.info('remove')
			}
		},
		components:{
			TextInput,
			LightButton
		},
		created(){

		},
		async mounted(){
			if(process.server){
				return;
			}

			let user = await call('getLoggedUser');
			this.item = {...this.item, ...user}


		}
	}
</script>
<style lang="scss" scoped>
.MyAccount{
	
}
</style>