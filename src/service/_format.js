/**
 * @description 数据格式化
 */
const { DEFAULT_PICTURE } = require('../config/constant')
/**
 * 默认头像
 * @param {Object} obj 用户对象
 * @returns {{picture}}
 * @private
 */
function _formatUserPicture(obj) {
  if (obj.picture == null) {
    obj.picture = DEFAULT_PICTURE
  }
  return obj
}

/**
 * 格式化用户信息
 * @param {Array|Object} list 用户列表或者单个用户对象
 */
function formatUser(list) {
  if (list == null) {
    return list
  }

  // 数组
  if (list instanceof Array) {
    return list.map(_formatUserPicture)
  }

  // 对象
  return _formatUserPicture(list)
}

module.exports = {
  formatUser
}
