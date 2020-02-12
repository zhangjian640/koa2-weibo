/**
 * @description 微博@用户关系的数据模型
 */

const seq = require('../seq')

const { INTEGER, BOOLEAN } = require('../types')

const AtRelation = seq.define('atRelation', {
  userId: {
    type: INTEGER,
    allowNull: false,
    comment: '用户id'
  },
  blogId: {
    type: INTEGER,
    allowNull: false,
    comment: '博客id'
  },
  isRead: {
    type: BOOLEAN,
    allowNull: false,
    defaultValue: false,
    comment: '是否已读'
  }
})

module.exports = AtRelation
