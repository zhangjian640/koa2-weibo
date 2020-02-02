/**
 * @description user controller
 */
const { getUserInfo, createUser, deleteUser } = require('../services/user')
const { SuccessModel, ErrorModel } = require('../model/ResponseModel')
const { registerUserNameNotExistInfo, registerUserNameExistInfo, registerFailInfo, loginFailInfo, deleteUserFailInfo } = require('../model/ErrorInfo')
const doCrypto = require('../utils/crypto')
/**
 * 用户名是否存在
 * @param userName 用户名
 * @returns {Promise<void>}
 */
async function isExist(userName) {
  const userInfo = await getUserInfo(userName)
  if (userInfo) {
    return new SuccessModel(userInfo)
  } else {
    return new ErrorModel(registerUserNameNotExistInfo)
  }
}

/**
 * 注册
 * @param userName 用户名
 * @param password 密码
 * @param gender 性别 （1 男性，2 女性，3 保密）
 * @returns {Promise<void>}
 */
async function register({userName, password, gender}) {
  const userInfo = await getUserInfo(userName)
  if (userInfo) {
    // 用户名已存在
    return new ErrorModel(registerUserNameExistInfo)
  }

  try {
    await createUser({
      userName,
      password: doCrypto(password),
      gender
    })
    return new SuccessModel()
  } catch (e) {
    console.error(e.message, e.stack)
    return new ErrorModel(registerFailInfo)
  }
}

/**
 * 登录
 * @param ctx koa2 ctx
 * @param userName 用户名
 * @param password 密码
 */
async function login(ctx, userName, password) {
  // 登录成功 ctx.session.userInfo = xx
   const userInfo = await getUserInfo(userName, doCrypto(password))
  if (!userInfo) {
    // 登录失败
    return new ErrorModel(loginFailInfo)
  }
  if (ctx.session.userInfo == null) {
    ctx.session.userInfo = userInfo
  }
  return new SuccessModel()
}

/**
 * 删除当前用户
 * @param userName
 * @returns {Promise<void>}
 */
async function deleteCurrentUser(userName) {
  const result = await deleteUser(userName)
  if (result) {
    return new SuccessModel()
  } else {
    return new ErrorModel(deleteUserFailInfo)
  }
}

module.exports = {
  isExist,
  register,
  login,
  deleteCurrentUser
}
