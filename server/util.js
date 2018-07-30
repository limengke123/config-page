/**
 * @summary getConfigData 从数据中取值,支持a.b.c这种方式取值
 * @param {object} obj - 需要取数据对象
 * @param {string} fields - 取数据的字符串
 * @param {string} separator[separator=.] separator - 分割符
 * @param {string} pre[pre=''] pre - 特殊前置符,暂时是无用的参数
 * @returns {object} result - 从对象中根据 fields 获取的结果
 * */
const getConfigData = (obj, fields, separator = '.', pre = '') => {
    const separators = fields.split(separator)
    return separators.reduce((accu, currentKey, index) => {
        if (index === 0) {
            return obj[currentKey] || {}
        } else {
            return accu[`${pre}${currentKey}`] || {}
        }
    }, {})
}

/**
 * @summary setConfigData 对数据中设置新的值,支持a.b.c这种方式设置
 * @param {object} obj - 需要设置数据对象
 * @param {string} fields - 设置数据的字符串
 * @param {*} data - 设置的数据
 * @param {string} separator[separator=.] separator - 分割符
 * @returns {object} result - 设置过新值的结果
 * */
const setConfigData = (obj, fields, data, separator = '.') => {
    const separators = fields.split(separator)
    separators.reduce((accu, currentKey, index, array) => {
        if (!accu[currentKey]) {
            accu[currentKey] = {}
        }
        if(index === array.length - 1) {
            // 最后一次赋值,直接赋值有问题,外层会直接把内层配置好的属性直接覆盖掉
            // 这里做一个约定,以$$开头的属性为内层配置属性,不允许被覆盖掉
            // _由于在路由中用到了这个变量,所以这里就不能用_了
            // const keys = accu[currentKey] && Object.keys(accu[currentKey]).filter(key => key.indexOf('$$') === 1)[0]
            const keys = Object.keys(data)
            // const keys = Object.keys(accu[currentKey])
            if (keys) {
                for (let i = 0, len = keys.length; i < len; i++) {
                    const child = accu[currentKey][keys[i]]
                    let key = child && Object.keys(child).filter(innerKey => innerKey.indexOf('$$') === 0)[0]
                    if (key) {
                        const innerData = accu[currentKey][keys[i]][key]
                        accu[currentKey][keys[i]] = data[keys[i]]
                        accu[currentKey][keys[i]][key] = innerData
                    } else {
                        accu[currentKey][keys[i]] = data[keys[i]]
                    }
                }
            } else {
                accu[currentKey] = data
            }
        }
        return accu[currentKey]
    }, obj)
    return obj
}

/**
 * 去除原來和 $$ 耦合部分
 * */
const setConfigData2 = (obj, fields, data, separator = '.') => {
    const separators = fields.split(separator)
    separators.reduce((accu, currentKey, index, array) => {
        if (!accu[currentKey]) {
            accu[currentKey] = {}
        }
        if(index === array.length - 1) {
            // 最后一次赋值,直接赋值有问题,外层会直接把内层配置好的属性直接覆盖掉
            // 这里做一个约定,以$$开头的属性为内层配置属性,不允许被覆盖掉
            // _由于在路由中用到了这个变量,所以这里就不能用_了
            // const keys = accu[currentKey] && Object.keys(accu[currentKey]).filter(key => key.indexOf('$$') === 1)[0]
            const keys = Object.keys(data)
            // const keys = Object.keys(accu[currentKey])
            accu[currentKey] = data
        }
        return accu[currentKey]
    }, obj)
    return obj
}

module.exports =  {
    getConfigData,
    setConfigData,
    setConfigData2,
}
