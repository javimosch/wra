<template>
	<div class="CopyPasteScript" ref="el">
		<div class="row">
			<div class="col-12">
				<b-btn @click="copy" data-clipboard-text="Ju"
				class="mx-auto d-block copyPaste" size="lg" variant="warning">Copy script</b-btn>
			</div>
		</div>
	</div>
</template>
<script>
	import { call } from '@/plugins/rpcApi';
	import { copyToClipboard2 } from '@/plugins/browser';
	export default {
		name: 'CopyPasteScript',
		props:['project'],
		fetch(){

		},
		data(){
			return{}
		},
		async asyncData(){
			return {}
		},
		computed:{

		},
		methods:{
			async copy(){

				const defaultScript = `!function(e,n){if(e){var t="http://localhost:3002/";window.onerror=function(e,n,t,r,i){return a({message:e,lineNumber:t,columnNumber:r,stack:i.stack,fileName:i.fileName,name:i.name,number:i.number,description:i.description,message:i.message,url:n}),!1},window.addEventListener("unhandledrejection",function(e){window.aa=e,e.promise.catch(a)})}function a(e,a){if((e={stack:e.stack,fileName:e.fileName,name:e.name,lineNumber:e.lineNumber,columnNumber:e.columnNumber,number:e.number,description:e.description,message:e.message,url:e.url,at:new Date,pid:n}).message){var r=new XMLHttpRequest;r.open("POST",t+"rpc/taeSendError",!0),r.setRequestHeader("Content-Type","application/json"),r.onreadystatechange=function(){4===r.readyState&&200===r.status&&a&&a(r.responseText)},r.send(JSON.stringify({n:"taeSendError",d:e}))}}}("undefined"!=typeof window,'${this.project}');`

				var script = await call('taeGetIntegrationScript',{
					project: this.project
				});
				if(script){
					script = script.replace('PROJECT_ID',`'${this.project}'`);
				}
				
				await copyToClipboard2(script || defaultScript,'.copyPaste');
				this.$noty.info('Copied to clipboard!')
				
			}
		},
		components:{

		},
		created(){

		},
		mounted(){

		}
	}
</script>
<style lang="scss" scoped>
.CopyPasteScript{
	
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