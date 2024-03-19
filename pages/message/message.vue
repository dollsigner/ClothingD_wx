<template>
	<!-- 非管理员 -->
	<view v-if="role !== 2">

		<uni-segmented-control :current="current" :values="messageItems" @clickItem="onClickItem" styleType="button"
			activeColor="#579dd9"></uni-segmented-control>
		<!-- 点赞消息 -->
		<view v-show="current === 0">
			<uni-card v-for="(item,index) in likeList" :title="item.productName" :extra="`作品id:{{item.productId}}`"
				@click="toDetail(item)">
				<text class="uni-body">{{item.userName}} (id:{{item.userId}})</text>
				<text class="uni-body">点赞了您的作品</text>
			</uni-card>
		</view>
		<!-- 用户的议价消息 -->
		<view v-show="current === 1 && role === 0">
			<uni-card v-for="(item,index) in barginListUser" :title="item.productName"
				:extra="`作品id:{{item.productId}}`" @click="toDetail(item)">
				<text class="uni-body">您对该作品的出价</text>
				<text class="bid-text">{{item.bid}}¥</text>
				<text class="uni-body" style="color: gray" v-if="item.status === 0">仍未响应</text>
				<text class="uni-body" style="color: green" v-if="item.status === 1">已被接受, 请尽快支付</text>
				<text class="uni-body" style="color: red" v-if="item.status === 2">已被拒绝</text>
				<text class="uni-body" style="color: peachpuff" v-if="item.status === 3">已经完成</text>
				<button type="primary" size="mini" v-if="item.status === 1" @click.stop="clickPay(item)">支付</button>
			</uni-card>
		</view>
		<!-- 设计师的议价消息 -->
		<view v-show="current === 1 && role === 1">
			<uni-card v-for="(item,index) in barginListDesiner" :title="item.productName"
				:extra="`作品id:{{item.productId}}`" @click="toDetail(item)">
				<text class="uni-body">{{item.userName}} (id:{{item.userId}})为您的作品出价</text>
				<text class="bid-text">{{item.bid}}¥</text>
				<view class="decide-button">
					<button size="mini" style="background-color: skyblue; color: white" @click.stop="">接受</button>
					<button size="mini" type="warn" @click.stop="">拒绝</button>
				</view>
			</uni-card>
		</view>
		<!-- 留言与回复消息 -->
		<view v-show="current === 2">
			<!-- 留言消息 来源作品 -->
			<uni-card v-for="(item,index) in noteList" :title="item.productName" :extra="`作品id:{{item.productId}}`"
				@click="toDetail(item)">
				<text class="uni-body">{{item.userName}} (id:{{item.userId}})为您的作品留言：</text>
				<view v-text="`\n{{item.note}}`" style="white-space: pre-wrap; color: coral;"></view>
				<button type="primary" size="mini" @click.stop="clickReply(item)">回复</button>
			</uni-card>
			<!-- 回复消息 来源留言和回复 -->
			<uni-card v-for="(item,index) in replyNoteList" :title="item.productName" :extra="`作品id:{{item.productId}}`"
				@click="toDetail(item)">
				<view v-text="`({{item.note}})`" style="font-size: 70%;"></view>
				<text class="uni-body">{{item.userName}} (id:{{item.userId}})回复您：</text>
				<view v-text="`\n{{item.replyNote}}`" style="white-space: pre-wrap; color: coral;"></view>
				<button type="primary" size="mini" @click.stop="clickReply(item)">回复</button>
			</uni-card>
		</view>
		
		<view>
			<!-- 输入框示例 -->
			<uni-popup ref="inputDialog" type="dialog">
				<uni-popup-dialog ref="inputClose" mode="input" title="输入内容" value="对话框预置提示内容!" placeholder="请输入内容"
					@confirm="dialogInputConfirm"></uni-popup-dialog>
			</uni-popup>
		</view>
	</view>
	
	<!-- 管理员 -->
	<view v-else>
		<view>
			<uni-card v-for="(item,index) in reportList" :title="item.productName" :extra="`作品id:{{item.productId}}`"
				@click="toDetail(item)">
				<text class="uni-body">{{item.userName}} (id:{{item.userId}})</text>
				<text class="uni-body">投诉了该作品，举报理由是：</text>
				<view v-text="`\n{{item.reportReason}}`" style="white-space: pre-wrap; color: coral;"></view>
			</uni-card>
		</view>
	</view>


</template>

