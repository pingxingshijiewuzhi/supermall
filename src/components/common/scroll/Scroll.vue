  <template>
  <!-- ref绑定在组件上，获取的就是组件 -->
  <!-- ref绑定在标签元素上，获取的就是标签 -->
    <div class='wrapper' ref='wrapper'>
        <div class='content'>
            <slot></slot>
        </div>
    </div>
  </template>
  <script>
import BScroll from 'better-scroll'
  export default {
      data(){
          return {
            scroll:null
          }
      },
      props:{
        probeType:{
            type:Number,
            default:0
        },
        pullUpLoad:{
            type:Boolean,
            default:false
        }
      },
      mounted(){
        //   创建BScroll对象
            this.scroll = new BScroll(this.$refs.wrapper,{
                click:true,
                probeType:this.probeType,
                pullUpLoad:this.pullUpLoad
            })
        // 监听滚动的的位置
        this.scroll.on('scroll',(position)=>{
            // console.log(position)
            this.$emit('scroll',position)
        })
        // 监听scroll滚动到底部
        this.scroll.on('pullingUp',()=>{
            this.$emit('pullingUp')
        })
      },
      methods:{
          scrollTo(x,y,time=300){
             this.scroll && this.scroll.scrollTo(x,y,time)
          },
          finishPullUp(){
              this.scroll && this.scroll.finishPullUp()
          },
          refresh(){
              console.log('=====')
              this.scroll && this.scroll.refresh()
          }
      }
  }
  </script>
  <style scoped>


  </style>