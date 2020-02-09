/**
 * @description 用户关系 controller
 */

const { getUserByFollower, getFollowersByUser, addFollower, deleteFollower } = require('../services/user-relation')
const { SuccessModel, ErrorModel } = require('../model/ResponseModel')
const { addFollowerFailInfo, deleteFollowerFailInfo } = require('../model/ErrorInfo')

/**
 * 根据用户id，获取粉丝列表
 * @param userId
 */
async function getFans(userId) {
  const {count, userList} = await getUserByFollower(userId)

  return new SuccessModel({
    count,
    fansList: userList
  })
}

/**
 * 根据用户id，获取关注人列表
 * @param userId
 */
async function getFollowers(userId) {
  const { count, userList } = await getFollowersByUser(userId)
  return new SuccessModel({
    count,
    followersList: userList
  })
}

/**
 * 关注
 * @param myUserId 当前登录的id
 * @param curUserId 要被专注的id
 */
async function follow(myUserId, curUserId) {
  try {
    await addFollower(myUserId, curUserId)
    return new SuccessModel()
  } catch (e) {
    console.error(e)
    return new ErrorModel(addFollowerFailInfo)
  }
}

/**
 * 取消关注
 * @param myUserId 当前登录的id
 * @param curUserId 要被删除专注的id
 */
async function unFollow(myUserId, curUserId) {
  const result = await deleteFollower(myUserId, curUserId)
  if (result) {
    return new SuccessModel()
  }
  return new ErrorModel(deleteFollowerFailInfo)
}

module.exports = {
  getFans,
  getFollowers,
  follow,
  unFollow
}
