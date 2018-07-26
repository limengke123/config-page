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

const typeMap = [
    'input',
    'input-number',
    'select',
    'select-multiple',
    'switch',
    'radio-group',
    'radio-button',
    'date-picker',
    'text',
]

const warnings = []

const walkRules = (rules, appName) => {
    if (!rules) return
    let obj = {}
    rules.forEach(rule => {
        if (!rule.fields) {
            if (rule.name) {
                throw new Error(`appName = ${appName} name = ${rule.name} 下的 rules 缺少了 fields 字段！`)
            } else {
                throw new Error(`appName = ${appName} 下的 rules 缺少了 fields 字段！`)
            }
        }
        if (!rule.type) {
            if (rule.name) {
                throw new Error(`appName = ${appName} name = ${rule.name} 下的 rules 缺少了 type 字段！`)
            } else {
                throw new Error(`appName = ${appName} 下的 rules 缺少了 type 字段！`)
            }
        } else {
            if (!~typeMap.indexOf(rule.type)) {
                if (rule.name) {
                    throw new Error(`appName = ${appName} name = ${rule.name} 下 rules 的 type 字段不在枚举里面, type 字段应该在 ${typeMap.join('|')}枚举中`)
                } else {
                    throw new Error(`appName = ${appName} 下的 rules 的 type 字段不在枚举里面, type 字段应该在 ${typeMap.join('|')}枚举中`)
                }
            }
            if (rule.type === 'select') {
                if (!rule.selectValue) {
                    if (rule.name) {
                        throw new Error(`appName = ${appName} name = ${rule.name} 下 rules 的 type = select, 缺少 selectValue 字段`)
                    } else {
                        throw new Error(`appName = ${appName} 下的 rules 的 type = select, 缺少了 selectValue 字段`)
                    }
                }
                if (!Array.isArray(rule.selectValue)) {
                    if (rule.name) {
                        throw new Error(`appName = ${appName} name = ${rule.name} 下 rules 的 type = select, selectValue 字段必须为 Array 类型`)
                    } else {
                        throw new Error(`appName = ${appName} 下的 rules 的 type = select, selectValue 字段必须为 Array 类型`)
                    }
                }
                rule.selectValue.forEach(select => {
                    if (!select.displayValue) {
                        if (rule.name) {
                            throw new Error(`appName = ${appName} name = ${rule.name} 下 rules 的 type = select, selectValue 内容中 缺少了 displayValue 字段`)
                        } else {
                            throw new Error(`appName = ${appName} 下的 rules 的 type = select, selectValue 内容中 缺少了 displayValue 字段`)
                        }
                    }
                    if (!select.value) {
                        if (rule.name) {
                            throw new Error(`appName = ${appName} name = ${rule.name} 下 rules 的 type = select, selectValue 内容中 缺少了 value 字段`)
                        } else {
                            throw new Error(`appName = ${appName} 下的 rules 的 type = select, selectValue 内容中 缺少了 value 字段`)
                        }
                    }
                })
            }
            if (rule.type === 'select-multiple') {
                if (!rule.selectValue) {
                    if (rule.name) {
                        throw new Error(`appName = ${appName} name = ${rule.name} 下 rules 的 type = select, 缺少 selectValue 字段`)
                    } else {
                        throw new Error(`appName = ${appName} 下的 rules 的 type = select, 缺少了 selectValue 字段`)
                    }
                }
                if (!Array.isArray(rule.selectValue)) {
                    if (rule.name) {
                        throw new Error(`appName = ${appName} name = ${rule.name} 下 rules 的 type = select, selectValue 字段必须为 Array 类型`)
                    } else {
                        throw new Error(`appName = ${appName} 下的 rules 的 type = select, selectValue 字段必须为 Array 类型`)
                    }
                }
                rule.selectValue.forEach(select => {
                    if (!select.displayValue) {
                        if (rule.name) {
                            throw new Error(`appName = ${appName} name = ${rule.name} 下 rules 的 type = select, selectValue 内容中 缺少了 displayValue 字段`)
                        } else {
                            throw new Error(`appName = ${appName} 下的 rules 的 type = select, selectValue 内容中 缺少了 displayValue 字段`)
                        }
                    }
                    if (!select.value) {
                        if (rule.name) {
                            throw new Error(`appName = ${appName} name = ${rule.name} 下 rules 的 type = select, selectValue 内容中 缺少了 value 字段`)
                        } else {
                            throw new Error(`appName = ${appName} 下的 rules 的 type = select, selectValue 内容中 缺少了 value 字段`)
                        }
                    }
                })
            }
            if (rule.type === 'radio-group') {
                if (!rule.selectValue) {
                    if (rule.name) {
                        throw new Error(`appName = ${appName} name = ${rule.name} 下 rules 的 type = select, 缺少 selectValue 字段`)
                    } else {
                        throw new Error(`appName = ${appName} 下的 rules 的 type = select, 缺少了 selectValue 字段`)
                    }
                }
                if (!Array.isArray(rule.selectValue)) {
                    if (rule.name) {
                        throw new Error(`appName = ${appName} name = ${rule.name} 下 rules 的 type = select, selectValue 字段必须为 Array 类型`)
                    } else {
                        throw new Error(`appName = ${appName} 下的 rules 的 type = select, selectValue 字段必须为 Array 类型`)
                    }
                }
                rule.selectValue.forEach(select => {
                    if (!select.displayValue) {
                        if (rule.name) {
                            throw new Error(`appName = ${appName} name = ${rule.name} 下 rules 的 type = select, selectValue 内容中 缺少了 displayValue 字段`)
                        } else {
                            throw new Error(`appName = ${appName} 下的 rules 的 type = select, selectValue 内容中 缺少了 displayValue 字段`)
                        }
                    }
                    if (!select.value) {
                        if (rule.name) {
                            throw new Error(`appName = ${appName} name = ${rule.name} 下 rules 的 type = select, selectValue 内容中 缺少了 value 字段`)
                        } else {
                            throw new Error(`appName = ${appName} 下的 rules 的 type = select, selectValue 内容中 缺少了 value 字段`)
                        }
                    }
                })
            }
            if (rule.type === 'radio-button') {
                if (!rule.selectValue) {
                    if (rule.name) {
                        throw new Error(`appName = ${appName} name = ${rule.name} 下 rules 的 type = select, 缺少 selectValue 字段`)
                    } else {
                        throw new Error(`appName = ${appName} 下的 rules 的 type = select, 缺少了 selectValue 字段`)
                    }
                }
                if (!Array.isArray(rule.selectValue)) {
                    if (rule.name) {
                        throw new Error(`appName = ${appName} name = ${rule.name} 下 rules 的 type = select, selectValue 字段必须为 Array 类型`)
                    } else {
                        throw new Error(`appName = ${appName} 下的 rules 的 type = select, selectValue 字段必须为 Array 类型`)
                    }
                }
                rule.selectValue.forEach(select => {
                    if (!select.displayValue) {
                        if (rule.name) {
                            throw new Error(`appName = ${appName} name = ${rule.name} 下 rules 的 type = select, selectValue 内容中 缺少了 displayValue 字段`)
                        } else {
                            throw new Error(`appName = ${appName} 下的 rules 的 type = select, selectValue 内容中 缺少了 displayValue 字段`)
                        }
                    }
                    if (!select.value) {
                        if (rule.name) {
                            throw new Error(`appName = ${appName} name = ${rule.name} 下 rules 的 type = select, selectValue 内容中 缺少了 value 字段`)
                        } else {
                            throw new Error(`appName = ${appName} 下的 rules 的 type = select, selectValue 内容中 缺少了 value 字段`)
                        }
                    }
                })
            }
            if (rule.type === 'input-number') {
                if (rule.min && typeof rule.min !== 'number') {
                    throw new Error(`appName = ${appName} 下的 rules 的 type = input-number的 min 字段类型应该为 Number`)
                }
                if (rule.max && typeof rule.max !== 'number') {
                    throw new Error(`appName = ${appName} 下的 rules 的 type = input-number的 max 字段类型应该为 Number`)
                }
            }
            if (rule.type === 'date-picker') {
                if (rule.defaultValue) {
                    const reg = /\d{4}-\d{2}-\d{2}/g
                    if(!reg.test(rule.defaultValue)) {
                        if (rule.name) {
                            throw new Error(`appName = ${appName} name = ${rule.name} 下 rules 的 type = date-picker, defaultValue 内容不符合规定要求,需要类似于 2014-05-12 格式`)
                        } else {
                            throw new Error(`appName = ${appName} 下的 rules 的 type = date-picker, defaultValue 内容不符合规定要求,需要类似于 2014-05-12 格式`)
                        }
                    }
                }
            }
            if (!rule.defaultValue) {
                if (rule.name) {
                    warnings.push(`appName = ${appName} fields = ${rule.fields} 下的 rules 的 type = ${rule.type}, 缺少 defaultValue 值`)
                } else {
                    warnings.push(`appName = ${appName} 下的 rules 的 type = ${rule.type}, 缺少 defaultValue 值`)
                }
            }
        }
        if (!rule.name) {
            warnings.push(`appName = ${appName} fields = ${rule.fields} 下的 rules 缺少了 name 字段！`)
        }
        obj[rule.fields] = rule.defaultValue
    })
    return obj
}

