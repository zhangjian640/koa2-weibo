/**
 * @description 失败信息集合，包括 errno和message
 */

const registerUserNameExistInfo = {
  errno: 10001,
  message: '用户名已存在'
}

const registerFailInfo = {
  errno: 10002,
  message: '注册失败,请重试'
}

const registerUserNameNotExistInfo = {
  errno: 10003,
  message: '用户名未已存在'
}

const loginFailInfo = {
  errno: 10004,
  message: '登录失败，用户名或密码错误'
}

const jsonSchemaFailInfo = {
  errno: 10009,
  message: '数据格式校验失败'
}

module.exports = {
  registerUserNameExistInfo,
  registerUserNameNotExistInfo,
  loginFailInfo,
  registerFailInfo,
  jsonSchemaFailInfo
}
