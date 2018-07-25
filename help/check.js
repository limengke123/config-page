/**
 * 检查 page-config 文件是否符合限定要求
 * 具体 page-config 设置要求,查看 README.md
 * */
const fs = require('fs')
const util = require('util')
const chalk = require('chalk')
const readFile = util.promisify(fs.readFile)

let path = process.argv.splice(2)
const defaultPath = './server/data/page-config.json'

if (path.length) {
    path = path[0]
} else {
    path = defaultPath
}

async function getConfigObj () {
    const stringObj = await readFile(path)
    return JSON.parse(stringObj)
}

const walkRules = (rules) => {
    if (!rules) return
    let obj = {}
    rules.forEach(rule => {
        if (!rule.fields) throw new Error(`检查 name = ${rule.name} 的 rules 下是否缺少了 fields 字段`)
        obj[rule.fields] = rule.defaultValue
    })
    return obj
}

const walkPage = (page, obj) => {
    if (!page) return
    if (!page.children) throw new Error('page-config 中，每一个 page 对象下面一定要有 children 属性')
    page.children.forEach(child => {
        if (!child.fields) throw new Error(`检查name = ${child.name} 下的 children 中是否少了fields字段！`)
        obj[child.fields] = this.walkRules(child.rules)
        if (child.page) {
            // 如果有 page 子页面， 需要递归了
            if (!child.page.key) throw new Error(`检查name = ${child.name} fields = ${child.fields} 下的 page 是否缺少了 key 字段`)
            obj[child.fields][child.page.key] = {}
            this.walkPage(child.page, obj[child.fields][child.page.key])
        }
    })
}

const getDefaultConfig = (appName, config, warnings) => {
    let subConfig = {}
    let basicConfig = {}
    let app = config[appName]

    if (!app.key) {
        if (!app.name) {
            warnings.push(`appName = ${appName} 缺少了 name 字段！`)
            throw new Error(`appName = ${appName} 缺少了 key 字段！`)
        } else {
            throw new Error(`appName = ${appName}, name = ${app.name} 缺少了 key 字段！`)
        }
    }
    if (!app.rules) {
        if (!app.name) {
            throw new Error(`appName = ${appName} 缺少了 rules 字段！`)
        } else {
            throw new Error(`appName = ${appName}, name = ${app.name} 缺少了 rules 字段！`)
        }
    }
    if (app.rules.length === 0) {
        if (!app.name) {
            warnings.push(`appName = ${appName} rules 字段不存在内容！`)
        } else {
            warnings.push(`appName = ${appName}, name = ${app.name} rules 字段不存在内容！`)
        }
    }
    if (!app.version) {
        if (!app.name) {
            warnings.push(`appName = ${appName} 缺少了 version 字段！`)
        } else {
            warnings.push(`appName = ${appName}, name = ${app.name} 缺少了 version 字段！`)
        }
    }
    if (!app.description) {
        if (!app.name) {
            warnings.push(`appName = ${appName} 缺少了 description 字段！`)
        } else {
            warnings.push(`appName = ${appName}, name = ${app.name} 缺少了 description 字段！`)
        }
    }


    app.rules && app.rules.forEach(rule => {
        if (!rule.fields) {
            if (!app.name && !rule.name) {
                throw new Error(`appName = ${appName} 下的 rules 缺少了 fields 字段！`)
            } else if (rule.name) {
                throw new Error(`appName = ${appName}, rule[name] = ${rule.name} 下的 rules 缺少了 fields 字段！`)
            } else if (app.name) {
                throw new Error(`appName = ${appName}, appName[name] = ${app.name} 下的 rules 缺少了 fields 字段！`)
            } else {
                throw new Error(`appName = ${appName}, appName[name] = ${app.name}, rule[name] = ${rule.name} 下的 rules 缺少了 fields 字段！`)
            }
        }
        if (!rule.defaultValue) {
            if (!app.name && !rule.name) {
                warnings.push(`appName = ${appName} 下的 rules 缺少了 defaultValue 字段！`)
            } else if (rule.name) {
                warnings.push(`appName = ${appName}, rule[name] = ${rule.name} 下的 rules 缺少了 fields 字段！`)
            } else if (app.name) {
                warnings.push(`appName = ${appName}, appName[name] = ${app.name} 下的 rules 缺少了 fields 字段！`)
            } else {
                warnings.push(`appName = ${appName}, appName[name] = ${app.name}, rule[name] = ${rule.name} 下的 rules 缺少了 fields 字段！`)
            }
        }
        basicConfig[rule.fields] = rule.defaultValue
    })

    walkPage(app, subConfig, warnings)

    return {
        subConfig,
        basicConfig
    }
}

async function check () {
    const warnings = []

    const config = await getConfigObj()
    const defaultKeys = Object.keys(config)

    const result = defaultKeys.reduce((accu, defaultKey) => {
        accu[defaultKey] = getDefaultConfig(defaultKey, config, warnings)
        return accu
    }, {})

    console.log(result)
    return result

}

;(async function () {
    const errors = await check()
    if (!errors.length) {
        chalk.blue(` ${path} 的配置文件 校验通过! \n`)
    } else {
        let result = errors.reduce((accu, next) => accu + next + '\n', '')
        chalk.red(result)
    }
})()


