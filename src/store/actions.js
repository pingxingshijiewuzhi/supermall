import {
    ADD_COUNTER,
    ADD_TO_CART
} from './mutation-type'
export default {
    vuexaddCart(context, payload) {
        let OldProduct = context.state.cartList.find(function (item) {
            return item.iid === payload.iid
        })
        if (OldProduct) {
            context.commit(ADD_COUNTER,OldProduct)
        } else {
            payload.count = 1
            // 这里判断不存在OldProduct，你还传啥OldProduct参数，这bug也犯错？
            // context.commit('addToCart',OldProduct)
            context.commit(ADD_TO_CART,payload)
        }
    }
}