const path = require('path')
const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const session = require('koa-generic-session')
const redisStore = require('koa-redis')
const koaStatic = require('koa-static')

// 路由
const blogViewRouter = require('./routes/view/blog')
const blogHomeAPIRouter = require('./routes/api/blog-home')
const blogProfileAPIRouter = require('./routes/api/blog-profile')
const blogSquareAPIRouter = require('./routes/api/blog-square')
const blogAtMeAPIRouter = require('./routes/api/blog-at')
const utilsAPIRouter = require('./routes/api/utils')
const errorViewRouter = require('./routes/view/error')
const userViewRouter = require('./routes/view/user')
const userAPIRouter = require('./routes/api/user')
const { REDIS_CONF } = require('./config/db')
const { isProd } = require('./utils/env')
const { SESSION_SECRET_KEY } = require('./config/secretKeys')

// error handler
let errorConfig = {}
if (isProd) {
  errorConfig = {
    redirect: '/error'
  }
}
onerror(app, errorConfig)

// middlewares
app.use(bodyparser({
  enableTypes: ['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(koaStatic(__dirname + '/public'))
app.use(koaStatic(path.join(__dirname, '..', 'uploadFiles')))

app.use(views(__dirname + '/views', {
  extension: 'ejs'
}))

// session配置
app.keys = [SESSION_SECRET_KEY]
app.use(session({
  key: 'weibo.sid', // cookie name 默认'koa.sid'
  prefix: 'weibo.sess', // redis key前缀 默认'koa.sess'
  cookie: {
    path: '/',
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000
  },
  store: redisStore({
    all: `${REDIS_CONF.host}:${REDIS_CONF.port}`
  })
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(blogViewRouter.routes(), blogViewRouter.allowedMethods())
app.use(blogHomeAPIRouter.routes(), blogHomeAPIRouter.allowedMethods())
app.use(blogProfileAPIRouter.routes(), blogProfileAPIRouter.allowedMethods())
app.use(blogSquareAPIRouter.routes(), blogSquareAPIRouter.allowedMethods())
app.use(blogAtMeAPIRouter.routes(), blogAtMeAPIRouter.allowedMethods())
app.use(userViewRouter.routes(), userViewRouter.allowedMethods())
app.use(userAPIRouter.routes(), userAPIRouter.allowedMethods())
app.use(utilsAPIRouter.routes(), utilsAPIRouter.allowedMethods())
app.use(errorViewRouter.routes(), errorViewRouter.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
})

module.exports = app
