/**
 * @description 首页 controller
 */

const xss = require('xss')
const { createBlog } = require('../services/blog')
const { SuccessModel, ErrorModel } = require('../model/ResponseModel')
const { createBlogFailInfo } = require('../model/ErrorInfo')
/**
 * 创建微博
 * @param userId 用户id
 * @param content 内容
 * @param image 图片
 */
async function create({ userId, content, image }) {
  try {
    const blog = await createBlog({
      userId,
      content: xss(content),
      image
    })
    return new SuccessModel(blog)
  } catch (e) {
    console.error(e.message, e.stack)
    return new ErrorModel(createBlogFailInfo)
  }
}

module.exports = {
  create
}
