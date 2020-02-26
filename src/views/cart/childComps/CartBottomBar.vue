<template>
<div class='bottom-bar'>
    <div class='check-all'>
        <check-button 
         class='check-btn'
         :is-checked='isSelectAll'
         @click.native='checkClick' ></check-button>    
        <span>全选</span>
    </div>
    <div class='price'>
        合计:{{totlePrice}}
    </div>
    <div class='calculator' @click='calculatorClick'>
        去计算：({{checkLength}})
    </div>
</div>
</template>

<script>
import CheckButton from 'components/content/checkButton/CheckButton'
import {mapGetters} from 'vuex'
	export default {
		name: "CartBottomBar",
    props: {

    },
      components:{
        CheckButton
    },
    computed:{
        ...mapGetters(['cartList']),
        totlePrice(){
            return '¥' + this.cartList.filter(item=>{
                return item.checked
            }).reduce((preValue,item)=>{
                return preValue + (item.price * item.count)
            },0)
        },
        checkLength(){
            console.log(this.cartList)
            console.log(this.cartList.filter(item=>item.checked).length)
            return this.cartList.filter(item=>item.checked).length
        },
        isSelectAll(){
            console.log(this.cartList)
            if(this.cartList.length === 0 ) return false
            // 查找cartList里是否有全部存在一个没有选中的，有一个没选中，即全选不显示
            return  !(this.cartList.filter(item=>!item.checked).length)
            // return  !(this.cartList.find(item=>!item.checked).length)

            // 原始遍历
            //     let exist = false
            //     for (let i of this.cartList){
            //         if(i.checked){
            //             exist = false
            //             return exist
            //         }
            //     }
            //     return true
        }
    },
    methods:{
        checkClick(){
            console.log('888888')
            if(this.isSelectAll){
                this.cartList.forEach(item=>item.checked =false)
            }else  {
                this.cartList.forEach(item=>item.checked =true)
            }
        },
        calculatorClick(){
            if(!this.isSelectAll){
                this.$toast.show('请选择商品',2000)
            }
        }
    }
	}
</script>

<style scoped>
.bottom-bar{
    display:flex;
    position:relative;

    height:40px;
    line-height: 40px;
    background-color: #eee;
    font-size:14px;
}
.check-all {
    display:flex;
    /* justify-content: center; */
    align-items:center;
    margin-left:10px;
    width:60px;
}
.check-btn {
    width:20px;
    height:20px;
    line-height:20px;
    margin-right:5px;
}
.price{
      margin-left:20px;
      flex:1
  }
.calculator{
width:90px;
background:red;
text-align:center;
color:white;
}
</style>
