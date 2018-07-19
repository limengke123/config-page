const fs = require('fs')
const path = require('path')
const pageConfig = async (ctx) => {
    ctx.type = 'application/json'
    ctx.body = {
        data: require('./data/page-config'),
        success: true,
        msg: ''
    }
}

const saveConfig = async (ctx) => {
    const {type, data} = ctx.request.body
    const config = require('./data/config')
    const key = Object.keys(data)[0]
    if (!config[key]) config[key] = {}
    if (type === 'subConfig') {
        if (!config[key]['basicConfig']) config[key]['basicConfig'] = {show: false}
        config[key]['subConfig'] = data[key]
    } else if (type === 'basicConfig') {
        if (!config[key]['subConfig']) config[key]['subConfig'] = {}
        config[key]['basicConfig'] = data[key].basicConfig
    }

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
        data = config[params.appName]
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
