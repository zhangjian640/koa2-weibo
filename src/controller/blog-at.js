/**
 * @description 微博@关系 controller
 */

const { getAtRelationCount } = require('../services/at-relation')
const { SuccessModel } = require('../model/ResponseModel')
/**
 * 获取 @ 我的微博数量
 * @param userId
 */
async function getAtMeCount(userId) {
  const count = await getAtRelationCount(userId)
  return new SuccessModel({
    count
  })
}

module.exports = {
  getAtMeCount
}
