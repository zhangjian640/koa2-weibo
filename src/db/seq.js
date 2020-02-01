const Sequelize = require('sequelize')
const { MYSQL_CONF } = require('../config/db')
const { isProd, isTest } = require('../utils/env')
const { host, user, password, database } = MYSQL_CONF
const config = {
  host,
  dialect: 'mysql',
  dialectOptions: {
    charset: 'utf8mb4',
    collate: 'utf8mb4_unicode_ci',
    supportBigNumbers: true,
    bigNumberStrings: true
  },
  define: {
    underscored: true,
    charset: 'utf8mb4'
  }
}

// 单元测试是，不输出日志
if (isTest) {
  config.logging = () => { }
}

if (isProd) {
  // 连接池
  config.pool = {
    max: 5, // 最大连接数
    min: 0, // 最小连接数
    idle: 10000 // 如果一个连接池10s内没有被使用，则释放
  }
}

const seq = new Sequelize(database, user, password, config)

module.exports = seq
