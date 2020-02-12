/**
 * @description 个人主页 API 路由
 */

const router = require('koa-router')()
const { loginCheck } = require('../../middlewares/loginChecks')
const { getAtMeBlogList } = require('../../controller/blog-at')
const { getBlogListString } = require('../../utils/blog')

router.prefix('/api/atMe')

// 加载更多
router.get('/loadMore/:pageIndex', loginCheck, async (ctx, next) => {
  const {id: userId} = ctx.session.userInfo
  let { pageIndex } = ctx.params
  pageIndex = parseInt(pageIndex)
  const result = await getAtMeBlogList(userId, pageIndex)

  result.data.blogListTpl = getBlogListString(result.data.blogList)

  ctx.body = result
})

module.exports = router
