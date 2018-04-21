<template>
	<div class="StringList">
		<div class="row no-gutters">
			<div class="col-12" v-show="label">
				<LightLabel v-html="label"></LightLabel>
			</div>
			<div class="col-12">
				<TextInput ref="input" class="" v-model="item" @change="change">
				</TextInput>
			</div>
			<div class="col-12 mt-2">
				<ul class="list-group">
						<li class="list-group-item position-relative" v-for="(item,key) in value" :key="key" >
							<p v-html="item" class="d-block float-left m-0 p-0"></p>
							<div class='float-right CloseButton' @click="remove(item)">
								<i class="fas fa-times"></i>
							</div>
						</li>
				</ul>
			</div>
			<div class="col-12" v-show="canAdd">
				<LightButton  @click="add" >Add</LightButton>		
				<LightButton  @click="clear" >Clear</LightButton>		
			</div>
		</div>
	</div>
</template>
<script>
	import TextInput from '@/components/TextInput'
	import {LightLabel} from '@/styledComponents/labels'
	import LightButton from '@/components/LightButton'
	export default {
		name: 'StringList',
		props:['value','label'],
		fetch(){

		},
		data(){
			return{
				item:''
			}
		},
		async asyncData(){
			return {}
		},
		computed:{
			canAdd(){
				return !!this.item
			}
		},
		methods:{
			
			focus(){
				this.$refs.input.focus();
			},
			remove(item){
				this.$emit('input',[...this.value.filter(i=>i!==item)])
			},
			add(){
				var self = this;
				if(this.value.find(i=>i==self.item)){
					return this.$noty.warning('Already added')
				}
				this.$emit('input',[...this.value,this.item])
				this.clear()
			},
			clear(){
				var self = this;
				this.item = '';
			},
			change(item){
				this.item = item
			}
		},
		components:{
			LightButton,
			LightLabel,
			TextInput
		},
		created(){

		},
		mounted(){

		}
	}
</script>
<style lang="scss" scoped>
.StringList{
	
}
.CloseButton:hover{
	cursor:pointer;
}
</style>