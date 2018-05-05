<template>
	<div class="ModelsCrud row">
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
			<ModelsList 
			:items="items"
			@select="select" :item.sync="item"></ModelsList>
		</div>
		<div class="col-12" v-show="isDetails">
			<TextInput ref="name" class="w-50" label="Name" v-model="item.name"></TextInput>

			<TextInput v-show="item._id" :disabled="true" ref="updatedAt" class="w-50" label="Updated Date" v-model="updatedAt"></TextInput>
			
			<DocumentHistorySelect :disabled="!item._id" :id="item._id" type="wra_model_history"  @select="onHistorySelect"></DocumentHistorySelect>

			<LightLabel>Code</LightLabel>
    <JsEditor v-model="item.code"
              :height="800"></JsEditor>

		</div>
	</div>
</template>
<script>

	import DocumentHistorySelect from '@/components/DocumentHistorySelect';
	import { LightLabel } from '@/styledComponents/labels';
	import JsEditor from '@/components/JsEditor';
	import LightButton from '@/components/LightButton'
	import ModelsList from '@/components/ModelsList'
	import TextInput from '@/components/TextInput'
	import { NotyConfirm } from '@/plugins/noty';
	import { call } from '@/plugins/rpcApi';
	import moment from 'moment';
	export default {
		name: 'ModelsCrud',
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
					code:''
				}
			}
		},
		async asyncData(){
			return {}
		},
		computed:{
			updatedAt(){
				return moment(this.item.updatedAt).format('DD/MM/YYYY HH:mm SSS')
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
			async onHistorySelect(historyDoc){
				await this.save(false,'')
				this.item.code = historyDoc.code
				await this.save(false,'Restored')
			},
			async remove(){
				if (await NotyConfirm('Confirm Delete?')) {
					let r = await call('wra_model',{
						model:'wra_model',
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
					model:'wra_model'
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
			async save(back,customMessage){
				if(this.validate()!==true){
					return this.$noty.warning('Complete '+this.validate())
				}
				Object.assign(this.item,await call('wraSaveModel',this.item))
				if(customMessage===undefined){
					this.$noty.info('Saved')	
				}else{
					if(customMessage!==''){
						this.$noty.info(customMessage)
					}
				}
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
			ModelsList,
			LightLabel,
			JsEditor,
			DocumentHistorySelect

		},
		created(){

		},
		mounted(){

		}
	}
</script>
<style lang="scss" scoped>
.ModelsCrud{
	
}
</style>