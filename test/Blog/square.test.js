/**
 * @description 广场 test
 */

const server = require('../server')
const { COOKIE } = require('../testUserInfo')

describe('广场', () => {
  test('加载第一个数据，应该成功', async () => {
    const res = await server
      .get(`/api/square/loadMore/0`)
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
