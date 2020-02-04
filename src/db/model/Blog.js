/*
* @description 微博模型
*/

const seq = require('../seq')
const { STRING, INTERGER, TEXT } = require('../types')

const Blog = seq.define('blog', {
  userId: {
    type: INTERGER,
    allowNull: false,
    comment: '用户 ID'
  },
  content: {
    type: TEXT,
    allowNull: false,
    comment: '微博内容'
  },
  image: {
    type: STRING,
    comment: '图片地址'
  }
})

module.exports = Blog