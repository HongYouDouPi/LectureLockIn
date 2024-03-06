<template>  
  <view class="custom-navbar">  
    <view class="navbar-content">  
      <text class="navbar-item" @click="navigateToHome">首页</text>  
      <text class="navbar-item" @click="navigateToAbout">关于</text>  
      <!-- 添加更多导航项 -->  
    </view>  
  </view>  
</template>  
  
<script>  
export default {  
  methods: {  
    navigateToHome() {  
      uni.switchTab({  
        url: '/pages/index/index'  
      });  
    },  
    navigateToAbout() {  
      uni.navigateTo({  
        url: '/pages/about/about'  
      });  
    },  
    // 添加更多导航方法  
  }  
}  
</script>  
  
<style scoped>  
.custom-navbar {  
  display: flex;  
  justify-content: space-between;  
  align-items: center;  
  height: 44px;  
  background-color: #fff;  
  color: #000;  
  position: fixed;  
  top: 0;  
  left: 0;  
  right: 0;  
  z-index: 999;  
}  
  
.navbar-content {  
  display: flex;  
  justify-content: center;  
  align-items: center;  
  height: 100%;  
}  
  
.navbar-item {  
  padding: 0 10px;  
  font-size: 16px;  
}  
</style>