/**
 * @description user service
 */

const { User } = require('../db/model/index')
const { formatUser } = require('./_format')

/**
 * 获取用户信息
 * @param userName 用户名
 * @param password 密码
 * @returns {Promise<void>}
 */
async function getUserInfo(userName, password) {
  const whereOpt = {
    userName
  }
  if (password) {
    Object.assign(whereOpt, {password})
  }

  const result = await User.findOne({
    attributes: ['id', 'userName', 'nickName', 'picture', 'city'],
    where: whereOpt
  })

  if (result == null) {
    return result
  }

  // 格式化
  const formatResult = formatUser(result.dataValues)

  return formatResult
}

module.exports = {
  getUserInfo
}
