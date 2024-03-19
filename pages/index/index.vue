<template>
	<view class="container">
		
		<view class="intro">本项目已包含uni ui组件，无需import和注册，可直接使用。在代码区键入字母u，即可通过代码助手列出所有可用组件。光标置于组件名称处按F1，即可查看组件文档。</view>
		<text class="intro">详见：</text>
		<uni-link :href="href" :text="href"></uni-link>
		<button @click="setJson"> testSetJson! </button>
		<button @click="deleteJson"> testDeleteJson! </button>
	</view>
</template>

<script>
	import WXAPI from "apifm-wxapi";
	WXAPI.init("wwj520");
	console.log("This is index.vue!");
	WXAPI.province().then(res => {
	    console.log('请在控制台看打印出来的数据：', res)
	})
	
	export default {
		data() {
			return {
				token: '',
				href: 'https://uniapp.dcloud.io/component/README?id=uniui'
			}
		},
		methods: {
			setJson()
			{
				let demoJson = {
					type: 'json-test',
					content: "{'content': 'shit shit'}",
					token: this.token,
				};
				WXAPI.jsonSet(demoJson).then(res=>{
					console.log(JSON.stringify(res));
				})
				console.log("This is setJson");
				
			},
			deleteJson()
			{
				WXAPI.jsonDelete("78_DD5MS2FZnYpMTuFXjnu7quJRXYXEltgOz42Vm5tqykDxbOpLZ2lifUrGZnDeXAbO2_K5NRCIBakbPgcPeoGKqHIF7ldKANGElGpoxoK_6apASm2aThl18WyQG8YTCXiAEAMVQ").then(res=>{
					console.log(JSON.stringify(res));
				})
				console.log("This is deleteJson");
			}
		},
		
		async mounted()
		{
			console.log("index is mounted!");
			let code;
			
			await uni.login({
				provider: "weixin"
			}).then(res=>{
				console.log("code: " + JSON.stringify(res));
				code = res[1].code;
			})
			
			/* WXAPI.register_simple({code: code}).then(res=>{
				console.log("res: " + JSON.stringify(res));
			}) */
			
			WXAPI.login_wx(code).then(res=>{
				console.log("res: " + JSON.stringify(res));
				this.token = res.data.token;
			})
			
		}
	}
</script>

<style>
	.container {
		padding: 20px;
		font-size: 14px;
		line-height: 24px;
	}
	
	.intro {
		color: blueviolet;
	}
</style>
