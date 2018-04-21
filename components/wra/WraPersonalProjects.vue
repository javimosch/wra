<template>
	<div class="WraPersonalProjects row">
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
			<WraPersonalProjectsListView 
			:items="items"
			@select="select" :item.sync="item"></WraPersonalProjectsListView>
		</div>
		<div class="col-12" v-show="isDetails">
			<TextInput ref="name" class="w-50" label="Name" v-model="item.name"></TextInput>
			<TextInput ref="dbURI" class="w-50" label="dbURI (Mongoose connection string)" v-model="item.dbURI"></TextInput>
			<StringList v-model="item.dependencies" ref="dependencies" label="Dependencies (npm modules)"></StringList>

			<CollapsableCard text="Monitor" class="mt-4">
				<LightButton @click="checkDatabase">Check database</LightButton>		
			</CollapsableCard>
		</div>
	</div>
</template>
<script>
	import { NotyConfirm } from '@/plugins/noty';
	import LightButton from '@/components/LightButton'
	import WraPersonalProjectsListView from '@/components/wra/WraPersonalProjectsListView'
	import TextInput from '@/components/TextInput'
	import StringList from '@/components/controls/StringList'
	import CollapsableCard from '@/components/CollapsableCard'
	import { call } from '@/plugins/rpcApi';
	export default {
		name: 'WraPersonalProjects',
		props:[],
		fetch(){

		},
		data(){
			return{
				mode:'list',
				items:[],
				item:{
					_id:'',
					dbURI:'',
					dependencies:[]
				}
			}
		},
		async asyncData(){
			return {}
		},
		computed:{
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
						model:'wra_project',
						query:{
							_id:this.item._id
						}
					});
					console.info('RESULT',r);
					this.$noty.error('Item removed')
					this.back();
				}
			},
			async checkDatabase(){
				let r = await call('wraProjectCheckDatabase',{
					project: this.item._id
				})
				if(r.connected){
					this.$noty.info('Connection success')
				}else{
					if(r.err.message==='INVALID_DB_URI'){
						this.$noty.warning('Invalid dbURI format')
					}else{
						this.$noty.warning('Something went wrong')
					}
				}
			},
			async refresh(){
				this.items = await call('wraGetPersonalProjects');
			},
			select(item){
				this.create();
				this.mode="details";
				this.item = {...this.item,...item}
			},
			back(){
				this.mode = 'list'
				this.refresh();
			},
			validate(){
				if(!this.item.name) {
					this.$refs.name.focus();
					return 'Name'
				}
				if(!this.item.dbURI) {
					this.$refs.dbURI.focus();
					return 'dbURI'
				}
				if(this.item.dependencies.length===0) {
					this.$refs.dependencies.focus();
					return 'dependencies (at least one)'
				}
				
				return true;
			},
			async save(back){
				if(this.validate()!==true){
					return this.$noty.warning('Complete '+this.validate())
				}
				await call('wraSavepersonalProject',this.item)
				this.$noty.info('Saved')
				if(back){
					this.back();
				}
			},
			create(){
				var self = this;
				Object.keys(this.item).forEach(k=>{
					if(typeof self.item[k]==='object' && self.item[k].length!==undefined){
						return self.item[k]=[]
					}
					self.item[k]=''
				})
				this.$refs.dependencies.clear();
				this.mode = 'details';
			}
		},
		components:{
			TextInput,
			LightButton,
			WraPersonalProjectsListView,
			StringList,
			CollapsableCard
		},
		created(){

		},
		mounted(){

		}
	}
</script>
<style lang="scss" scoped>
.WraPersonalProjects{
	
}
</style>