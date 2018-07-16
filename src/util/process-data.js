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

export {
    processData,
    processData2,
    processTimeData,
    processObj,
    deepMerge,
    deepClone,
}
