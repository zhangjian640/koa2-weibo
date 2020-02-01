/**
 * @description user controller
 */
const { getUserInfo } = require('../service/user')
const { SuccessModel, ErrorModel } = require('../model/ResponseModel')
const { registerUserNameNotExistInfo } = require('../model/ErrorInfo')
/**
 * 用户名是否存在
 * @param userName 用户名
 * @returns {Promise<void>}
 */
async function isExist(userName) {
  const userInfo = await getUserInfo(userName)
  console.log(userName)
  console.log(userInfo)
  if (userInfo) {
    return new SuccessModel(userInfo)
  } else {
    return new ErrorModel(registerUserNameNotExistInfo)
  }
}

module.exports = {
  isExist
}
