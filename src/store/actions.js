import {
    ADD_COUNTER,
    ADD_TO_CART
} from './mutation-type'
export default {
    vuexaddCart(context, payload) {
        return new Promise((resolve, reject) => {
            // 1.查找给商品是否已经存在
            let OldProduct = context.state.cartList.find(function (item) {
                return item.iid === payload.iid
            })
            // 2.对于存不存在做出不同的处理
            if (OldProduct) {
                context.commit(ADD_COUNTER, OldProduct)
                resolve('当前的商品数量加1')
            } else {
                payload.count = 1
                // 这里判断不存在OldProduct，你还传啥OldProduct参数，这bug也犯错？
                // context.commit('addToCart',OldProduct)
                context.commit(ADD_TO_CART, payload)
                resolve('添加新商品')
            }
            
        })
    }
}