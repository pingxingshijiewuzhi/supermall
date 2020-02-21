<template>
  <div>
    <router-view></router-view>
    <tab-bar>  
      <tab-bar-item path='/home' activeColor='blue'>
              <img src="~assets/img/tabbar/home.png" alt="" slot='item-icon'>
              <img src="~assets/img/tabbar/home_active.png" alt="" slot='item-icon-active'>
              <div slot='item-text'>首页</div> 
      </tab-bar-item>
      <tab-bar-item path='/category' activeColor='blue'>
              <img src="~assets/img/tabbar/category.png" alt="" slot='item-icon'>
              <img src="~assets/img/tabbar/category_active.png" alt="" slot='item-icon-active'>
              <div slot='item-text'>分类</div> 
      </tab-bar-item>
      <tab-bar-item path='/shopcart' activeColor=''>
              <img src="~assets/img/tabbar/shopcart.png" alt="" slot='item-icon'>
              <img src="~assets/img/tabbar/shopcart_active.png" alt="" slot='item-icon-active'>
              <div slot='item-text'>购物车</div> 
      </tab-bar-item>
      <tab-bar-item path='/profile' activeColor=''>
              <img src="~assets/img/tabbar/profile.png" alt="" slot='item-icon'>
              <img src="~assets/img/tabbar/profile_active.png" alt="" slot='item-icon-active'>
              <div slot='item-text'>我的</div> 
      </tab-bar-item>

    </tab-bar>
  </div>
</template>

<script>
import TabBar from 'components/common/tabbar/TabBar'
import TabBarItem from 'components/common/tabbar/TabBarItem'
export default {
  components:{
    TabBar,
    TabBarItem
  }
}
</script>

<style>
</style>
