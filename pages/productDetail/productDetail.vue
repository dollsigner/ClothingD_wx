<template>
	<view>
		<uni-card cover="https://img.zcool.cn/community/016c325543065e0000019ae909489a.jpg@1280w_1l_2o_100sh.jpg"
			isShadow="true" title="标题" subTitle="发布人">
			<text>这是作品简介</text>
			<template v-slot:actions>
				<view class="card-actions">
					<view class="card-actions-item">
						<uni-icons type="circle" size="18" color="#999" v-if="false"></uni-icons>
						<text class="card-actions-item-text" v-if="false">未成交</text>
						<uni-icons type="circle-filled" size="18" color="#999"></uni-icons>
						<text class="card-actions-item-text">已成交</text>
					</view>
					<view class="card-actions-item">
						<uni-icons type="info" size="18" color="#00aaff"></uni-icons>
						<text class="card-actions-item-text">旧衣改造类</text>
					</view>
					<view class="card-actions-item">
						<uni-icons type="gift" size="18" color="#55ff00"></uni-icons>
						<text class="card-actions-item-text">¥1000</text>
					</view>
				</view>
				<view class="space"></view>
				
			</template>
		</uni-card>

		<!-- 点赞 举报 收藏 私聊操作 || 管理员操作 -->
		<uni-card :is-shadow="false">
			<view class="card-actions" v-if="role!==2">
				<view class="card-actions-item">
					<uni-icons type="heart" size="18" color="#999"></uni-icons>
					<uni-icons type="heart-filled" size="18" color="#ff5500" v-if="false"></uni-icons>
					<text class="card-actions-item-text">点赞</text>
				</view>
				<view class="card-actions-item" @click="clickReport">
					<uni-icons type="minus-filled" size="18" color="#aa5500"></uni-icons>
					<text class="card-actions-item-text">举报</text>
				</view>
				<view class="card-actions-item">
					<uni-icons type="info-filled" size="18" color="#999"></uni-icons>
					<text class="card-actions-item-text" @click="clickBargain">议价</text>
				</view>
				<view class="card-actions-item" @click="clickChat">
					<uni-icons type="email" size="18" color="#999"></uni-icons>
					<text class="card-actions-item-text">私聊</text>
				</view>
			</view>
			<!-- 管理员操作 -->
			<view class="card-actions" v-if="role===2">
				<view class="card-actions-item">
					<uni-icons type="closeempty" size="22" color="#ff5500"></uni-icons>
					<text class="card-actions-item-text">删除</text>
				</view>
				<view class="card-actions-item" @click="navBack">
					<uni-icons type="checkmarkempty" size="22" color="#aa5500"></uni-icons>
					<text class="card-actions-item-text">返回</text>
				</view>
			</view>
		</uni-card>

		<!-- 私聊对话框弹窗 -->
		<view>
			<!-- 输入框示例 -->
			<uni-popup ref="chatDialog" type="dialog">
				<uni-popup-dialog ref="inputClose" mode="input" title="留言" value="" placeholder="请输入留言"
					@confirm="chatDialogConfirm"></uni-popup-dialog>
			</uni-popup>
		</view>

		<!-- 举报对话框弹窗 -->
		<view>
			<!-- 输入框示例 -->
			<uni-popup ref="reportDialog" type="dialog">
				<uni-popup-dialog ref="inputClose" mode="input" title="举报" value="" placeholder="请输入举报理由"
					@confirm="reportDialogConfirm"></uni-popup-dialog>
			</uni-popup>
		</view>
		
		<!-- 议价对话框弹窗 -->
		<view>
			<!-- 输入框示例 -->
			<uni-popup ref="bargainDialog" type="dialog">
				<uni-popup-dialog ref="inputClose" mode="input" title="议价" value="" placeholder="请输入标的金额"
					@confirm="bargainDialogConfirm"></uni-popup-dialog>
			</uni-popup>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				role: 0, // 0:用户 1:设计师 2:管理员,
				typeValue: "", //举报理由,
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
			navBack() {
				uni.navigateBack();
			},
			chatDialogConfirm(e) {
				console.log(e);
				uni.showToast({
					title: '留言成功',
					duration: 2000
				});
			},
			reportDialogConfirm(e) {
				console.log(e);
				uni.showToast({
					title: '举报成功',
					duration: 2000
				});
			},
			bargainDialogConfirm(e) {
				console.log(e);
				uni.showToast({
					title: '议价已发送',
					duration: 2000
				});
			},
			clickChat() {
				this.$refs.chatDialog.open();
			},
			clickReport() {
				this.$refs.reportDialog.open();
			},
			clickBargain() {
				this.$refs.bargainDialog.open();
			}
		}
	}
</script>

<style>
	page {
		width: 100%;
		height: 100%;
	}

	.space {
		width: 100%;
		height: 5%;
		background-color: black;
	}

	.card-actions {
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		align-items: center;
	}

	.admin-actions-item {
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		align-items: center;
	}
</style>
