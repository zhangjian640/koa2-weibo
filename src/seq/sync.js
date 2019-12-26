/**
 * @description sequelize 同步数据库
 */
const seq = require('./seq')

// require('./model')

seq.authenticate().then(() => {
  console.log('ok')
}).catch(() => {
  console.log('连接错误')
})

seq.sync({force: true}).then(() => {
  console.log('sync ok')
  process.exit()
})



