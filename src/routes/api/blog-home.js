/**
 * @description 首页 API 路由
 */

const router = require('koa-router')()
const { loginCheck } = require('../../middlewares/loginChecks')
const { create, getHomeBlogList } = require('../../controller/blog-home')
const { genValidator } = require('../../middlewares/validator')
const blogValidate = require('../../validator/blog')
const { getBlogListString } = require('../../utils/blog')

router.prefix('/api/blog')

// 新建博客
router.post('/create', loginCheck, genValidator(blogValidate), async (ctx, next) => {
  const { content, image } = ctx.request.body
  const {id: userId} = ctx.session.userInfo
  ctx.body = await create({ userId, content, image })
})

// 加载更多
router.get('/loadMore/:pageIndex', loginCheck, async (ctx, next) => {
  let { pageIndex } = ctx.params
  pageIndex = parseInt(pageIndex)
  const {id: userId} = ctx.session.userInfo
  const result = await getHomeBlogList(userId, pageIndex)

  result.data.blogListTpl = getBlogListString(result.data.blogList)

  ctx.body = result
})

module.exports = router
