// 项目发布阶段用到插件
// const prodPlugins = []
// if (process.env.NODE_ENV === 'production') {
//   prodPlugins.push('transform-remove-console')
// }

module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],

  // plugins: [
  
  //   "transform-remove-console",
// 发布产品时的数组,取代上面一行代码
// ...prodPlugins

  // [
  //   'component',
  // {
  //   libraryName: 'element-ui',
  //   styleLibraryName:'theme-chalk'
  //   }
  // ],
  // ]
}
