/**
 * @description 微博 @ 用户关系
 */

const { AtRelation } = require('../db/model/index')
const { Blog } = require('../db/model/index')
const { User } = require('../db/model/index')
const { formatUser, formatBlog } = require('./_format')

/**
 * 创建微博 @ 用户的关系
 * @param blogId
 * @param userId
 * @returns {Promise<void>}
 */
async function createAtRelation(blogId, userId) {
  const result = await AtRelation.create({
    blogId,
    userId
  })

  return result.dataValues
}

/**
 * 获取 @ 用户的微博未读数量
 * @param userId
 * @returns {Promise<void>}
 */
async function getAtRelationCount(userId) {
  const result = await AtRelation.findAndCountAll({
    where: {
      userId,
      isRead: false
    }
  })
  return result.count
}

/**
 * 获取@用户的微博列表
 * @param userId
 * @param pageIndex
 * @param pageSize
 */
async function getAtUserBlogList({ userId, pageIndex, pageSize = 10 }) {
  const result = await Blog.findAndCountAll({
    limit: pageSize,
    offset: pageSize * pageIndex,
    order: [
      ['id', 'desc']
    ],
    include: [
      // @ 关系
      {
        model: AtRelation,
        attributes: ['userId', 'blogId'],
        where: { userId }
      },
      // User
      {
        model: User,
        attributes: ['userName', 'nickName', 'picture']
      }
    ]
  })

  let blogList = result.rows.map(row => row.dataValues)
  blogList = formatBlog(blogList)
  blogList = blogList.map(blogItem => {
    blogItem.user = formatUser(blogItem.user)
    return blogItem
  })

  return {
    count: result.count,
    blogList
  }
}

/**
 * 更新AtRelation
 * @param newIsRead 更新内容
 * @param userId 查询条件
 * @param isRead 查询条件
 * @returns {Promise<void>}
 */
async function updateAtRelation({ newIsRead }, { userId, isRead }) {
  // 更新内容
  const updateData = {}
  if (newIsRead) {
    updateData.isRead = newIsRead
  }

  // 查询条件
  const whereData = {}
  if (userId) {
    whereData.userId = userId
  }
  if (isRead) {
    whereData.isRead = isRead
  }

  const result = await AtRelation.update(updateData, {
    where: whereData
  })
  return result[0] > 0
}

module.exports = {
  createAtRelation,
  getAtRelationCount,
  getAtUserBlogList,
  updateAtRelation
}
