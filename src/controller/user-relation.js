/**
 * @description 用户关系 controller
 */

const { getUserByFollower } = require('../services/user-relation')
const { SuccessModel } = require('../model/ResponseModel')

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

module.exports = {
  getFans
}
