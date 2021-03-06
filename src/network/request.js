import axios from 'axios'

export function request(config) {
   
    const instance = axios.create({
        // baseURL:"http://106.54.54.237:8000/api/wh" ,
        timeout: 1000
    })
        // 拦截请求信息
        instance.interceptors.request.use(
            config => {
                // console.log(config)
                return config
            }, err => {
                console.log(err)
            })
        // 拦截返回信息
        instance.interceptors.response.use(res => {
            // console.log(res.data)
            return res.data
        }, err => {
            console.log(err)
        })

        return instance(config)

    
}