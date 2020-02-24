  <template>
    <div class='goods'>
        <good-list-item v-for='item in goods' :goods-item='item' :key='item.title'></good-list-item>
<!-- <h2>{{goods}}</h2> -->
    </div>
  </template>
  <script>
 import GoodListItem from './GoodListItem'
  export default {
      data(){
          return {
            
          }
      },
      props:{
          goods:{
              type:Array,
              default(){
                  return []
              }
          }      
      },
      components:{
        GoodListItem
      },
      methods:{
      }
  }
  </script>
  <style scoped>
.goods{
    display:flex;
    flex-wrap:wrap;
    justify-content: space-around;
    padding:2px;
}

  </style>