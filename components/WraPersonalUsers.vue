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
				<div class="col" v-show="isDetails">
					<LightButton @click="back" >Return</LightButton>		
				</div>
			</div>
		</div>
		<div class="col-12" v-show="isList">
			<WraMyUsersList 
			:items="items"
			@select="select" :item.sync="item"></WraMyUsersList>
		</div>
		<div class="col-12" v-show="isDetails">
			<TextInput ref="name" class="w-50" label="Name" v-model="item.name"></TextInput>
		</div>
	</div>
</template>
<script>
	import LightButton from '@/components/LightButton'
	import WraMyUsersList from '@/components/wra/WraMyUsersList'
	import TextInput from '@/components/TextInput'
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
					_id:''
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
				return !!this.item._id	
			}
		},
		methods:{
			async refresh(){
				this.items = await call('wraFetchMyUsers');
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
				return true;
			},
			async save(back){
				if(this.validate()!==true){
					return this.$noty.warning('Complete '+this.validate())
				}
				await call('wraSaveMyUser',this.item)
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
			WrapPersonalProjectsListView
		},
		created(){

		},
		mounted(){
			this.refresh()
		}
	}
</script>
<style lang="scss" scoped>
.WraPersonalProjects{
	
}
</style>