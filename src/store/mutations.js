import {
    ADD_COUNTER,
    ADD_TO_CART
} from './mutation-type'

export default {
           // addCart(state, payload) {
            // state.cartList.push(payload)
            // payload添加新商品

            // 判断在state.cartList是否找到该商品曾经存在过，用一个变量来判断
            // let OldProduct = null 
            // for (let item of state.cartList) {
            //     if (item.iid === payload.iid) {
            //         OldProduct = item
            //     }
            // }

            // 数组查找方法find,返回一个符合条件的值
            // let OldProduct = state.cartList.find(function (item) {
            //     return item.iid === payload.iid
            // })

            // 对是否已经存在或者不存在做出不同的添加操作
        //     if (OldProduct) {
        //         OldProduct.count += 1
        //     } else {
        //         payload.count = 1
        //         state.cartList.push(payload)
        //     }

        // }
        // 重构addCart，因为在提交里面有两步逻辑，分开dev-tools才能察觉到
        [ADD_COUNTER](state, payload) {
            payload.count++
        },
        [ADD_TO_CART](state, payload) {
            state.cartList.push(payload)
        }
}