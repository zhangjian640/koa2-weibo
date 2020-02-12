/**
 * @description 数据模型入口文件
 *
 */

const User = require('./User')
const Blog = require('./Blog')
const UserRelation = require('./UserRelation')
const AtRelation = require('./AtRelation')

// 外键
// 一个用户有多个微博
// 查出微博，顺带查出用户
Blog.belongsTo(User, {
  foreignKey: 'userId'
})
// 查出用户顺带查出微博
// User.hasMany(Blog)

UserRelation.belongsTo(User, {
  foreignKey: 'followerId'
})

User.hasMany(UserRelation, {
  foreignKey: 'userId'
})

Blog.belongsTo(UserRelation, {
  foreignKey: 'userId',
  targetKey: 'followerId'
})

Blog.hasMany(AtRelation, {
  foreignKey: 'blogId'
})

module.exports = {
  User,
  Blog,
  UserRelation,
  AtRelation
}
