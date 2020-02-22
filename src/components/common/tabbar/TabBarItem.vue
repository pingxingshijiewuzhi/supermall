  <template>
      <div class='tab-bar-item' @click='itemClick'>
        <div  v-if='!isActive'>
              <slot name='item-icon'></slot>
        </div>
        <div v-else>
              <slot  name='item-icon-active'></slot>
        </div>
          <!-- 插槽这里最终被替换，所以这里的属性就没有用了 -->
          <!-- <div :class={active:isActive}> -->
              <!-- 通过计算属性来实现复杂的逻辑 -->
          <div :style='styleActive'>
                <slot name='item-text' ></slot>
          </div> 
      </div>
  </template>
  <script>
  export default {
      data(){
          return {
            //   isActive:true
          }
      },
      computed:{
        //   四个一样的slot展示，单机事件，承担路由跳转，
        //   我只要判断单机的路径和我组件的路径是否一致来决定组件那些内容渲染
        //   那些内容不渲染
          isActive(){
            //   home -> item1(/home) = true
            //   category -> item2(/category) = false
            //   shopcart -> item3(/shopcart) = flase
            //   profile -> item4(/profile) = false
              return this.$route.path.indexOf(this.path) !== -1
          },
          styleActive(){
              return  this.isActive? {color:this.activeColor} : {}
          }
      },
      props:{
          path:String,
        //   接受传过来的颜色
          activeColor:{
            type:String,
            default:'pink'
          }
      },
      methods:{
          itemClick(){
              // console.log(this.path)
            //   this.$router.push(this.path)
              this.$router.replace(this.path)
          }
      }
  }
  </script>
  <style scoped>
  .tab-bar-item{
  flex:1;
  text-align:center;
  height:49px;
}
.tab-bar-item img{
    height:24px;
    width:24px;
    margin-top:3px;
    vertical-align: middle;
}
/* .active{
    color:red
} */
  </style>