const walkPage = (page, obj, appName, first) => {
    if (!page) return
    if (!page.key) {
        if (!page.name) {
            throw new Error(`appName = ${appName} 有一个 page 对象下面缺少 key 属性！`)
        } else {
            throw new Error(`appName = ${appName}, page[name] = ${page.name} 的 page 对象下面缺少 key 属性！`)
        }
    } else if (!first) {
        if (page.key.indexOf('$$') !== 0) {
            if (!page.name) {
                throw new Error(`appName = ${appName}, 有一个 page 对象下面缺少 key 属性值没有以 $$ 开头,请设置该 key 值以 $$ 开头!`)
            } else {
                throw new Error(`appName = ${appName}, page[name] = ${page.name} 的 page 对象下面缺少 key 属性值没有以 $$ 开头,请设置该 key 值以 $$ 开头!`)
            }
        }
        if (!!~page.key.indexOf('_')) {
            if (!page.name) {
                throw new Error(`appName = ${appName}, 有一个 page 对象下面缺少 key 属性值不能有 _ 下划线!`)
            } else {
                throw new Error(`appName = ${appName}, page[name] = ${page.name} 的 page 对象下面缺少 key 属性值不能有 _ 下划线!`)
            }
        }
    }
    if (!page.children) {
        if (!page.name) {
            throw new Error(`appName = ${appName}, page[key] = ${page.key} 的 page 对象下面缺少 children 属性！`)
        } else {
            throw new Error(`appName = ${appName}, page[name] = ${page.name}, page[key] = ${page.key}, 的 page 对象下面缺少 children 属性！`)
        }
    }
    if (page.children.length === 0) {
        if (!page.name) {
            warnings.push(`appName = ${appName}, page[key] = ${page.key} 的 page 对象下面 children 字段长度为 0 ！`)
        } else {
            warnings.push(`appName = ${appName}, page[name] = ${page.name}, page[key] = ${page.key}, 的 page 对象下面 children 字段长度为 0 ！`)
        }
    }
    if (!page.name) {
        warnings.push(`appName = ${appName}, page[key] = ${page.key}的 page 对象下面缺少 name 属性！`)
    }
    if (!page.version) {
        if (!page.name) {
            warnings.push(`appName = ${appName}, page[key] = ${page.key}的 page 对象下面缺少 version 属性！`)
        } else {
            warnings.push(`appName = ${appName}, page[name] = ${page.name}, page[key] = ${page.key}, 的 page 对象下面缺少 version 属性！`)
        }
    }
    if (!page.description) {
        if (!page.description) {
            warnings.push(`appName = ${appName}, page[key] = ${page.key}的 page 对象下面缺少 description 属性！`)
        } else {
            warnings.push(`appName = ${appName}, page[name] = ${page.name}, page[key] = ${page.key}, 的 page 对象下面缺少 description 属性！`)
        }
    }
    page.children.forEach(child => {
        if (!child.fields) {
            if (child.name) {
                throw new Error(`appName = ${appName} name = ${child.name} 下的 children 缺少了fields字段！`)
            } else {
                throw new Error(`appName = ${appName} 下的 children 缺少了fields字段！`)
            }
        }
        if (!child.rules) {
            if (child.name) {
                throw new Error(`appName = ${appName} name = ${child.name} 下的 children 缺少了 rules 字段！`)
            } else {
                throw new Error(`appName = ${appName} 下的 children 缺少了 rules 字段！`)
            }
        }
        if (child.rules.length === 0) {
            if (!child.name) {
                warnings.push(`appName = ${appName} 下的 children 的 rules 字段长度为 0 !`)
            } else {
                warnings.push(`appName = ${appName}, name = ${child.name} 下的 children 的 rules 字段长度为 0 !`)
            }
        }
        if (!child.name) {
            warnings.push(`appName = ${appName}, fields = ${child.fields} 下的 children 缺少了 name 字段`)
        }
        obj[child.fields] = walkRules(child.rules, appName)
        if (child.page) {
            // 如果有 page 子页面， 需要递归了
            obj[child.fields][child.page.key] = {}
            walkPage(child.page, obj[child.fields][child.page.key], appName, warnings)
        }
    })
}

