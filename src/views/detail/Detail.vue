  <template>
    <div id='detail'>
        <detail-nav-bar  class='detail-nav'/>
        <scroll class='content' ref='scroll'>
            <detail-swiper :top-images='topImages'></detail-swiper>
            <detail-base-info :goods='goods'></detail-base-info>
            <detail-shop-info :shop='Shop'></detail-shop-info>
            <detail-goods-info :detail-info='detailInfo'  @imageLoadover='imageLoadover'></detail-goods-info>
            <detail-param-info :param-info='paramInfo'></detail-param-info>
        </scroll>
    </div>
  </template>
  <script>
import DetailNavBar from './childComps/DetailNavBar'
import DetailSwiper from './childComps/DetailSwiper'
import DetailBaseInfo from './childComps/DetailBaseInfo'
import DetailShopInfo from './childComps/DetailShopInfo'
import DetailGoodsInfo from './childComps/DetailGoodsInfo'
import DetailParamInfo from './childComps/DetailParamInfo'

import Scroll from 'components/common/scroll/Scroll'

import {getDetail,Goods,Shop,GoodsParam} from 'network/detail'
  export default {
      name:"Detail",
      data(){
          return {
            iid:null,
            topImages:[],
            goods:{},
            Shop:{},
            detailInfo:{},
            paramInfo:{}
          }
      },
      created(){
        //   1.保存获取的iid
        this.iid = this.$route.params.iid
        // 2.根据保存的iid请求数据
        getDetail(this.iid).then(res=>{
            console.log(res)
            const data = res.result
            // 1.获取顶部图片
            this.topImages = data.itemInfo.topImages
            // 2.获取商品信息
            this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services)
            // 3.获取店铺信息
            this.Shop = new Shop(data.shopInfo)
            // 4.保存商品的详情数据
            this.detailInfo = data.detailInfo;
            // 5.获取参数
            this.paramInfo = new GoodsParam(data.itemParams.info,data.itemParams.rule)
        })
      },
      activated(){
        console.log('我如果出现？说明exclude无效')
      },
      components:{
       DetailNavBar,
       DetailSwiper,
       DetailBaseInfo,
       DetailShopInfo,
       Scroll,
       DetailGoodsInfo,
       DetailParamInfo
      },
      methods:{
        //   通过详情页图片加载完成 让插件scroll重新计算滑动高度
          imageLoadover(){
              this.$refs.scroll.refresh()
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