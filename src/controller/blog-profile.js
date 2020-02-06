/**
 * @description 个人主页controller
 */
const { getBlogListByUser } = require('../services/blog')
const { PAGE_SIZE } = require('../config/constant')
const { SuccessModel } = require('../model/ResponseModel')

/**
 * 获取个人主页微博列表
 * @param userName 用户名
 * @param pageIndex 页数
 * @returns {Promise<void>}
 */
async function getProfileBlogList(userName, pageIndex = 0) {
  const result = await getBlogListByUser({
    userName,
    pageIndex,
    pageSize: PAGE_SIZE
  })

  const blogList = result.blogList

  return new SuccessModel({
    isEmpty: blogList.length === 0,
    pageSize: PAGE_SIZE,
    pageIndex,
    count: result.count,
    blogList
  })
}

module.exports = {
  getProfileBlogList
}
