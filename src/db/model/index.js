/**
 * @description 数据模型入口文件
 *
 */

const User = require('./User')
const Blog = require('./Blog')

// 外键
// 一个用户有多个微博
// 查出微博，顺带查出用户
Blog.belongsTo(User, {
  foreignKey: 'userId'
})
// 查出用户顺带查出微博
// User.hasMany(Blog)

module.exports = {
  User,
  Blog
}
