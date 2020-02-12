/**
 * @description 首页 controller
 */

const xss = require('xss')
const { createBlog, getFollowersBlogList } = require('../services/blog')
const { SuccessModel, ErrorModel } = require('../model/ResponseModel')
const { getUserInfo } = require('../services/user')
const { createBlogFailInfo } = require('../model/ErrorInfo')
const { createAtRelation } = require('../services/at-relation')
const { PAGE_SIZE, REG_FOR_AT_WHO } = require('../config/constant')

/**
 * 创建微博
 * @param userId 用户id
 * @param content 内容
 * @param image 图片
 */
async function create({ userId, content, image }) {
  // 分析content 中 @ 用户
  const atUserNameList = []
  content = content.replace(
    REG_FOR_AT_WHO,
    (matchStr, nickName, userName) => {
      // 拿到用户名
      atUserNameList.push(userName)
      return matchStr
    }
  )

  // 根据@用户查询用户信息
  const atUserList = await Promise.all(
    atUserNameList.map(userName => getUserInfo(userName))
  )

  // 根据用户信息，获取用户id
  const atUserIdList = atUserList.map(user => user.id)


  try {
    const blog = await createBlog({
      userId,
      content: xss(content),
      image
    })

    // 创建at关系
    await Promise.all(atUserIdList.map(userId => createAtRelation(blog.id, userId)))

    return new SuccessModel(blog)
  } catch (e) {
    console.error(e.message, e.stack)
    return new ErrorModel(createBlogFailInfo)
  }
}

/**
 * 获取首页微博列表
 * @param userId
 * @param pageIndex
 */
async function getHomeBlogList(userId, pageIndex = 0) {
  const result = await getFollowersBlogList({ userId, pageIndex, pageSize: PAGE_SIZE })
  const { count, blogList } = result
  return new SuccessModel({
    isEmpty: blogList.length === 0,
    pageSize: PAGE_SIZE,
    pageIndex,
    count,
    blogList
  })
}

module.exports = {
  create,
  getHomeBlogList
}
