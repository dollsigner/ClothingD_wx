<template>
	<view class="container">
		<view class="imageFather">
			<image :src="imageURL" mode="heightFix"></image>
		</view>
		<view class="welcome-general" :hidden="hasUserInfo">
			<view>您好！感谢您选择创意服装设计！</view>
			<view class="important">--探索无限创意，与我们一起在艺术的海洋中畅游！</view>
			<view class="important">--用创意装点生活，用交流连接心灵，艺术因你而美丽。</view>
			<view class="important">--通过图片和描述，展示您的作品、创意和灵感，与全球的艺术家和设计师分享您的想法。</view>
			<view>加入我们，开启艺术之旅，发现无尽的可能性！</view>
		</view>
		<button type="primary" @click="handlerLogin">授权登录</button>

		<!-- <button class="avatar-wrapper" open-type="chooseAvatar" @chooseavatar="onChooseAvatar">
			<image class="avatar" :src="avatarUrl" mode="widthFix"></image>
		</button>
		<input type="nickname" class="weui-input" placeholder="请输入昵称" /> -->
	</view>

</template>

<script>
	const defaultAvatarUrl =
		'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'
	export default {
		data() {
			return {
				imageURL: "https://www.nawpic.com/media/2020/cute-cat-nawpic-7.jpg",
				avatarUrl: defaultAvatarUrl,
			}
		},
		methods: {
			onChooseAvatar(e) {
					console.log("e: " + JSON.stringify(e.detail.avatarUrl));
					this.avatarUrl = e.detail.avatarUrl;
				},
			handlerLogin() {
				uni.login({
					provider: 'weixin', //使用微信登录
					success: function(loginRes) {
						console.log(JSON.stringify(loginRes));
					}
				});
				uni.switchTab({
					url: '/pages/personalHome/personalHome'
				})
			}
		}
	}
</script>

<style>
	.imageFather {
		display: flex;
		justify-content: center;
	}

	.imageFather image {
		/* width:1%; */
		width: 360rpx;
		height: 360rpx;
		border-radius: 50%;

	}

	.welcome-general {
		display: block;
		padding-top: 60rpx;
	}

	.welcome-general view {
		display: flex;
		padding: 15rpx;
		font-size: large;
		color: #576B95;
		align-items: center;
		justify-items: center;
	}

	.identify {
		padding-top: 50rpx;
	}

	.userinfo button {
		margin-top: 30rpx;
	}

	.userinfo {
		display: flex;
		flex-direction: column;
		align-items: center;
		color: #aaa;
	}

	.userinfo-avatar {
		overflow: hidden;
		width: 128rpx;
		height: 128rpx;
		margin: 20rpx;
		border-radius: 50%;
	}

	.welcome-specific view {
		padding: 30rpx;
		margin: 10rpx;
		font-size: large;
		color: #576B95;
		align-items: center;
		justify-content: center;
		display: flex;
		/*设置显示样式**/
		vertical-align: center;
		/**垂直居中*/
	}
	
	
	.avatar {
		width: 20%;
		height: 20%;
	}
</style>
