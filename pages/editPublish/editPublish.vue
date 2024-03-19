<template>
	<view>
		<uni-section title="编辑发布内容" type="line">
			<view class="title">
				<uni-icons type="flag-filled" size="36rpx" color="red"></uni-icons>
				<uni-easyinput type="text" v-model="inputTitle" placeholder="请输入标题"></uni-easyinput>
			</view>
			<view class="introduction">
				<uni-icons type="compose" size="36rpx" color="green"></uni-icons>
				<uni-easyinput type="textarea" v-model="inputAbstract" placeholder="记录这一刻的灵感"></uni-easyinput>
			</view>

			<uni-file-picker limit="1" title="最多选择1张图片" @select="select" @progress="progress" @success="success"
				@fail="fail"></uni-file-picker>
			
				
			<view class="introduction">
				<uni-icons type="wallet-filled" size="36rpx" color="green"></uni-icons>
				<uni-easyinput type="text" v-model="inputPrice" placeholder="请输入预期价格"></uni-easyinput>
			</view>

			
			<uni-section title="请选择类别">
				<uni-data-select v-model="typeValue" :localdata="range" @change="change"></uni-data-select>
			</uni-section>

			<button type="primary" size="default" @click="submitClick" class="button">发布</button>

	</uni-section>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				imageValue: [],
				inputTitle: "", //标题
				inputAbstract: "", //灵感
				inputPrice: "", //价格
				typeValue: "",
				range: [{
						value: 0,
						text: "旧衣求改造"
					},
					{
						value: 1,
						text: "作品售卖"
					},
					{
						value: 2,
						text: "灵感求实现"
					},
				],
			}
		},
		methods: {
			// 获取上传状态
			select(e) {
				console.log('选择文件：', e)
			},
			// 获取上传进度
			progress(e) {
				console.log('上传进度：', e)
			},

			// 上传成功
			success(e) {
				console.log('上传成功')
			},

			// 上传失败
			fail(e) {
				console.log('上传失败：', e)
			},

			//类别选择改变
			change() {
				console.log("现在选择的类别是：" + this.typeValue);
			},

			submitClick() {
				console.log("submitClick!");
				uni.redirectTo({
					url: "/pages/productDetail/productDetail"
				});
			}
		},
		watch: {
			inputTitle(val1, val2) {
				console.log("val1: " + val1);
				console.log("val2: " + val2);
			}
		}
	}
</script>

<style>
	page {
		width: 100%;
		height: 100%;
		background-color: white;
	}

	.button {
		margin-top: 10%;
	}
</style>
