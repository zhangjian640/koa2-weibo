/**
 * @description 微博 service
 */

const { Blog, User } = require('../db/model/index')
const { formatUser } = require('./_format')
/**
 * 创建微博
 * @param userId
 * @param content
 * @param image
 * @returns {Promise<void>}
 */
async function createBlog({ userId, content, image }) {
  const result = await Blog.create({
    userId,
    content,
    image
  })
  return result.dataValues
}

/**
 * 根据用户获取微博列表
 * @param userName
 * @param pageIndex
 * @param pageSize
 */
async function getBlogListByUser({userName, pageIndex=0, pageSize=10}) {
  const userWhereOptions = {}
  if (userName) {
    userWhereOptions.userName = userName
  }
  // 执行查询
  const result = await Blog.findAndCountAll({
    limit: pageSize,
    offset: pageSize * pageIndex,
    order: [['id', 'desc']],
    include: [
      {
        model: User,
        attributes: ['userName', 'nickName', 'picture'],
        where: userWhereOptions
      }
    ]
  })
  let blogList = result.rows.map(row => row.dataValues)
  blogList = blogList.map(blogItem => {
    const user = blogItem.user.dataValues
    blogItem.user = formatUser(user)
    return blogItem
  })

  return {
    count: result.count,
    blogList
  }
}

module.exports = {
  createBlog,
  getBlogListByUser
}
