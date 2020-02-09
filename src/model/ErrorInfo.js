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

const loginCheckFailInfo = {
  errno: 10005,
  message: '您尚未登录'
}

const changePasswordFailInfo = {
  errno: 10006,
  message: '修改密码失败，请重试'
}

const uploadFileSizeFailInfo = {
  errno: 10007,
  message: '上传文件尺寸过大'
}

const changeInfoFailInfo = {
  errno: 10008,
  message: '修改基本信息失败'
}

const jsonSchemaFailInfo = {
  errno: 10009,
  message: '数据格式校验失败'
}

const deleteUserFailInfo = {
  errno: 10010,
  message: '删除用户失败'
}

const createBlogFailInfo = {
  errno: 10011,
  message: '创建微博失败，请重试'
}

const addFollowerFailInfo = {
  errno: 11001,
  message: '添加关注失败'
}

const deleteFollowerFailInfo = {
  errno: 11002,
  message: '删除关注失败'
}

module.exports = {
  registerUserNameExistInfo,
  registerUserNameNotExistInfo,
  loginFailInfo,
  registerFailInfo,
  changePasswordFailInfo,
  uploadFileSizeFailInfo,
  loginCheckFailInfo,
  changeInfoFailInfo,
  jsonSchemaFailInfo,
  deleteUserFailInfo,
  createBlogFailInfo,
  addFollowerFailInfo,
  deleteFollowerFailInfo
}
