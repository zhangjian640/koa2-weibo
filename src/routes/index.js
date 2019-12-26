const router = require('koa-router')()

router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
})

router.get('/json', async (ctx, next) => {
  // const session = ctx.session
  // if (session.viewNum == null) {
    // session.viewNum = 0
  // }
  // session.viewNum ++ 
  ctx.body = {
    // viewNum: session.viewNum, 
    title: 'koa2 json'
  }
})
router.get('/profile/:userName', async (ctx, next) => {
  const { userName }  = ctx.params
  ctx.body = {
    title: 'this is profile page',
    userName
  }
})

router.post('/login', async (ctx, next) => {
  const { userName, password } = ctx.request.body
  ctx.body = {
    userName,
    password
  }
})

module.exports = router
