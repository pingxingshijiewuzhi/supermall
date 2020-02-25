  <template>
    <div id='detail'>
        <detail-nav-bar  class='detail-nav'  @titleClick='titleClick' ref='nav'></detail-nav-bar>
        <scroll class='content'
        ref='scroll'
        @scroll='contentScroll'
        :probe-type='3'>
            <detail-swiper :top-images='topImages'></detail-swiper>
            <detail-base-info :goods='goods'></detail-base-info>
            <detail-shop-info :shop='Shop'></detail-shop-info>
            <detail-goods-info :detail-info='detailInfo'  @imageLoadover='imageLoadover'></detail-goods-info>
            <detail-param-info :param-info='paramInfo' ref='params'></detail-param-info>
            <detail-comment-info :comment-info='commentInfo' ref='comment'></detail-comment-info>
            <good-list :goods="recommends" ref='recommend'></good-list>
        </scroll>
        <detail-bottom-bar @addCart='addToCart'/>
        <back-top @click.native='backClick' v-show='isShowBackTop'></back-top>
    </div>
  </template>
  <script>
import DetailNavBar from './childComps/DetailNavBar'
import DetailSwiper from './childComps/DetailSwiper'
import DetailBaseInfo from './childComps/DetailBaseInfo'
import DetailShopInfo from './childComps/DetailShopInfo'
import DetailGoodsInfo from './childComps/DetailGoodsInfo'
import DetailParamInfo from './childComps/DetailParamInfo'
import DetailCommentInfo from './childComps/DetailCommentInfo'
import DetailBottomBar from './childComps/DetailBottomBar'
 import {debounce} from 'common/utils'
 import {itemListenerMixin,backTopMixin} from 'common/mixin'


import Scroll from 'components/common/scroll/Scroll'
import GoodList from 'components/content/goods/GoodList'

