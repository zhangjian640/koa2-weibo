/**
 * @description 个人主页 test
 */

const server = require('../server')
const { COOKIE, USER_NAME } = require('../testUserInfo')

describe('个人首页', () => {
  test('加载第一个数据，应该成功', async () => {
    const res = await server
      .get(`/api/profile/loadMore/${USER_NAME}/0`)
      .set('cookie', COOKIE)
    expect(res.body.errno).toBe(0)
    const data = res.body.data
    expect(data).toHaveProperty('isEmpty')
    expect(data).toHaveProperty('pageIndex')
    expect(data).toHaveProperty('pageSize')
    expect(data).toHaveProperty('count')
    expect(data).toHaveProperty('blogList')
  })
})
