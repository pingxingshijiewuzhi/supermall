module.exports = {
    configureWebpack: {
        resolve: {
            alias: {
                // "@":"src"
                "assets":"@/assets",
                "network":"@/network",
                "common":"@/common",
                "components":"@/components",
                "views":"@/views"
            }
        }
    },
    // 为开发模式与发布模式指定不同的打包入口
    // 开发模式入口文件：scr/ main - dev.js
    // 发布模式入口文件:src/main-prod.js
    // chainWebpack: config => { 
    //     config.when(process.env.NODE_ENV === 'production', config => {
    //         config.entry('app').clear().add('./src/main-prod.js')
    //     })
    //     config.when(process.env.NODE_ENV === 'development', config => {
    //         config.entry('app').clear().add('./src/main-dev.js')
    //     })
    // }
}