import {getDetail,Goods,Shop,GoodsParam,getRecommend} from 'network/detail'
  export default {
      name:"Detail",
      data(){
          return {
            iid:null,
            topImages:[],
            goods:{},
            Shop:{},
            detailInfo:{},
            paramInfo:{},
            commentInfo:{},
            recommends:[],
            themeTopYs:[],
            getThemeTopY:null,
            currentIndex:0
          }
      },
      created(){
        //   1.保存获取的iid
        this.iid = this.$route.params.iid
        // 2.根据保存的iid请求数据
        getDetail(this.iid).then(res=>{
            // console.log(res)
            const data = res.result
            // 1.获取顶部图片
            this.topImages = data.itemInfo.topImages
            // 2.获取商品信息
            this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services)
            // 3.获取店铺信息
            this.Shop = new Shop(data.shopInfo)
            // 4.保存商品的详情数据
            this.detailInfo = data.detailInfo;
            // 5.获取参数的信息
            this.paramInfo = new GoodsParam(data.itemParams.info,data.itemParams.rule)

            // 6.获取评论的信息
            if(data.rate.cRate !== 0){
              this.commentInfo = data.rate.list[0]
            }

        this.$nextTick(()=>{
          // 根据最新的数据，对应的DOM是已经被渲染出来
          // 但是图片依然是没有加载完(目前获取到的offsetTop不包含其中的图片)
          // offsetTop值不对的时候，一般是图片没及时加载完
        // this.themeTopYs.push(0)
        // this.themeTopYs.push(this.$refs.params.$el.offsetTop)
        // this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
        // this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
        // console.log(this.themeTopYs)
        })
        })
        // 3.请求推荐数据
        getRecommend().then(res => {
          this.recommends = res.data.list
        })

        // 4.给getThemeTopY赋值(对this.getThemeTopYs赋值的操作进行防抖)
        this.getThemeTopY = debounce(()=>{
             this.themeTopYs.push(0)
            this.themeTopYs.push(this.$refs.params.$el.offsetTop)
            this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
            this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
            this.themeTopYs.push(Number.MAX_VALUE)

            console.log(this.themeTopYs)
        },100)
      },
      activated(){
        console.log('我如果出现？说明exclude无效')
      },
      destroyed(){
        this.$bus.$off('itemImageLoad',this.itemImgListener)
      },
      components:{
       DetailNavBar,
       DetailSwiper,
       DetailBaseInfo,
       DetailShopInfo,
       Scroll,
       DetailGoodsInfo,
       DetailParamInfo,
       DetailCommentInfo,
       GoodList,
       DetailBottomBar
      },
      mixins:[itemListenerMixin,backTopMixin],
      mounted(){
        // console.log('我是组件内部打印的mounted')
      },
      updated(){
        // 拿到请求的数据，但是渲染更新会频繁，所以会打印几次
        // this.themeTopYs.push(0)
        // this.themeTopYs.push(this.$refs.params.$el.offsetTop)
        // this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
        // this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
        // console.log(this.themeTopYs)
      },
      methods:{
        //   通过详情页图片加载完成 让插件scroll重新计算滑动高度
          imageLoadover(){
              // this.$refs.scroll.refresh()
              // 因为在mixin中定义了this.$refs.scroll.refresh防抖，这里直接拿来用
              this.refresh()
              // 这里是在created里防抖调用
              this.getThemeTopY()
            // 老师吧这边注释，重新有定个防抖，我认为this.refresh()已经防抖了，
            // 几乎就是只调用一次，顺序执行，下面也该只执行一次
            // this.themeTopYs.push(0)
            // this.themeTopYs.push(this.$refs.params.$el.offsetTop)
            // this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
            // this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
            // console.log(this.themeTopYs)
          },
          titleClick(index){
            this.$refs.scroll.scrollTo(0,-this.themeTopYs[index],100)
          },
          contentScroll(position){
            this.isShowBackTop = (-position.y) > 1000
            // 1.获取y值
            const positionY = -position.y
            // 2.positionY和主题中值进行对比
            // [0,7938,9152,64655]
            // positionY 在 0和 7938之间，index = 0
            // positionY 在 ==7938和 9152之间，index = 1
            // positionY 在 ==9152和 64655之间，index = 2
            // positionY 大于等于64655，index = 3
            // 方法一(不行)：
            // for(let i in this.themeTopYs.length){
            //   这里有一个bug，就是i是string类型，i+1不行
            // }
            // 方法二：（行）用原始的for循环
            let length = this.themeTopYs.length
            // for(let i=0;i<length;i++){
              // if( this.currentIndex !== i && ((i<length-1 && positionY>=this.themeTopYs[i] && positionY< this.themeTopYs[i+1])
              // || (i===length-1 && positionY>=this.themeTopYs[i])) ){
              //   this.currentIndex = i;
              //   // console.log(this.currentIndex) 将滑动值对比结束吧正确下标返回detailNavBar数据中
              //   this.$refs.nav.currentIndex = this.currentIndex
              // }
              // }

              // 在this.themeTopYs数组中加入一个非常大的数字Number.MAX_VALUE，省的最后一个下标单独判断只大于64655
              // console.log(Number.MAX_VALUE)
              for(let i=0;i<length-1;i++){
                if(this.currentIndex !== i && (positionY>=this.themeTopYs[i] && positionY< this.themeTopYs[i+1])){
                  this.currentIndex = i;
                  this.$refs.nav.currentIndex = this.currentIndex
                }

              }
           


          },
          addToCart(){
            // 1.获取要展示购物车的商品信息
            const product = {}
            product.image = this.topImages[0]
            product.title = this.goods.title
            product.desc = this.goods.desc
            product.price = this.goods.realPrice
            product.iid = this.iid
          // 2.将商品添加到购物车里
          // this.$store.commit('addCart',product)
            console.log(product)
          // 重构
          this.$store.dispatch('vuexaddCart',product)

          }
      },

  }
  </script>
  <style scoped>

#detail {
    position:relative;
    z-index:9;
    background-color:#fff; 
    height: 100vh;
}
.detail-nav{
    position:relative;
    z-index:9;
    background-color: #fff;
}
.content {
    height:calc(100% - 44px);
}
  </style>