import { debounce } from './utils'
import BackTop from 'components/content/backtop/BackTop'
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

export const backTopMixin = {
  data() {
    return {
      isShowBackTop:false,
    }
  },
  components: {
    BackTop
  },
  methods: {
    // 由于这是detail和hone混入，但是两个人监听滑动逻辑不一样，就不能在这抽取
    // contentScroll(position){},
    backClick(){
      // 拿取子模块的方法和数据scroll有scrollTo方法，有第三个参数传入毫秒位过度效果
      this.$refs.scroll.scrollTo(0,0)
    }
  }
}