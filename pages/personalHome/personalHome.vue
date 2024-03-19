<template>
	<view class="allContainer">
		<!-- 管理员简介 -->
		<view class="outlineContainer" v-if="userInfo.role === 2">
			<uni-card :title=userInfo.name sub-title="名字" extra="管理员" :thumbnail="avatar" @click="" class="outline">
				<text class="uni-body">我是管理员，这是我的简介。</text>
			</uni-card>
		</view>

		<!-- 设计师或用户简介 -->
		<view class="outlineContainer" v-if="userInfo.role!==2">
			<uni-card :title=userInfo.name sub-title="名字" :extra="userInfo.role === 0 ? '用户' : '设计师'"
				:thumbnail="avatar" @click="" class="outline">
				<text class="uni-body">这是简介。</text>
			</uni-card>
		</view>

		<!-- 角色为用户时候的情况 -->
		<view class="detailContainer" v-if="userInfo.role===0">
			<uni-segmented-control :current="current" :values="userItems" @clickItem="onClickItem" styleType="button"
				activeColor="#579dd9"></uni-segmented-control>
			<view class="content">
				<view v-show="current === 0" class="detailList">
					<uni-card v-for="(item, index) in issueList" :key=index title="发布文章标题" extra="作品id"
						class="productCard" @click="toDetial(item)">
						<text class="uni-body">这是发布文章描述</text>
					</uni-card>
				</view>
				<view v-show="current === 1" class="detailList">
					<uni-card v-for="(item, index) in interestList" :key=index title="感兴趣作品标题" extra="感兴趣作品id"
						class="productCard" @click="toDetial(item)">
						<text class="uni-body">这是感兴趣作品描述</text>
					</uni-card>
				</view>
				<view v-show="current === 2" class="detailList">
					<uni-card v-for="(item, index) in boughtList" :key=index title="已购买作品标题" extra="已购买作品id"
						class="productCard" @click="toDetial(item)">
						<text class="uni-body">这是已购买作品描述</text>
					</uni-card>
				</view>
			</view>
		</view>

		<!-- 角色为设计师时候的情况 -->
		<view class="detailContainer" v-if="userInfo.role===1">
			<text class="achievementNum">已成交：{{soldNum}} 件</text>
			<uni-segmented-control :current="current" :values="designerItems" @clickItem="onClickItem"
				styleType="button" activeColor="#579dd9"></uni-segmented-control>
			<view class="content">
				<view v-show="current === 0" class="detailList">
					<uni-card v-for="(item, index) in toSellList" :key=index title="待售作品标题" extra="待售作品id"
						class="productCard" @click="toDetail(item)">
						<text class="uni-body">这是待售作品描述</text>
					</uni-card>
				</view>
				<view v-show="current === 1" class="detailList">
					<uni-card v-for="(item, index) in interestList" :key=index title="感兴趣作品标题" extra="已售作品id"
						class="productCard" @click="toDetail(item)">
						<text class="uni-body">这是已售作品描述</text>
					</uni-card>
				</view>
			</view>
		</view>

		<!-- 角色为管理员时候的情况 -->
		<view class="detailContainer" v-if="userInfo.role===2">
			<uni-segmented-control :current="current" :values="adminItems" @clickItem="onClickItem" styleType="button"
				activeColor="#579dd9"></uni-segmented-control>
			<view v-show="current === 0" class="detailList">
				<uni-table ref="table" :loading="loading" emptyText="暂无更多数据" @selection-change="selectionChange">
					<uni-tr>
						<uni-th width="33%">排名</uni-th>
						<uni-th width="33%">设计师名字</uni-th>
						<uni-th width="33%">设计师id</uni-th>
					</uni-tr>
					<uni-tr v-for="(item, index) in rankList" :key="index">
						<uni-td>{{ index + 1}}</uni-td>
						<uni-td>
							<view class="name">{{ item.name }}</view>
						</uni-td>
						<uni-td>
							<view class="name">{{ item.id }}</view>
						</uni-td>

					</uni-tr>
				</uni-table>
			</view>
			<view v-show="current === 1" class="detailList">
				<uni-table ref="table" :loading="loading" emptyText="暂无更多数据" @selection-change="selectionChange">
					<uni-tr>
						<uni-th width="25%">作品标题</uni-th>
						<uni-th width="25%">作品id</uni-th>
						<uni-th width="25%">投诉原因</uni-th>
						<uni-th width="25%">处理结果</uni-th>
					</uni-tr>
					<uni-tr v-for="(item, index) in managedRecord" :key="index">
						<uni-td>{{item.title}}</uni-td>
						<uni-td>
							<view class="name">{{ item.id }}</view>
						</uni-td>
						<uni-td>
							<view class="name">{{ item.reason }}</view>
						</uni-td>
						<uni-td>
							<view class="name">{{ item.result === 0 ? '同意，已删除' : '不同意，未删除' }}</view>
						</uni-td>

					</uni-tr>
				</uni-table>
			</view>
		</view>
	</view>
	</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				userInfo: {
					avatar: "",
					role: 0,
					name: "ShitShit",
				},
				userItems: ['我的发布', '感兴趣的', '已购买的'],
				designerItems: ['待售作品', '已售作品'],
				adminItems: ['成交排行', '处理记录'],
				current: 0,
				issueList: [1, 2, 3, 4, 5], //我的发布
				interestList: [1, 2, 3, 4, 5], //感兴趣
				boughtList: [1, 2, 3, 4, 5], //已购买
				toSellList: [1, 2, 3, 4, 5], //待售
				hasSoldList: [1, 2, 3, 4, 5], //已售

				soldNum: 10, //已成交数量
				rankList: [{
						name: "John",
						id: "sss",
					},
					{
						name: "Sarah",
						id: "ddd",
					},
					{
						name: "Sandy",
						id: "fff",
					},
				], //排行
				managedRecord: [{
						title: "集美们，牛牛牛",
						id: "eee",
						reason: "引战",
						result: 0, // 0 1 分别代表未删除，已删除
					},
					{
						title: "吃屎吧",
						id: "fff",
						reason: "标题低俗",
						result: 1, // 0 1 分别代表未删除，已删除
					},
					{
						title: "我大吗",
						id: "hhh",
						reason: "标题低俗",
						result: 0, // 0 1 分别代表未删除，已删除
					},

				]
			}
		},
		computed() {

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
			}
		}
	}
</script>

<style>
	page {
		height: 100%;
		width: 100%;
	}

	.allContainer {
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: center;
		width: 100%;
		height: 100%;
	}

	.outlineContainer {
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		align-items: center;
		height: 30%;
		border-bottom-right-radius: 15%;
		border-bottom-left-radius: 10%;
		width: 100%;
		background-color: skyblue;
	}

	.outline {
		width: 100%;
		height: 100%;
	}

	.detailContainer {
		margin-top: 30rpx;
		width: 100%;
	}

	.admin-content {
		height: 100%;
		width: 100%;
	}

	.detailList {
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		align-items: center;
	}

	.list-item {
		width: 100%;
		height: 100%;
	}

	.productCard {
		width: 100%;
		height: 100%;
	}

	.achievementNum {
		color: red;
		text-align: center;
		font-size: 30rpx;
	}
</style>
