<template>
  <div id="app" class='wrapper'>
    <keep-alive exclude="Detail"> 
        <router-view></router-view>
    </keep-alive>
    <tab-main></tab-main>
  </div>
</template>

<script>

import TabMain from 'components/content/mainTabbar/TabMain'
export default {
  name: 'App',
  components: {
 TabMain
  }
}
</script>

<style>
@import 'assets/css/base.css';
</style>
