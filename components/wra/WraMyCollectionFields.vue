<template>
	<div class="WraMyCollectionFields row">
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
			<WraMyCollectionFieldsList 
			:items="items"
			@select="select" :item.sync="item"></WraMyCollectionFieldsList>
		</div>
		<div class="col-12" v-show="isDetails">
			<TextInput ref="name" class="w-50" label="ID" v-model="item._id" disabled></TextInput>
			<TextInput ref="name" class="w-50" label="Name" v-model="item.name"></TextInput>
			<TextInput ref="description" class="w-50" label="Description" v-model="item.description"></TextInput>

			
			<WraCollectionFieldTypeSelect v-model="item.type"></WraCollectionFieldTypeSelect>


			
		</div>
		<div v-show="isDetails" class="col-12 col-sm-6 d-flex justify-content-between" >
			<LightCheckbox v-show="isDetails" label="Is Required?" v-model="item.required"></LightCheckbox>
			<LightCheckbox v-show="isDetails" label="Is Unique?" v-model="item.unique"></LightCheckbox>
			<LightCheckbox v-show="isDetails" label="Is Index?" v-model="item.index"></LightCheckbox>
		</div>
	</div>
</template>
<script>
	import WraCollectionFieldTypeSelect from '@/components/wra/WraCollectionFieldTypeSelect'
	import WraMultipleProjectsSelect from '@/components/wra/WraMultipleProjectsSelect'
	import LightButton from '@/components/LightButton'
	import LightCheckbox from '@/components/controls/LightCheckbox'
	import WraMyCollectionFieldsList from '@/components/wra/WraMyCollectionFieldsList'
	import TextInput from '@/components/TextInput'
	import { NotyConfirm } from '@/plugins/noty';
	import { call } from '@/plugins/rpcApi';
	export default {
		name: 'WraMyCollectionFields',
		props:[],
		fetch(){

		},
		data(){
			return{
				types:[{
					value:'String',label:'String',
					value:'Number',label:'Number',
					value:'Boolean',label:'Boolean',
					value:'Date',label:'Date',
					value:'Ref',label:'Ref'
				}],
				mode:'list',
				items:[],
				item:{
					_id:'',
					email:'',
					projects:[],
					type:'',
					required:false
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
						model:'wra_collection_field',
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
				this.items = await call('find',{
					model:'wra_collection_field',
					query:{
						owner: this.$store.state.auth.user._id
					}
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
				await call('wraSave',{
					$grabCurrentUser:'owner',
					model:'wra_collection_field',
					fields:['name','description'],
					data: {...this.item,projects:this.item.projects.map(p=>p._id)}
				})
				this.$noty.info('Saved')
				if(back){
					this.back();
				}
			},
			create(){
				var self = this;
				self.item._id = '';
				self.item.name = '';
				self.item.description = '';
				self.item.required = false;
				self.item.unique = false;
				self.item.index = false;
				this.mode = 'details';
			}
		},
		components:{
			TextInput,
			LightButton,
			WraMyCollectionFieldsList,
			WraMultipleProjectsSelect,
			WraCollectionFieldTypeSelect,
			LightCheckbox
		},
		created(){

		},
		mounted(){

		}
	}
</script>
<style lang="scss" scoped>
.WraMyCollectionFields{
	
}
</style>