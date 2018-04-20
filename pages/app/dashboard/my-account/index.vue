<template>
	<div class="MyAccount">
		<h1>MyAccount</h1>
		<div class="row">
			<div class="col-12">
				<TextInput class="w-25" label="ID" v-model="item._id" :disabled="true"></TextInput>
			</div>
			<div class="col-12">
				<TextInput class="w-50" label="Email" v-model="item.email"></TextInput>
			</div>
			<div class="col-12">
				<LightButton @click="save">Save</LightButton>
				<LightButton @click="remove" :disabled="true">Delete</LightButton>
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