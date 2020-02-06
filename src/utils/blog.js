/**
 * @description 微博数据相关的工具方法
 */
const fs = require('fs')
const path = require('path')
const ejs = require('ejs')

const BLOG_LIST_TPL = fs.readFileSync(
  path.join(__dirname, '..', 'views', 'widgets', 'blog-list.ejs')
).toString()

/**
 * 根据 blogList 渲染出 html 字符串
 * @param blogList 微博列表
 * @param canReply 是否可以回复
 */
function getBlogListString(blogList = [], canReply = false) {
  return ejs.render(BLOG_LIST_TPL, {
    blogList,
    canReply
  })
}

module.exports = {
  getBlogListString
}
