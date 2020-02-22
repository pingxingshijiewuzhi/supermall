  <template>
         <swiper>
          <swiper-item v-for='item in banners' :key='item.title'>
            <a :href="item.link">
              <img :src="item.image" alt="" @load='imageLoad'>
            </a>
          </swiper-item>
        </swiper>
  </template>
  <script>
 import {Swiper,SwiperItem} from 'components/common/swiper'
  export default {
      data(){
          return {
            isLoad:false
          }
      },
      props:{
        banners:{
            type:Array,
            default(){
                return []
            }
        }
      },
      components:{
        Swiper,
        SwiperItem
      },
      methods:{
        imageLoad(){
          // 由于只需要发送一次，所以用一个变量判断,
          // 一旦发送一次，就把变量改了，就再也不会进入判断执行方法了
          if(!this.isLoad){
            this.$emit('swiperImageLoad')
            this.isLoad = true
          }
        }
      }

  }
  </script>
  <style scoped>

  </style>