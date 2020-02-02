/**
 * @description user service
 */

const { User } = require('../db/model/index')
const { formatUser } = require('./_format')

/**
 * 获取用户信息
 * @param userName 用户名
 * @param password 密码
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

  // 格式化后返回
  return formatUser(result.dataValues)
}

/**
 * 创建用户
 * @param userName 用户名
 * @param password 密码
 * @param gender 性别
 * @param nickName 昵称
 */
async function createUser({userName, password, gender = 3, nickName}) {
  const result = await User.create({
    userName,
    password,
    nickName: nickName ? nickName : userName,
    gender
  })
  if (result.dataValues == null) {
    return result
  }
  return result.dataValues
}

/**
 * 删除用户
 * @param userName
 * @returns {Promise<void>}
 */
async function deleteUser(userName) {
  const result = await User.destroy({
    where: {
      userName
    }
  })
  return result > 0 // 删除的行数
}

module.exports = {
  getUserInfo,
  createUser,
  deleteUser
}
