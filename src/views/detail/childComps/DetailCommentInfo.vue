<template>
<div v-if='Object.keys(commentInfo).length !== 0' class='comment-info'>
    <div class='info-header'>
        <div class='header-title'>用户评价</div>
        <div class="header-more">
            更多
            <i class='arrow-right'></i>
        </div>
    </div>
    <div class='info-user'>
        <img :src="commentInfo.user.avatar" alt="">
        <span>{{commentInfo.user.uname}}</span>
    </div>
    <div class='info-detail'>
        <p>{{commentInfo.content}}</p>
        <div class="info-other">
            <span class='date'>{{commentInfo.created | showDate}}</span>
            <span>{{commentInfo.style}}</span>
        </div>
        <div class="info-imgs">
            <img :src="item" v-for='(item,index) in  commentInfo.images' :key='index'>
        </div>
    </div>
</div>
</template>
<script>
// 我是傻逼？不在script标签里引用
import { formatDate } from 'common/utils'
	export default {
	name: "DetailCommentInfo",
    props: {
        commentInfo:{
            type:Object,
            default(){

            }
        }
    },
    // 问题：如何将时间戳转成 事件格式化字符串
    // 时间戳：13254345(秒)
    // 1.将时间戳转成Date对象
    // const date = new Date(13254345*1000)
    // 2.将date进行格式化，装成对应的字符串
    // date.getYear() + date.getMonth()+1
    // fmt.format(date,'yyyy-MM-dd hh:mm:ss')
    // y:year 年
    // M：month 月
    // d:day 日
    // h：hours 小时(12小时)/H（24小时）
    // m:minutes 分钟
    // s:seconds 秒钟
    filters:{
       showDate(value){
           const date = new Date(value * 1000)
            return formatDate(date,'yyyy/MM/dd')
       } 
    }
	}
</script>

<style scoped>
.comment-info {
    padding:5px 12px;
    color:#333;
    border-bottom:5px solid #f2f5f8;
}
.info-header {
    height:50px;
    line-height:50px;
    border-bottom:1px solid rgba(0,0,0,.1)
}
.header-title {
    float:left;
    font-size:15px;
}
.header-more {
    float:right;
    margin-right:10px;
    font-size:13px;
}
.info-user {
    padding:10px 0 5px;
}
.info-user span{
    position: relative;
    font-size:15px;
    top:-15px;
    margin-left:10px;
}
.info-user img {
    width:42px;
    height:42px;
    border-radius:50%;
}
.info-detail {
    padding:0 5px 15px;
}
.info-detail p{
    font-size:14px;
    color:#777;
    line-height:1.5;
}
.info-detail .info-other{
    font-size:12px;
    color:#999;
    margin-top:10px;
}

.info-other .date {
    margin-right:8px;
}
.info-imgs {
    margin-top:10px;
}
.info-imgs img {
    width:70px;
    height:70px;
    margin-right:5px;
}
</style>
