"use strict"
const path = require("path")
const bundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
function resolve(dir) {
  return path.join(__dirname, dir)
}

const name = 'k12-cp' // page title
// If your port is set to 80,
// use administrator privileges to execute the command line.
// For example, Mac: sudo npm run
const port = 80 // dev port
// All configuration item explanations can be find in https://cli.vuejs.org/config/
module.exports = {
  /**
   * You will need to set publicPath if you plan to deploy your site under a sub path,
   * for example GitHub Pages. If you plan to deploy your site to https://foo.github.io/bar/,
   * then publicPath should be set to "/bar/".
   * In most cases please use '/' !!!
   * Detail: https://cli.vuejs.org/config/#publicpath
   */
  publicPath: process.env.NODE_ENV === "development" ? '/' : "/k12cp/",
  outputDir: "dist",
  assetsDir: "static",
  lintOnSave: process.env.NODE_ENV === "development", // 是否在保存的时候检查
  productionSourceMap: false, // 生产环境是否生成 sourceMap 文件
  runtimeCompiler: true, // 是否使用包含运行时编译器的 Vue 构建版本
  parallel: require("os").cpus().length > 1,
  devServer: {
    port: port,
    open: false,
    // 新版的webpack-dev-server出于安全考虑，默认检查hostname，如果hostname不是配置内的就不能访问。这样有2中方法，一种是设置跳过host检查，一种是直接host设置成你的地址。
    disableHostCheck: true,
    overlay: {
      warnings: false,
      errors: true
    },
    proxy: {
      [process.env.VUE_APP_BASE_API]: {
        target: 'http://adminc-box2.xinli001.cc/',
        pathRewrite: {
          '^/api': ''
        },
        secure: false,
        changeOrigin: true
      }
    }
  },
  configureWebpack: {
    // provide the app's title in webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    name: name,
    resolve: {
      extensions: ['.js', '.vue', '.json', ".css"],
      alias: {
        "@": resolve("src"),
        "components": resolve("src/components"),
        "utils": resolve("src/utils"),
        "scss": resolve("src/scss")
      }
    },
    performance: {
      hints: 'warning',
      // 入口起点的最大体积 整数类型（以字节为单位）
      maxEntrypointSize: 50000000,
      // 生成文件的最大体积 整数类型（以字节为单位 300k）
      maxAssetSize: 30000000,
      // 只给出 js 文件的性能提示
      assetFilter: function(assetFilename) {
        return assetFilename.endsWith('.js')
      }
    }
  },
  chainWebpack(config) {
    config.plugins.delete("preload") // TODO: need test
    config.plugins.delete("prefetch") // TODO: need test
    // set preserveWhitespace

    config.module
      .rule("vue")
      .use("vue-loader")
      .loader("vue-loader")
      .tap(options => {
        options.compilerOptions.preserveWhitespace = true
        return options
      })
      .end()

    // 压缩图片
    config.module
      .rule('images')
      .use('url-loader')
      .loader('url-loader')
      .tap(options => Object.assign(options, { limit: 20000 }))
    // https://webpack.js.org/configuration/devtool/#development
    config
      .when(process.env.NODE_ENV === "development", config =>
        config.devtool("cheap-source-map")
      )

    // 打包分析
    config
      .when(process.env.NODE_ENV === "analyz", config => {
        config.plugin('webpack-report')
          .use(bundleAnalyzerPlugin, [{
            analyzerMode: 'static'
          }])
      }
      )

    config
      .when(process.env.NODE_ENV !== "development", config => {
        config
          .plugin("ScriptExtHtmlWebpackPlugin")
          .after("html")
          .use("script-ext-html-webpack-plugin", [
            {
            // `runtime` must same as runtimeChunk name. default is `runtime`
              inline: /runtime\..*\.js$/
            }
          ])
          .end()

        config.optimization.splitChunks({
          chunks: "all",
          cacheGroups: {
            libs: {
              name: "chunk-libs",
              test: /[\\/]node_modules[\\/]/,
              priority: 10,
              chunks: "initial" // only package third parties that are initially dependent
            },
            commons: {
              name: "chunk-commons",
              test: resolve("src/components"), // can customize your rules
              minChunks: 3, //  minimum common number
              priority: 5,
              reuseExistingChunk: true
            }
          }
        })

        config.optimization.runtimeChunk("single")
        config.externals = {
          'vue': 'Vue',
          'vue-router': 'VueRouter',
          'vuex': 'Vuex',
          'axios': 'axios'
        }
      })
  },
  css: {
    extract: true, // 是否使用css分离插件 ExtractTextPlugin
    sourceMap: false, // 开启 CSS source maps
    requireModuleExtension: false, // 启用 CSS modules for all css / pre-processor files.
    loaderOptions: {
      postcss: {
        plugins: [
          require('postcss-px2rem')({ remUnit: 75 }) // 换算的基数
        ]
      },
      scss: {
        // 向全局sass样式传入共享的全局变量, $src可以配置图片cdn前缀  $src: "${process.env.VUE_APP_BASE_API}";
        // 详情: https://cli.vuejs.org/guide/css.html#passing-options-to-pre-processor-loaders
        prependData: `
          @import "scss/variables.scss";
          @import "scss/mixins.scss";
          @import "scss/function.scss";
          @import "scss/reset.scss";
          `
      }
    }
  }
}
