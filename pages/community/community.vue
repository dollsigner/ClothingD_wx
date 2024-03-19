<template>
	<view>
		<view class="ideaContainer" @click="toEditPublish" v-if="role!==2">
			<uni-icons type="plus" size="30"></uni-icons>
			<text class="ideaText">发布</text>
		</view>
		<view class="space"></view>
		<view class="communityListContainer">
			<uni-card v-for="(item, index) in communityList" :key=index :title=item.title :extra=item.catagory
				class="productCard" @click="toDetail(item)">
				<text class="toSellText" v-if="item.status===0">未成交</text>
				<text class="soldText" v-if="item.status===1">已成交</text>
			</uni-card>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				role: 0,
				
				communityList: [{
					title: "作品标题",
					status: 0,
					catagory: "旧衣改造"
				}, {
					title: "作品标题2",
					status: 1,
					catagory: "理念革新"
				}, {
					title: "作品标题3",
					status: 1,
					catagory: "垃圾垃圾"
				}, {
					title: "作品标题4",
					status: 0,
					catagory: "牛逼牛逼"
				}, {
					title: "作品标题5",
					status: 1,
					catagory: "嘻嘻嘻嘻"
				}]
			}
		},
		methods: {
			toDetail(item) {
				console.log("作品为： " + JSON.stringify(item));
				uni.navigateTo({
					url: '/pages/productDetail/productDetail'
				})
			},
			toEditPublish() {
				uni.navigateTo({
					url: '/pages/editPublish/editPublish'
				})
			}
		}
	}
</script>

<style>
	page {
		width: 100%;
		height: 100%;
	}

	.ideaContainer {
		position: absolute;
		right: 5%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.ideaText {
		font-size: 20rpx;
		color: gray;
	}

	.space {
		height: 80rpx;
	}

	.communityListContainer {
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: center;
		width: 100%;
		height: 100%;
	}

	.toSellText {
		color: red;
		font-size: 30rpx;
	}

	.soldText {
		color: gray;
		font-size: 30rpx;
	}

	.productCard {
		width: 100%;
		height: 100%;
	}
</style>
