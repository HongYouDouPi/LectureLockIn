<template>
	<view class="whole">
		<!-- 顶栏搜索 -->
		<view class="find">
			<!-- 搜索框 -->
			<view class="text">
				<image :src="search_img" mode="aspectFit" class="find_pic"></image>
				<!-- 输入框 /还要加以一个事件绑定-输入内容传到后端--> 
				<input placeholder="搜你想搜，做我享做！"></input>
			</view>
			<!-- 搜索控件 -->
			<view class="search">
				<text>搜索</text>
			</view>
		</view>
		
		<!-- 中部内容 -->
		<view class="content">
			<!-- 介绍栏 -->
			<view class="filter">
				<view class="filter_expired">
					<text>进行中</text>
					<text>已结束</text>
				</view>
				<view class="filter_button">
					<image :src="shift_img" mode="aspectFit" class="filter_img"></image>
					<text>筛选</text>
				</view>
			</view>
			
			<!-- 每条活动 -->
			<scroll-view scroll-y="true" @click="navigateToDetail">
				<!-- :style="calculate_scrollHeight"加在scroll里面的 函数是计算滑动区域的高度 但是好像每个控件在每个机型上会出现不一样的高度 不好实现统一 -->
				<view class="content_item" v-for="(lecture,index) in lecture" :key="index">
					<!-- 图片 -->
					<view class="item_pic">
						<image :src="lecture.pic" mode="aspectFill" class="item_image"></image>
					</view>
					<!-- 具体内容 -->
					<view class="content_text">
						<!-- 文字栏 -->
						<view class="basic">
							<!-- 讲座名 -->
							<text class="text_name">{{lecture.name}}</text>
							<!-- 讲座简介 -->
							<text class="text_brief">{{lecture.brief}}</text>
							<!-- 具体时间地点 -->
							<view class="time_location">
								<!-- 时间 -->
								<view class="time">
									<image :src="time_img" mode="aspectFit" class="text_img"></image>
									<text>{{lecture.time}}</text>
								</view>
								<!-- 地点 -->
								<view class="location_visitor">
									<view class="location">
										<image :src="location_img" mode="aspectFit" class="text_img"></image>
										<text>{{lecture.location}}</text>								
									</view>
									<!-- 浏览数 -->
									<view class="visitor">
										<image :src="visit_img" mode="" class="visitor_img"></image>
										<text>{{lecture.visitor}}</text>
									</view>
								</view>
							</view>
							
						</view>
						<!-- 预约栏 -->
						<view class="content_tagger">
							<view class="tagger">
								标签
							</view>
							<view class="add">
								<text class="text_add">预约</text>
							</view>
						</view>
					</view>
					
				</view>
				
			</scroll-view>			
		</view>
				
		<!-- 滑动到顶部 -->
		<view class="totop" v-if="showToTop">
			<image src="/static/image/icon/顶部.png" mode="aspectFit" @click="slideToTop"></image>
		</view>
	</view>
</template>



