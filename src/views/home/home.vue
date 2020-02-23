  <template>
      <div id='home'>
        <nav-bar class='home-nav'>
          <slot slot='center'>购物街</slot>
        </nav-bar>
        <tab-control :titles="['流行','新款','精选']" 
        class='copytab-control' 
        @tabClick='tabClick'
        ref='tabControl1'
        v-show='isTabFixed'
        ></tab-control>
        <scroll class='contentheight' ref='scroll' 
        :probe-type=3  :pull-up-load=true
        @scroll='contentScroll'
        @pullingUp='loadMore'
        >
          <home-swiper :banners='banners' @swiperImageLoad='swiperImageLoad'/>
          <recommend-view :recommends='recommends'></recommend-view>
          <feature-view></feature-view>
          <tab-control :titles="['流行','新款','精选']" 
          class='tab-control' 
          @tabClick='tabClick'
          ref='tabControl2'
          ></tab-control>
          <!-- tab-control 废弃的属性 :class='{fixed:isTabFixed}' -->
          <good-list :goods="showGoods"></good-list>
        </scroll>
        <back-top @click.native='backClick' v-show='isShowBackTop'></back-top>
      </div>
  </template>
  <script>
  import HomeSwiper from './childComps/HomeSwiper'
  import RecommendView from './childComps/RecommendView'
  import FeatureView from './childComps/FeatureView'

  import NavBar from 'components/common/navbar/NavBar'
  import Scroll from 'components/common/scroll/Scroll'
  import TabControl from 'components/content/tabControl/TabControl'
  import GoodList from 'components/content/goods/GoodList'
  import BackTop from 'components/content/backtop/BackTop'
  import {debounce} from 'common/utils'

  import { getHomeMultidata,getHomeGoods } from '@/network/home'
 
  export default {
      name:"Home",
      data(){
          return {
            banners:[],
            recommends:[],
            goods:{
              'pop':{page:0,list:[]},
              'new':{page:0,list:[]},
              'sell':{page:0,list:[]}
            },
            currentType:'pop',
            isShowBackTop:false,
            tabOffsetTop:0,
            isTabFixed:false,
            saveY:0
          }
      },
      computed:{
        showGoods(){
          return this.goods[this.currentType].list
        }
      },
      components:{
        NavBar,
        HomeSwiper,
        RecommendView,
        FeatureView,
        TabControl,
        GoodList,
        Scroll,
        BackTop
      }, 
      destroyed(){
          console.log('distroyed')
      },
      activated(){
          console.log('我是activated'+this.saveY)
        this.$refs.scroll.scrollTo(0,this.saveY,0)
        // this.$refs.scroll.scroll.startY = this.saveY
        this.$refs.scroll.refresh()
      },
      deactivated(){
    this.saveY = this.$refs.scroll.scroll.y  //getScrollY() 
      console.log('我是deactivated'+this.saveY)
      },
       beforeRouteLeave (to, from, next) {
        this.saveY = this.$refs.scroll.scroll.y   //getScrollY()     
      console.log('我是beforeRouteLeave'+this.saveY)
        next()
      },
      created(){
     // 请求多个数据
        this.getHomeMultidata()
        // 2.请求商品数据
        this.getHomeGoods('pop')
        this.getHomeGoods('new')
        this.getHomeGoods('sell')

      },
      mounted(){
        // 防抖动函数就是数据请求快，以至于better-scroll太频繁
        const refresh = debounce(this.$refs.scroll.refresh,200)
        // 监听image加载完成发过来的事件总线,
        // ，每次图片加载就让better-scroll重新计算滚动高度
        this.$bus.$on('itemImageLoad',()=>{
          refresh()
        })

      },

      methods:{
        // 事件监听相关的方法
        tabClick(index){
          switch(index){
            case 0:
              this.currentType = 'pop'
              break
            case 1:
              this.currentType = 'new'
              break
            case 2:
              this.currentType = 'sell'
              break
          }
          this.$refs.tabControl1.currentIndex = index
          this.$refs.tabControl2.currentIndex = index
        },
        // 组件监听单击事件，应该是原生.native
        backClick(){
          // 拿取子模块的方法和数据scroll有scrollTo方法，有第三个参数传入毫秒位过度效果
          this.$refs.scroll.scrollTo(0,0)
        },
        contentScroll(position){
          // 1.判断BackTop是否显示
          this.isShowBackTop = (-position.y) > 1000
          // 2.决定tabControl是否吸顶(position:fixed)
          this.isTabFixed = (-position.y) > this.tabOffsetTop
        },
        loadMore(){
          // 监听上拉加载发出请求
          // console.log('55555')
          this.getHomeGoods(this.currentType)
          // 由于请求回来数据会刷新客滚动的高度，所以的让better-scroll刷新滚动高度
          // this.$refs.scroll.scroll.refresh()
        },
        swiperImageLoad(){
        // 获取tabControld的offsetTop
        // 组件是没有offsetTop属性
        // console.log(this.$refs.tabControl.offsetTop)
        // console.log(this.$refs.tabControl.$el.offsetTop)
        this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
        },
        // 网络请求的方法
        getHomeMultidata(){
        getHomeMultidata().then(res=>{
          // console.log(res.data.banner.list)
          this.banners = res.data.banner.list
          this.recommends = res.data.recommend.list
        })
        },
        getHomeGoods(type){
          // 通过请求数据的类型顺便拿取组件已存页数
          const page = this.goods[type].page + 1 
        getHomeGoods(type,page).then(res=>{
          // console.log(res.data.list)
          this.goods[type].list.push(...res.data.list)
          this.goods[type].page += 1 

          this.$refs.scroll.finishPullUp()
        })
        }
      }
  }
  </script>
  <style scoped>
  /* 方案一 */
  /* #home { */
    /* viewport height 视口高度 */
    /* margin-top:44px; */
    /* height:100vh; */
  /* } */
  /* 方案二 */
  #home{
    /* padding-top:44px; */
    height:100vh;
    position:relative;
  }
  .home-nav {
    background-color:var(--color-tint);
    color:#fff;

    /* position:fixed;
    left:0;
    right:0;
    top:0;
    z-index:9; */
  }
  .copytab-control{
    position:relative;
    z-index: 9
  }
  /* 吸顶效果消失 sticky英文粘贴的意思，因为better-scroll原因*/
  /* .tab-control{
    position:sticky;
    top:44px;
    z-index:9;
  } */

  /* 换一个吸顶方式效果不对,因为better-scroll原因 */
  /* .fixed{
    position:fixed;
    top:44px;
    left:0;
    right:0
  } */


  /* 方案一 */
  /* .contentheight{ */
    /* height:400px; */
    /* 屏幕高度减去tabbar49px加上navbar的44，就是滑动高度 */
    /* height:calc(100% - 93px); */
    /* overflow: hidden; */
  /* } */

  /* 方案二 */
  /* 让外层元素浮动，内层元素相对定位 */
  .contentheight{
    overflow:hidden;
    position:absolute;
    top:44px;
    bottom:49px;
    left:0;
    right:0;
  }

  </style>