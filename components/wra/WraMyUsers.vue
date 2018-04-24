<template>
	<div class="WraMyUsers row">
		<div class="col-12 mb-2">
			<div class="row no-gutters">
				<div class="col" v-show="isList">
					<LightButton @click="create" >Create</LightButton>
				</div>
				<div class="col" v-show="isList">
					<LightButton @click="refresh" >Refresh</LightButton>
				</div>
				<div class="col" v-show="isDetails">
					<LightButton @click="save(false)" class="float-left">Save</LightButton>
				</div>
				<div class="col" v-show="isDetails">
					<LightButton @click="save(true)" >Save and return</LightButton>
				</div>
				<div class="col" v-show="isEdition">
					<LightButton @click="remove()" >Remove</LightButton>
				</div>
				<div class="col" v-show="isDetails">
					<LightButton @click="back" >Return</LightButton>		
				</div>
			</div>
		</div>
		<div class="col-12 mt-3" v-show="isList">
			<WraMyUsersList 
			:label="listName"
			:items="items"
			@select="select" :item.sync="item"></WraMyUsersList>
		</div>
		<div class="col-12" v-show="isDetails">
			<TextInput ref="email" class="w-50" label="Email" v-model="item.email"></TextInput>
			<TextInput ref="password" class="w-50" label="Password" v-model="item.password" type="password"></TextInput>
			<TextInput ref="firstName" class="w-50" label="Firstname" v-model="item.firstName"></TextInput>
			<TextInput ref="lastName" class="w-50" label="Lastname" v-model="item.lastName"></TextInput>
		</div>
	</div>
</template>
<script>
	import LightButton from '@/components/LightButton'
	import WraMyUsersList from '@/components/wra/WraMyUsersList'
	import TextInput from '@/components/TextInput'
	import { NotyConfirm } from '@/plugins/noty';
	import { call } from '@/plugins/rpcApi';
	export default {
		name: 'WraMyUsers',
		props:[],
		fetch(){

		},
		data(){
			return{
				mode:'list',
				items:[],
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
			project(){
				return this.$store.state.project.selected
			},
			listName(){
				var p = this.$store.state.project.selected;
				return p ? p.name+' team':'Team'
			},
			isList(){
				return this.mode =='list'
			},
			isDetails(){
				return this.mode =='details'
			},
			isNew(){
				return !this.item._id
			},
			isEdition(){
				return this.isDetails && !!this.item._id	
			}
		},
		methods:{
			async remove(){
				if (await NotyConfirm('Confirm Delete?')) {
					let r = await call('wraRemove',{
						model:'wra_user',
						query:{
							_id:this.item._id
						}
					});
					console.info('RESULT',r);
					this.$noty.error('Item removed')
					this.back();
				}
			},
			async refresh(){
				this.items = await call('wraFetchMyUsers',{
					project: this.project._id
				});
			},
			select(item){
				this.mode="details";
				this.item = {...this.item,...item}
			},
			back(){
				this.mode = 'list'
				this.refresh();
			},
			validate(){
				if(!this.item.email) {
					this.$refs.email.focus();
					return 'Email'
				}

				return true;
			},
			async save(back){
				if(this.validate()!==true){
					return this.$noty.warning('Complete '+this.validate())
				}
				await call('wraSaveMyUser',Object.assign({},this.item,{
					project:this.project._id
				}))
				this.$noty.info('Saved')
				if(back){
					this.back();
				}
			},
			create(){
				var self = this;
				Object.keys(this.item).forEach(k=>self.item[k]='')
				this.mode = 'details';
			}
		},
		components:{
			TextInput,
			LightButton,
			WraMyUsersList
		},
		created(){

		},
		mounted(){

		}
	}
</script>
<style lang="scss" scoped>
.WraMyUsers{
	
}
</style>