<script>
	export default {
		// data里面只能有return的返回值，是用来记录有哪些数据可以被上面调用的 类似于js
		data() {
			
			return {
				// 屏幕宽高
				WindowHeight:0,
				WindowWidth:0,
					//滚动栏高度 动态变化
				scroll_height:0,
				
					//显示回到顶部
				showToTop:false,
								
				//一些图标
				search_img:'https://www.freeimg.cn/i/2024/02/07/65c2f021a2f3f.png',
				shift_img:'https://www.freeimg.cn/i/2024/02/07/65c2f021a1f61.png',
				visit_img:'https://www.freeimg.cn/i/2024/02/07/65c2f021a265e.png',
				time_img:'https://www.freeimg.cn/i/2024/02/07/65c2f021a28a5.png',
				location_img:'https://www.freeimg.cn/i/2024/02/07/65c2f021a2b30.png',
				// 讲座信息
					// 用数组存放中括号表示包含所有数据 大括号表示一个对像
				lecture:[
					{id:1,name:'宣讲会',time:'2024/2/10',brief:"快来看看准研究生们都具备哪些品质吧！(不超过25个字)",pic:'https://www.freeimg.cn/i/2024/01/31/65b9dea2d7399.jpg',location:'理科南',visitor:'82',way:'线上'},
					
					{id:2,name:'茶话会',time:'2024/2/11',brief:"有你up的茶品嘛？",pic:'https://www.freeimg.cn/i/2024/01/31/65b9de9f76e3b.jpg',location:'风雨走廊',visitor:'12',way:'线下'},
					
					{id:3,name:'品牌会',time:'2024/2/12',brief:"这些品牌居然是黑榜！",pic:'https://www.freeimg.cn/i/2024/01/31/65b9de9e09908.jpg',location:'北区篮球场',visitor:'10222',way:'线下'},
					
					{id:4,name:'研讨会',time:'2024/2/13',brief:"俗话说:俗话说的好！",pic:'https://www.freeimg.cn/i/2024/01/31/65b9de9bc4c2d.jpg',location:'理科北',visitor:'112',way:'线上'},
					{id:5,name:'茶话会',time:'2024/2/11',brief:"有你up的茶品嘛？",pic:'https://www.freeimg.cn/i/2024/01/31/65b9de9d992d7.jpg',location:'文俊楼',visitor:'122',way:'线下'},
					
					{id:6,name:'品牌会',time:'2024/2/12',brief:"这些品牌居然是黑榜！",pic:'https://www.freeimg.cn/i/2024/01/31/65b9de9c64d6f.jpg',location:'田径场',visitor:'123',way:'线下'}
				]
			};
		},
						
		computed:{
			
			// 计算scroll高度
			calculate_scrollHeight(){
				return {
					height:(this.WindowHeight-110)*2+'rpx',
				};
			},
		},
		
		//一些方法
		methods:{
			// 回到顶部
			slideToTop(){
				uni.pageScrollTo({
					scrollTop:0,
					duration:260,
				})
			},
			
			//获取页面滑动位置 当 是否显示回到顶部的图标
			onPageScroll(e){
				//当滑动高度大于100时返回ture给showToTop
				this.showToTop=e.scrollTop>100;
				
				// console.log(this.showToTop)
			},
			
			// 跳转到讲座详情
			navigateToDetail(){
				uni.navigateTo({
					url:'/pages/lectureDetail/lectureDetail',
				})
			}
		},
		
		// onload生命周期函数只会被调用一次
		onLoad(){		
			
			// 获得屏幕高度 宽度
			uni.getSystemInfo({
				success:(res)=>{
					this.WindowHeight=res.windowHeight;
					this.WindowWidth=res.windowWidth;
					console.log('页面高度'+this.WindowHeight,'页面宽度'+this.WindowWidth);
				}
			});			
		},
		
		//onready 生命周期函数 当页面已经渲染的差不多的时候 也就是图片 网页都快加载好了 这个函数就出现(可获取加载完的窗口等) 且只进行一次
		onReady() {
			// uni.onPageScroll(this.onPageScroll);
		},
		
		onUnload() {
			// uni.offPageScroll(this.onPageScroll);
		}
	}
</script>



