const fs = require('fs')
const path = require('path')
const {getConfigData, setConfigData} = require('./util')


const pageConfig = async (ctx) => {
    ctx.type = 'application/json'
    ctx.body = {
        data: require('./data/page-config'),
        success: true,
        msg: ''
    }
}

const saveConfig = async (ctx) => {
    const {data} = ctx.request.body
    const config = require('./data/config')
    const key = Object.keys(data)[0]
    setConfigData(config, key, data[key])

    try {
        fs.unlinkSync(path.resolve(__dirname, './data/config.json'))
        fs.writeFileSync(path.resolve(__dirname, './data/config.json'), JSON.stringify(config), 'utf8')
        ctx.body = {
            success: true,
            data: config,
            msg:''
        }
    } catch (e) {
        console.log(e)
        ctx.body = {
            success: false,
            msg: e.stack
        }
    }
}

const getConfig = async (ctx) => {
    const params = ctx.query
    const config = require('./data/config')
    let data = null
    if (params && params.appName) {
        data = getConfigData(config, params.appName)
    } else {
        data = config
    }
    ctx.type= 'text/plain'
    ctx.body = {
        data,
        success: true,
        msg: ''
    }
}

module.exports.init = async router => {
    router.get('/pageConfig', pageConfig)
    router.post('/saveConfig', saveConfig)
    router.get('/getConfig', getConfig)
}
