/**
 * @description 用户关系 service
 */

const { User, UserRelation } = require('../db/model/index')
const { formatUser } = require('../services/_format')

/**
 * 获取粉丝
 * @param followerId 被关注人的id
 */
async function getUserByFollower(followerId) {
  const result = await User.findAndCountAll({
    attributes: ['id', 'userName', 'nickName', 'picture'],
    order: [['id', 'desc']],
    include: [
      {
        model: UserRelation,
        where: {
          followerId
        }
      }
    ]
  })
  let userList = result.rows.map(row => row.dataValues)
  userList = formatUser(userList)

  return {
    count: result.count,
    userList
  }
}

module.exports = {
  getUserByFollower
}
