import {debounce} from './utils'
export const itemListenerMixin = {
  data() {
    return {    
      itemImgListener: null,
      refresh:null     
    }
    },
    mounted() {
        console.log('我是在mixin中打印的')
                // 防抖动函数就是数据请求快，以至于better-scroll太频繁
                this.refresh = debounce(this.$refs.scroll.refresh,200)
                // 监听image加载完成发过来的事件总线,
                // ，每次图片加载就让better-scroll重新计算滚动高度
                // 设置一个变量，存放对应图片加载后该执行的函数，方便离开页面是取消图片加载继续执行这个函数
                this.itemImgListener = () =>{
                  this.refresh()
                }
                this.$bus.$on('itemImageLoad',this.itemImgListener)
    }
}