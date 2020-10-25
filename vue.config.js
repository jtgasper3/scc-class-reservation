const path = require('path')

module.exports = {
  chainWebpack: config => {
    config.plugin('html').tap(args => {
        args[0].title = "Room 210 Signup";
        return args;
      })
    config.resolve.alias.set(
      'vue$',
      path.resolve(__dirname, 'node_modules/vue/dist/vue.runtime.esm.js')
    )
  }
}
