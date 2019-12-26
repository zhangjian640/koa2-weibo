const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const session = require('koa-generic-session')
const redisStore = require('koa-redis')

const errorView = require('./routes/view/error')
const index = require('./routes/index')
const users = require('./routes/users')
const { REDIS_CONF } = require('./config/db')
const { isProd } = require('./utils/env')

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
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'ejs'
}))

// session配置
app.keys = ['secret']
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
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())
app.use(errorView.routes(), errorView.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
})

module.exports = app
