import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import {axios} from './util'
import registerServiceWorker from './util/registerServiceWorker'

/**
 * 根据环境变量判断当前环境
 * 来对请求划分成请求node.js、或是请求 php
 * 之前本地开发用的时 node.js 所以保留用 node.js 请求
 * process.env.REACT_APP_IS_NODE 保存是否是 node.js 服务
 * 注意：
 * 1. 本地开发的时候，如果需要使用到本地的 node.js 服务， 需要使用 npm run start:node, 同时需要 node server 启动服务，打包使用 npm run build:node
 * 2. 需要使用到 php 的 api 接口时，正常 npm run start 即可，打包使用npm run build
 * */

;(async function () {
    let config = null
    let response
    try{
        let url = process.env.REACT_APP_IS_NODE ? '/api/pageConfig' : '/cfg/lmk/operate.php?operate=readRule'
        response = await axios.get(url)
        config = response.data && response.data.data
    } catch (e) {
        console.log(e.stack)
    }
    if (config) {
        window.config = config
        ReactDOM.render(<App />, document.getElementById('root'))
        registerServiceWorker()
    }
})()


