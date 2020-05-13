import path from 'path'
import SpriteLoaderPlugin from 'svg-sprite-loader/plugin'

function resolve(dir) {
  return path.join(__dirname, dir)
}
export default {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
    './assets/css/global.css',
    './assets/css/style.css',
    './assets/css/screen.css'
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~/plugins/vue_components.js',
    '~/plugins/element-ui.js'
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    '@nuxtjs/dotenv'
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    // Doc: https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv'
  ],
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, { isClient }) {
      if (isClient) {
        config.module.rules.forEach((rule) => { // 移除默认处理svg的配置
          if (~rule.test.source.indexOf('|svg')) {
            rule.exclude = [resolve('icons/svg')]
          }
        })
        config.module.rules.push(
          { // 使用svg
            test: /\.svg$/,
            loader: 'svg-sprite-loader',
            include: [resolve('icons/svg')], // include => 只处理指定的文件夹下的文件
            options: {
              symbolId: 'icon-[name]'
            }
          })
        // console.log(config.module.rules)
      // set svg-sprite-loader end
      }
    },
    hotMiddleware: {
      client: {
        // turn off client overlay when errors are present
        overlay: false
      }
    },
    babel: {
      plugins: [
        [
          'component',
          { libraryName: 'element-ui', styleLibraryName: 'theme-chalk' }
        ]
      ]
    },
    plugins: [
      new SpriteLoaderPlugin()
    ]
  }
}
