/**
 * @summary getConfigData 从数据中取值,支持a.b.c这种方式取值
 * @param {object} obj - 需要取数据对象
 * @param {string} fields - 取数据的字符串
 * @param {string} separator[separator=.] separator - 分割符
 * @param {string} pre[pre=''] pre - 特殊前置符
 * @returns {object} result - 从对象中根据 fields 获取的结果
 * */
const getConfigData = (obj, fields, separator = '.', pre = '') => {
    const separators = fields.split(separator)
    const result =  separators.reduce((accu, current, index, array) => {
        if (index === 0) {
            return obj[current]
        } else {
            return accu[`${pre}${current}`]
        }
    }, {})
    return result
}

module.exports =  {
    getConfigData,
}
