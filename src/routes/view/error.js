const router = require('koa-router')()

router.get('/error', async (ctx, next) => {
  throw new Error('错误了')
  // await ctx.render('error')
})

router.get('*', async (ctx, next) => {
  await ctx.render('404')
})

module.exports = router
