<template>
	<div class="WraMultipleCollectionFieldsSelect">
		<div class="row no-gutters">
			<div class="col-12" v-show="label">
				<LightLabel v-html="label"></LightLabel>
			</div>
			<div class="col-12">
				<WraCollectionFieldsSelect :owner="owner" ref="select" v-model="item._id" @change="change" @clear="clear"></WraCollectionFieldsSelect>
			</div>
			<div class="col-12 mt-2">
				<ul class="list-group">
						<li class="list-group-item position-relative" v-for="(item) in value" :key="item._id" >
							<p v-html="item.name" class="d-block float-left m-0 p-0"></p>
							<div class='float-right CloseButton' @click="remove(item)">
								<i class="fas fa-times"></i>
							</div>
						</li>
				</ul>
			</div>
			<div class="col-12" v-show="canAdd">
				<LightButton  @click="add" >Add</LightButton>		
			</div>
		</div>
	</div>
</template>
<script>
	import {LightLabel} from '@/styledComponents/labels'
	import WraCollectionFieldsSelect from '@/components/wra/WraCollectionFieldsSelect'
	import LightButton from '@/components/LightButton'
	export default {
		name: 'WraMultipleCollectionFieldsSelect',
		props:['value','label','owner'],
		fetch(){

		},
		data(){
			return{
				item:{
					_id:'',
					name:''
				}
			}
		},
		async asyncData(){
			return {}
		},
		computed:{
			canAdd(){
				return this.item._id
			}
		},
		methods:{
			focus(){
				this.$refs.select.focus();
			},
			remove(item){
				console.log('item',item)
				this.$emit('input',[...this.value.filter(i=>i._id!==item._id)])
			},
			add(){
				var self = this;
				if(this.value.find(i=>i._id==self.item._id)){
					return this.$noty.warning('Already added')
				}
				this.$emit('input',[...this.value,this.item])
				this.clear()
			},
			clear(){
				var self = this;
				var o = {};
				Object.keys(this.item).forEach(k=>o[k]='')
				this.item = o;
			},
			change(item){
				this.item = {...this.item,...item}
			}
		},
		components:{
			WraCollectionFieldsSelect,
			LightButton,
			LightLabel
		},
		created(){

		},
		mounted(){

		}
	}
</script>
<style lang="scss" scoped>
.WraMultipleCollectionFieldsSelect{
	
}
.CloseButton:hover{
	cursor:pointer;
}
</style>