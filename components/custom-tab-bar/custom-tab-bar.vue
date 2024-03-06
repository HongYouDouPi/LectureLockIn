<!-- 自定义TabBar 但是目前失败 --2024/2/24 -->

<template>
	<view class="tabbar">
		<view v-for="(tabbar,index) in bar_list" 
		:key="index"
		class="tab_item" 
		:class="{appear:CurrentPage===tabbar.pagePath}"
		@tap="navigateTo(tabbar.pagePath)">
			<image :src="CurrentPage===tabbar.pagePath?tabbar.selecticonPath:tabbar.iconPath" mode="aspectFit" class="item_img"></image>
			<text class="item_text">{{tabbar.text}}</text>
		</view>
	</view>
</template>

<script>
	export default {
		// 目前还不知道这个name是做什么的
		name:"custom-tab-bar",
		
		data() {
			return {
				
				// 初始的当前页面路径
				CurrentPage:'/pages/index/index',
				
				// tabbar自定义三项
				bar_list:[
					{
						text:'首页',
						pagePath:'/pages/index/index.vue',
						iconPath:'/static/image/icon/首页.png',
						selecticonPath:'/static/image/icon/首页-选中.png'
					},
					{
						text:'我',
						pagePath:'/pages/about/about.vue',
						iconPath:'/static/image/icon/我的.png',
						selecticonPath:'/static/image/icon/我的-选中.png'
					},
					{
						text:'活动',
						pagePath:'/pages/activity/activity.vue',
						iconPath:'/static/image/icon/电影票.png',
						selecticonPath:'/static/image/icon/电影票-选中.png'
					}
				],
				
			};
		},
		
		methods:{
			
			// 跳转页面函数
			// navigateTo(path){
			// 	uni.switchTab({
			// 		url:path,
					
			// 		// 当然跳转完成后需要更新当前页面的值
			// 		success:()=>{
			// 			this.CurrentPage=path;
			// 		}
			// 	});
			// }
			
			
			//emit是吧path的值传给tab-change(父级元素)
			switchTab(path) {  
			    this.$emit('tab-change', path);  
			}
		},
	}
</script>


<style scoped>
	.tabbar{
		display: flex;  
		justify-content: space-around;  
		align-items: center;  
		height: 50px;  
		background-color: #ffffff;  
		position: fixed;  
		bottom: 0;  
		width: 100%;  
		box-shadow: 0px -2px 4px rgba(0, 0, 0, 0.1);  
		z-index: 999; /* 确保 tabBar 在其他内容之上 */  
		
		.tab_item{
			display: flex;  
			flex-direction: column;  
			align-items: center;  
			justify-content: center;  
		}
		
	}
</style>