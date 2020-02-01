const seq = require('./seq')
const Sequelize = require('sequelize')

// 创建user模型
const User = seq.define('user', {
  userName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  },
  nickName: {
    type: Sequelize.STRING,
    comment: '昵称'
  }
});

const Blog = seq.define('blog', {
  title: {
    type: Sequelize.STRING,
    allowNull: false 
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  userId: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
})

// 方式1， 外键关联
Blog.belongsTo(User, {
  foreignKey: 'userId'
})

// 方式2，不显式写userId Blog.belongsTo(User)

// 方式3，
User.hasMany(Blog, {
  foreignKey: 'userId'
})

module.exports = {
  User,
  Blog
}