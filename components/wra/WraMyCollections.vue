<template>
	<div class="WraMyCollections row">
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
		<div class="col-12" v-show="isList">
			<WraMyCollectionsList 
			:items="items"
			@select="select" :item.sync="item"></WraMyCollectionsList>
		</div>
		<div class="col-12 mt-3" v-show="isDetails">
			<h2 v-html="item.name+' collection'"></h2>
			<CollapsableCard text="Details">
			<TextInput ref="name" class="w-50" label="Name" v-model="item.name"></TextInput>
			

			<WraMultipleProjectsSelect label="Projects" ref="projects" class="mt-3" v-model="item.projects"></WraMultipleProjectsSelect>

			<WraMultipleCollectionFieldsSelect label="Fields" ref="fields" class="mt-3" v-model="item.fields" :owner="userId"></WraMultipleCollectionFieldsSelect>
			</CollapsableCard>

			<CollapsableCard text="Query" class="mt-3" v-show="item._id">
				<CollectionQuery :collection="item"></CollectionQuery>
			</CollapsableCard>

		</div>
	</div>
</template>
<script>
	import CollectionQuery from '@/components/wra/CollectionQuery'
	import CollapsableCard from '@/components/CollapsableCard'
	import WraMultipleProjectsSelect from '@/components/wra/WraMultipleProjectsSelect'
	import WraMultipleCollectionFieldsSelect from '@/components/wra/WraMultipleCollectionFieldsSelect'
	import LightButton from '@/components/LightButton'
	import WraMyCollectionsList from '@/components/wra/WraMyCollectionsList'
	import TextInput from '@/components/TextInput'
	import { NotyConfirm } from '@/plugins/noty';
	import { call } from '@/plugins/rpcApi';
	export default {
		name: 'WraMyCollections',
		props:[],
		fetch(){

		},
		data(){
			return{
				mode:'list',
				items:[],
				item:{
					_id:'',
					name:'',
					projects:[],
					fields:[]
				}
			}
		},
		async asyncData(){
			return {}
		},
		computed:{
			userId(){
				return this.$store.state.auth.user && this.$store.state.auth.user._id
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
						model:'wra_collection',
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
				this.items = await call('wraFetchMyCollections');
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
				if(!this.item.name) {
					this.$refs.name.focus();
					return 'Name'
				}
				if(this.item.projects.length<1) {
					this.$refs.projects.focus();
					return 'Projects (at least one)'
				}
				if(this.item.fields.length<1) {
					this.$refs.fields.focus();
					return 'Fields (at least one)'
				}

				return true;
			},
			async save(back){
				if(this.validate()!==true){
					return this.$noty.warning('Complete '+this.validate())
				}
				await call('wraSaveMyCollection',{...this.item
					,projects:this.item.projects.map(p=>p._id)
					,fields:this.item.fields.map(p=>p._id)
				})
				this.$noty.info('Saved')
				if(back){
					this.back();
				}
			},
			create(){
				var self = this;
				self.item.name = '';
				self.item.projects = [];
				self.item.fields = [];
				this.mode = 'details';
			}
		},
		components:{
			TextInput,
			LightButton,
			WraMyCollectionsList,
			WraMultipleProjectsSelect,
			WraMultipleCollectionFieldsSelect,
			CollapsableCard,
			CollectionQuery
		},
		created(){

		},
		mounted(){

		}
	}
</script>
<style lang="scss" scoped>
.WraMyCollections{
	
}
</style>