<style lang="scss">
	
	// 这是整个框和背景
	.whole{
		background-color: #ececec;
	}
	
	// 这是搜索最大的框架
	.find{
		height: 120rpx;
		width: 750rpx;
		// background-color: #ff7e96;
		
		display: flex;
		justify-content: space-between;
		// 使view-text实现垂直居中
		align-items: center;
		flex-direction: row ;
		background-color: #AAAAFF;
		// flex-direction是为了让find里的所有view分行显示 不加的话由于设置了display：flex 这样他find里面所有的元素都只能弹性布局显示
		
		//这个text要重新命名一下
		.text{
			width: 600rpx;
			height: 75rpx;
			//圆角显示
			border-radius: 30rpx;
			margin-left: 30rpx;
			background-color: #ffffff;
			
			display: flex;
			justify-content: flex-start;
			align-items: center;
		}		
		.search{
			width: 100rpx;
			font-size: 40rpx;
			color: #ffffff;
			margin-left: 10rpx;
			
			display: flex;
			align-items: center;
		}
		
		.find_pic{
			width: 60rpx;
			height: 60rpx;
			margin: 0 28rpx;
		}
		
	}
	
	// 筛选栏
	.filter{
		height: 80rpx;
		width: 100%;
		// background-color: #AAAAFF;
		box-shadow:  0 10rpx 10rpx #CCCCCC;
		display: flex;
		// justify-content: end;
		align-items: center;
	
		.filter_expired{
			height: 80rpx;
			width: 630rpx;
			font-size: 30rpx;
			font-weight: 600;
			
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: space-around;
			
			
		}
		.filter_button{
			height: 80rpx;
			width: 120rpx;
			font-size: 28rpx;
			font-weight:lighter;
			color: #2235a6;
			margin: 0rpx;
			
			display: flex;
			align-items: center;
			justify-content: center;
			.filter_img{
				height: 50rpx;
				width: 50rpx;
				
				
			}
		}
		
		
	}
	
	// 活动栏
	.content{
		
		//每条活动
		.content_item{
			// width: 710rpx;
			height: 220rpx;
			border-radius: 20rpx;
			margin: 16rpx 20rpx;
			background-color: #ffffff;
			
			display: flex;
			justify-content: center;
			align-items: flex-start;
			// 讲座略缩图
			.item_pic{
				width: 220rpx;
				height: 220rpx;
				// margin: 10rpx 10rpx;
				
				display: flex;
				align-items: center;
				justify-content: center;
				.item_image{
					width: 200rpx;
					height: 180rpx;
					border-radius: 25rpx;
				}
			}
			//讲座基本信息
			.content_text{
				width: 490rpx;
				height: 220rpx;
				display: flex;
				// 详细基本信息
				.basic{
					width: 390rpx;
					height: 200rpx;
					margin: 10rpx 10rpx;
					display: flex;
					justify-content: flex-start;
					flex-direction: column;
					.text_name{
						height: 54rpx;
						font-size: 40rpx;
						font-weight: bold;
					}
					// 简介样式
					
					.text_brief{
						height: 70rpx;
						font-size: 26rpx;
						overflow: hidden;
						text-overflow: ellipsis;
					}
					// 时间位置两行样式
					.time_location{
						height: 76rpx;
						.time{
							height: 38rpx;
							font-size: 24rpx;
							color: #999999 ;
							
							display: flex;
							align-items: center;
							
						}
						.location_visitor{
							height: 38rpx;
							font-size: 24rpx;
							// white-space: nowrap;
							color: #999999 ;
							
							display: flex;
							justify-content: space-between;
							// align-items: center;
							.location{
								display: flex;
								align-items: center;
							}
							.visitor{
								height: 38rpx;
								width:110rpx;
								display: flex;
								// 横向布局垂直居中
								flex-direction: row;
								align-items: center;
								// 向左靠
								justify-content: flex-start;
								.visitor_img{
									height: 28rpx;
									width: 38rpx;
									margin-right: 4rpx;
								}
							}
						}
						// 时间和位置图标
						.text_img{
							width: 32rpx;
							height: 32rpx;
							margin-right: 10rpx;
						}
					}
					
					
				}
				//标签栏 预约栏
				.content_tagger{
					width: 80rpx;
					height: 200rpx;
					margin: 10rpx 0rpx;
					font-size: 28rpx;
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: space-between;
					.tagger{
					}
					.add{
						width: 80rpx;
						height: 50rpx;
						border-bottom-left-radius: 12rpx;
						border-top-left-radius: 12rpx;
						background-color: #c84040;
						margin-bottom: 12rpx;
						
						display: flex;
						flex-direction: column;
						align-items: center;
						justify-content: center;
						.text_add{
							color: #ffffff;
							margin-left: 5rpx;
						}
					}
				}
				
				
			}
		}
		
	}
	
	//回到顶部
	.totop{
		height: 50rpx;
		width: 50rpx;
		
		position: fixed;
		bottom: 200rpx;
		right: 40rpx;
		
		image{
			height: 50rpx;
			width: 50rpx;
		}
	}
</style>
