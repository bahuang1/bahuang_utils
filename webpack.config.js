const path = require('path')

function resolve(dir) {
  return path.resolve(__dirname, dir)
}

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bahuang-utils.js',
    pathinfo: false,
    path: resolve('dist'),
    library: {
      name: 'bahuangUtils',
      type: 'umd'
    },
  },
  externals: {
    xss: {
      commonjs: 'xss',
      commonjs2: 'xss',
      amd: 'xss',
    },
    Cookie: {
      commonjs: 'Cookie',
      commonjs2: 'Cookie',
      amd: 'Cookie',
    }
  }
}
