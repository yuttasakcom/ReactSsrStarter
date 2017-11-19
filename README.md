## React SSR Starter
> เรียนรู้และทำความเข้าใจเกี่ยวกับ Server-Side Rendering ด้วย React

## NPM Install
> ติดตั้ง package และ scripts ตามไฟล์ package.json

## Create Webpack Base Config
```javascript
module.exports = {
  module: {
    rules: [
      {
        test: /\.js?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: [
            'react',
            'stage-0',
            ['env', {targets: {browsers: ['last 2 versions']}}]
          ]
        }
      }
    ]
  }
}
```

## Create Webpack Client Config
```javascript
const path = require('path')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.base.js')

const config = {
  entry: './src/client/client.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public')
  }
}

module.exports = merge(baseConfig, config)
```

## Create Webpack Server Config
```javascript
const path = require('path')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.base.js')
const webpackNodeExternals = require('webpack-node-externals')

const config = {
  target: 'node',
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build')
  },

  externals: [webpackNodeExternals()]
}

module.exports = merge(baseConfig, config)
```

## Create react client
```javascript
import React from 'react'
import ReactDOM from 'react-dom'

const App = () => (<div>Hello SSR Starter</div>)

ReactDOM.hydrate(<App />, document.getElementById('root'))
```

## Create renderer
```javascript
import React from 'react'

export default () => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
      <title>React SSR Starter</title>
    </head>
    <body>
      <div id="root"></div>
      <script src="bundle.js"></script>
    </body>
    </html>
  `
}
```

## Create server listener
```javascript
import express from 'express'
import renderer from './helpers/renderer'

const app = express()
const port = process.env.PORT || 3000

app.use(express.static('public'))
app.get('*', (req, res) => {
  res.send(renderer())
})

app.listen(port, () => {
  console.log(`Server running at port ${port}`)
})
```