<script>
	export default {
		data() {
			return {
				role: 0,
				current: 0,
				messageItems: ['收到的点赞', '收到的议价', '收到的留言'],
				likeList: [{
						productName: "一枝花",
						productId: "1256",
						userName: "魔尊是我",
						userId: "387"
					},
					{
						productName: "羡慕死啦",
						productId: "2345",
						userName: "天上地下",
						userId: "321"
					},
					{
						productName: "猫猫万岁",
						productId: "6578",
						userName: "唯我独尊",
						userId: "5678"
					}
				],
				// bid 代表用户的出价
				barginListDesiner: [{
						bid: 1000,
						productName: "一枝花",
						productId: "1256",
						userName: "魔尊是我",
						userId: "387"
					},
					{
						bid: 2000,
						productName: "羡慕死啦",
						productId: "2345",
						userName: "天上地下",
						userId: "321"
					},
					{
						bid: 3000,
						productName: "猫猫万岁",
						productId: "6578",
						userName: "唯我独尊",
						userId: "5678"
					}
				],
				// status 0 1 2 3 代表未响应 已接受 被拒绝 已完成
				barginListUser: [{
						status: 0,
						bid: 1000,
						productName: "一枝花",
						productId: "1256",
						userName: "魔尊是我",
						userId: "387"
					},
					{
						status: 1,
						bid: 2000,
						productName: "羡慕死啦",
						productId: "2345",
						userName: "天上地下",
						userId: "321"
					},
					{
						status: 2,
						bid: 3000,
						productName: "猫猫万岁",
						productId: "6578",
						userName: "唯我独尊",
						userId: "5678"
					},
					{
						status: 3,
						bid: 4000,
						productName: "家人们谁懂",
						productId: "6578",
						userName: "唯我独尊",
						userId: "5678"
					},
				],
				//作品的留言
				noteList: [{
						note: "好想要这件，等我有钱",
						productName: "一枝花",
						productId: "1256",
						userName: "魔尊是我",
						userId: "387"
					},
					{
						note: "可以给我留言帮改造哈",
						productName: "羡慕死啦",
						productId: "2345",
						userName: "天上地下",
						userId: "321"
					},
					{
						note: "这个感觉不太好看",
						productName: "猫猫万岁",
						productId: "6578",
						userName: "唯我独尊",
						userId: "5678"
					}
				],
				//回复的消息
				replyNoteList: [{
						note: "好想要这件，等我有钱",
						replyNote: "等你",
						productName: "一枝花",
						productId: "1256",
						userName: "魔尊是我",
						userId: "387"
					},
					{
						note: "可以给我留言帮改造哈",
						replyNote: "找到你啦宝",
						productName: "羡慕死啦",
						productId: "2345",
						userName: "天上地下",
						userId: "321"
					},
					{
						note: "这个感觉不太好看",
						replyNote: "你爹我最好看",
						productName: "猫猫万岁",
						productId: "6578",
						userName: "唯我独尊",
						userId: "5678"
					}
				],
				// 管理员投诉消息
				reportList:  [{
						reportReason: "不要脸",
						productName: "一枝花",
						productId: "1256",
						userName: "魔尊是我",
						userId: "387",
					},
					{
						reportReason: "用词敏感",
						productName: "羡慕死啦",
						productId: "2345",
						userName: "天上地下",
						userId: "321"
					},
					{
						reportReason: "人权比不过猫拳",
						productName: "猫猫万岁",
						productId: "6578",
						userName: "唯我独尊",
						userId: "5678"
					}
				]
			}
		},
		methods: {
			onClickItem(e) {
				if (this.current != e.currentIndex) {
					this.current = e.currentIndex;
				}
			},
			toDetail(item) {
				console.log("作品为： " + JSON.stringify(item));
				uni.navigateTo({
					url: '/pages/productDetail/productDetail'
				})
			},
			clickPay(item) {
				console.log("支付作品：" + JSON.stringify(item));
				console.log("调起支付api");
			},
			clickReply(item) {
				console.log("回复人物：" + JSON.stringify(item));
				console.log("调起回复接口");
				this.inputDialogToggle();
				console.log("store: " + JSON.stringify(this.$store.state))
				
				/* uni.request({
				    url: 'http://127.0.0.1:8080/hello', //仅为示例，并非真实接口地址。
				    success: (res) => {
				        console.log(JSON.stringify(res));
				    }
				}); */
			},
			inputDialogToggle() {
				console.log("inputDialogToggle!");
				this.$refs.inputDialog.open();
			},
			dialogInputConfirm(e) {
				console.log(e);
			}
		}
	}
</script>

<style>
	page {
		width: 100%;
		height: 100%;
	}

	.bid-text {
		color: gold;
	}

	.decide-button {
		display: flex;
		flex-direction: row;
		justify-content: space-around;
	}
</style>
