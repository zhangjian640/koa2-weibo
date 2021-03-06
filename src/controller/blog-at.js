/**
 * @description 微博@关系 controller
 */

const { getAtRelationCount, getAtUserBlogList, updateAtRelation } = require('../services/at-relation')
const { SuccessModel } = require('../model/ResponseModel')
const { PAGE_SIZE } = require('../config/constant')
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

/**
 * 获取@用户的微博列表
 * @param userId
 * @param pageIndex
 * @returns {Promise<SuccessModel|*>}
 */
async function getAtMeBlogList(userId, pageIndex = 0) {
  const result = await getAtUserBlogList({ userId, pageIndex, pageSize: PAGE_SIZE })
  const { count, blogList } = result

  return new SuccessModel({
    isEmpty: blogList.length === 0,
    pageSize: PAGE_SIZE,
    pageIndex,
    count,
    blogList
  })
}

/**
 * 标记为已读
 * @param userId
 */
async function markAsRead(userId) {
  try {
    await updateAtRelation(
      {newIsRead: true},
      {userId, isRead: false}
    )
  } catch (e) {
    console.error(e)
  }

}

module.exports = {
  getAtMeCount,
  getAtMeBlogList,
  markAsRead
}
