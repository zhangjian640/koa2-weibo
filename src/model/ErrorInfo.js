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

const registerSuccess = {
  errno: 10004,
  message: '用户名已存在'
}

const registerUserNameNotExistInfo = {
  errno: 10003,
  message: '用户名未已存在'
}

module.exports = {
  registerUserNameExistInfo,
  registerUserNameNotExistInfo,
  registerSuccess,
  registerFailInfo
}
