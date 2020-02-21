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
    }
}