  <template>
      <div class='cart'>
        <!-- 导航 -->
        <nav-bar class='nav-bar'>
          <slot slot='center'>
            <!-- 购物车({{$store.getters.cartLength}}) -->
            购物车({{cartLength}})
          </slot>
        </nav-bar>
        <!-- 商品列表 -->
        <cart-list></cart-list>
        <cart-bottom-bar></cart-bottom-bar>
      </div>
  </template>
  <script>
  import NavBar from 'components/common/navbar/NavBar'

  import CartList from "./childComps/CartList"
  import CartBottomBar from './childComps/CartBottomBar'
  import {mapGetters} from 'vuex'
  export default {
    name:"shopcart",
      data(){
          return {
            
          }
      },
      computed:{
      ...mapGetters(['cartLength'])
      },
      components:{
        NavBar,
        CartList,
        CartBottomBar
      }
  }
  </script>
  <style scoped>
  .cart {
    height:100vh;
  }
  .nav-bar{
    background-color:var(--color-tint);
    color:#fff;
    /* font-weight:bold; */
  }
  </style>