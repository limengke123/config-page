/**
 * 这里的 icon 均来自于 antd 中的 icon
 * */

const icons = ['user', 'video-camera', 'upload', 'mail', 'solution', 'switcher', 'hourglass', 'coffee']

/**
 * @name getIcon
 * @param {Number} index 索引
 * @return {String} 对应icon
 * */
export const getIcon = (index) => {
    return icons[index % icons.length]
}