const getDefaultConfig = (appName, config) => {
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
            warnings.push(`appName = ${appName} rules 字段长度为 0 !`)
        } else {
            warnings.push(`appName = ${appName}, name = ${app.name} rules 字段长度为 0 !`)
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

    walkPage(app, subConfig, appName, true)

    return {
        subConfig,
        basicConfig
    }
}

async function check () {

    const config = await getConfigObj()
    const defaultKeys = Object.keys(config)

    const result = defaultKeys.reduce((accu, defaultKey) => {
        accu[defaultKey] = getDefaultConfig(defaultKey, config)
        return accu
    }, {})

    return {
        result
    }

}

;(async function () {
    const {result} = await check()
    if (!warnings.length) {
        console.log(` \n`)
        console.log(chalk.yellow.bold(`根据配置文件生成的默认配置:`))
        console.log(chalk.blue(` ${JSON.stringify(result)} \n`))
        console.log(chalk.green.bold(` ${path} 的配置文件 校验通过! \n`))
    } else {
        let warningsString = warnings.reduce((accu, next) => accu + next + '\n', '')
        console.log(` \n`)
        console.log(chalk.yellow.bold(`根据配置文件生成的默认配置:`))
        console.log(chalk.blue(` ${JSON.stringify(result)} \n`))
        console.log(chalk.yellow.bold('一些警告: '))
        console.log(chalk.red(warningsString))
        console.log(chalk.green.bold(` ${path} 的配置文件 校验通过! , 存在一些不影响使用的小警告\n`))
    }
})().catch((e) => {
    console.log(chalk.red(e))
})


