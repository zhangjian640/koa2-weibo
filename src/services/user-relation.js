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

/**
 * 获取关注人列表
 * @param userId
 */
async function getFollowersByUser(userId) {
  const result = await UserRelation.findAndCountAll({
    order: [
      ['id', 'desc']
    ],
    include: [
      {
        model: User,
        attributes: ['id', 'userName', 'nickName', 'picture']
      }
    ],
    where: {
      userId
    }
  })

  let userList = result.rows.map(row => row.dataValues)
  userList = userList.map(item => {
    let user = item.user
    user = formatUser(user.dataValues)
    return user
  })

  return {
    count: result.count,
    userList
  }
}

/**
 * 添加关注关系
 * @param userId
 * @param followerId
 */
async function addFollower(userId, followerId) {
  const result = await UserRelation.create({
    userId,
    followerId
  })
  return result.dataValues
}

/**
 * 删除关注关系
 * @param userId
 * @param followerId
 */
async function deleteFollower(userId, followerId) {
  const result = await UserRelation.destroy({
    where: {
      userId,
      followerId
    }
  })
  return result > 0
}

module.exports = {
  getUserByFollower,
  getFollowersByUser,
  addFollower,
  deleteFollower
}
