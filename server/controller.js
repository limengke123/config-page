const fs = require('fs')
const path = require('path')
const util = require('util')

const readFile = util.promisify(fs.readFile)

const {getConfigData, setConfigData} = require('./util')

const pageConfigPath = './data/page-config'
const configPath = './data/config'


const pageConfig = async (ctx) => {
    ctx.type = 'application/json'
    ctx.body = {
        data: require(pageConfigPath),
        success: true,
        msg: ''
    }
}

const saveConfig = async (ctx) => {
    const {appName, value} = ctx.request.body
    let config = await readFile(path.resolve(__dirname, './data/config.json'), {encoding: 'utf8'})
    config = JSON.parse(config)
    if (appName) {
        setConfigData(config, appName, value)
    } else {
        config = value
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
    let config = await readFile(path.resolve(__dirname, './data/config.json'), {encoding: 'utf8'})
    config = JSON.parse(config)
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

const test = async (ctx) => {
    const config = await readFile(path.resolve(__dirname, './data/config.json'), {encoding: 'utf8'})
    ctx.body = {
        config: JSON.parse(config)
    }
}

module.exports.init = async router => {
    router.get('/pageConfig', pageConfig)
    router.post('/saveConfig', saveConfig)
    router.get('/getConfig', getConfig)
    router.get('/test', test)
}
