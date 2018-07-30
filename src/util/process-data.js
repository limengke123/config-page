import moment from 'moment'

// @deprecate
const processData = (config) => {
    /**
     * 处理最初始的数据,拿到初始化的值
     * string -> moment
     * @param config {object} 初始的数据
     * @return obj {object} 用于初始化state的对象
     * */

    let obj = {}

    config.children && config.children.forEach(item => {
        let _obj = {}
        item.rules.forEach(_item => {
            if (_item.type === 'date-picker') {
                _obj[_item.fields] = moment(_item.defaultValue)
            } else {
                _obj[_item.fields] = _item.defaultValue
            }
        })
        obj[item.fields] = _obj
    })

    return obj
}

const processData2 = (config) => {
    /**
     * 处理最初始的数据,拿到初始化的值
     * string -> moment
     * @param config {object} 初始的数据
     * @return obj {object} 用于初始化state的对象
     * */

    let obj = {}
    config.children && config.children.forEach(item => {
        let _obj = {}
        item.rules.forEach(_item => {
            _obj[_item.fields] = _item.defaultValue
        })
        obj[item.fields] = _obj
    })

    return obj
}

const processTimeData = (value) => {
    /**
     * 处理date-picker返回回来的Moment类型的数据
     * Moment -> string
     * @param value {any} 任意类型
     * @return value {any}
     * */
    // console.log((value && value.constructor && value.constructor.name === 'Moment' && value.format('YYYYMMDD')) || value)
    return (value && value.constructor && value.constructor.name === 'Moment' && value.format('YYYY-MM-DD')) || value
    // return value
}


const processObj = (obj) => {
    /**
     * 处理时间格式成moment格式
     * 2018-12-5
     * */

    const reg = /\d{4}-\d{1,2}-\d{1,2}/g
    if (!obj) obj = {}

    Object.keys(obj).forEach(key => {
        Object.keys(obj[key]).forEach(innerkey => {
            if (reg.test(obj[key][innerkey])) {
                obj[key][innerkey] = moment(obj[key][innerkey])
            }
        })
    })
    return obj
}


const isType = (obj, type) => {
    if (typeof obj !== 'object') return false
    const typeString = Object.prototype.toString.call(obj)
    let flag
    switch(type) {
        case 'Array':
            flag = typeString === '[object Array]'
            break
        case 'Date':
            flag = typeString === '[object Date]'
            break
        case 'RegExp':
            flag = typeString === '[object RegExp]'
            break
        case 'Object':
            flag = typeString === '[object Object]'
            break
        default:
            flag = false
    }
    return flag
}

const deepMerge = (obj1, obj2) => {
    let key
    for(key in obj1) {
        obj1[key] = obj2[key] && obj2[key].toString() === '[object Object]'?
            deepMerge(obj1[key], obj2[key]) : obj2[key] === void 0 ?
                obj1[key]: obj2[key]
    }
    for(key in obj2) {
        /**
         * 反向合并一下，把 $$ 前綴的子配置頁面拿回來
         * */
        if (!obj1.hasOwnProperty(key)) {
            obj1[key] = obj2[key]
        }
    }
    return obj1
}

const deepClone = (obj) => {
    if (typeof obj !== 'object' && typeof obj !== 'function') {
        return obj
    }
    let o = isType(obj, 'Array') ? []: {}
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            o[key] = typeof obj[key] === 'object' ? deepClone(obj[key]) : obj[key]
        }
    }
    return o
}

/**
 * getDeepObj ,纯函数, 从 obj 中拿到 a.b.c 这种字段
 * e.g:
 * obj = {a:{b:{c:1}},a2:{b:1}}
 * fields = a.b.c
 * result = getDeepObj(obj, fields) -> 1
 * @summary 根据字符串获取对象数据
 * @param {object} obj - 需要取数据对象
 * @param {string} fields - 取数据的字符串
 * @param {string} [separator=/] separator - 分隔符
 * @returns {*} result - 从对象中根据 fields 获取的结果
 * */
const getDeepObj = (obj, fields, separator = '/') => {
    const separators = fields.split(separator)
    return separators.reduce((accu, currentSeparator, index) => {
        if (index === 0) {
            return obj[currentSeparator]
        }
        return accu[currentSeparator]
    }, null)
}

/**
 * @summary walkData 从数据中取值,在特定于当前的数值结构下的方法
 * @param {object} obj - 需要取数据对象
 * @param {string} fields - 取数据的字符串
 * @param {string} [separator=/] separator - 分隔符
 * @returns {object} result - 从对象中根据 fields 获取的结果
 * */
const walkData = (obj, fields, separator = '/') => {
    if (!obj) return null
    const separators = fields.split(separator)
    let page = {}
    for (let i = 0, len = separators.length; i < len; i++) {
        const currentSeparator = separators[i]
        if (i === 0) {
            page = obj[currentSeparator]
        } else {
            if (page.children) {
                /**
                 * 筛选拿到的对应匹配数组
                 * 总是取第一个匹配的 page 对象
                 * bookRecommend/baseInfo_bkRecommend
                 * */
                if (!~currentSeparator.indexOf('_')) throw new Error('walkData 接受子字段需要 _ 结合当前children')

                const [pre, main] = currentSeparator.split('_')

                let _arr = page.children.filter(child => {
                    return child.fields === pre && child.page && child.page.key === main
                })
                if (!_arr.length) throw new Error('walkData 没有找到相关数据')
                if (_arr.length > 1) throw new Error('walkData 规则配置中同级中存在字段命名重复')

                page = _arr[0].page
            }
        }
    }
    return page
    // processData2(page)
}

/**
 * @summary 用新的分割符替换字符串中旧的分隔符
 * a/b/c/d --> a.b.c.d
 * @param str {string} - 需要处理的字符串
 * @param oldSeparator {string}[/] 旧的分隔符
 * @param newSeparator {string}[.] - 新的分隔符
 * @return str {string} - 处理后的分隔符
 * */
const replaceSeparator = (str, oldSeparator, newSeparator) => str.split(oldSeparator).join(newSeparator)

export {
    processData,
    processData2,
    processTimeData,
    processObj,
    deepMerge,
    deepClone,
    getDeepObj,
    walkData,
    replaceSeparator,
}
