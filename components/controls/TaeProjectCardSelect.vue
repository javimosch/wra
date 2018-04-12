<template>
	<div class="TaeProjectCardSelect">
		<CollapsableCard :text="projectName" :collapsed.sync="collapsed">
				<div slot="title">
					<h3 class="text-center m-0 Title"
			      	
			          v-html="projectName"></h3>
				</div>
				<div class="row">
					<div class="col-12" v-show="!item.name">
						<p>Edition</p>
						<TaeProjectSelect 
						@onClear="onClear"
						:value="value"
						@change="onSelect"></TaeProjectSelect>
						<hr>
					</div>
					<div class="col-12 col-md-8 offset-md-2 mt-2">
						<b-form-input v-model="item.name" class="mt-2" placeholder="name"></b-form-input>
						<b-btn class="mx-auto d-block mt-2" size="lg" variant="warning" v-html="saveLabel" @click="save" :disabled="!item.name"></b-btn>
					</div>
				</div>
				
		</CollapsableCard>
	</div>
</template>
<script>
	import CollapsableCard from '@/components/CollapsableCard';
	import TaeProjectSelect from '@/components/controls/TaeProjectSelect';
	import { call } from '@/plugins/rpcApi';
	import _ from 'lodash'
	export default {
		name: 'TaeProjectCardSelect',
		props:['value'],
		fetch(){

		},
		data(){
			return{
				item:{
					_id:'',
					name:''
				},
				original:{},
				collapsed:false,
			}
		},
		async asyncData(){
			return {}
		},
		computed:{
			projectName(){
				return this.item.original||this.item.name||'(Choice or create a project)'
			},
			saveLabel(){
				return this.item._id?'Update':'Create'
			}
		},
		methods:{
			onSelect(item){
				let self = this;
				Object.assign(this.item,item)
				this.original = item;
				this.collapsed=false
				if(item && item._id){
					setTimeout(()=>self.$emit('input',item._id),100)
				}
			},
			onClear(){
				Object.assign(this.item,{_id:'',name:''})
				this.$emit('input','')
			},
			async save(){
				let self = this;
				let item = await call('saveTaePersonalProject',_.pick(this.item,['_id','name']));
				this.$noty.info('Saved')
				this.$emit('input','')
				this.onSelect(item);
				this.collapsed=false
			}
		},
		components:{
			CollapsableCard,
			TaeProjectSelect
		},
		created(){

		},
		mounted(){
			let self = this;
			this.$watch('item.name',(v)=>{
				if(!v) self.$emit('input','')
			})
		}
	}
</script>
<style lang="scss" scoped>
.TaeProjectCardSelect{
	
}

a,button{
	max-width: 200px;
    background-color:$color4;
  }
  a:hover,button:hover{
   background-color:$color1; 
   border-color:$color1;
   color:$color6;
  }
</style>