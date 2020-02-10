/**
 * 首页 api test
 */

const server = require('../server')
const { Z_COOKIE } = require('../testUserInfo')

// 存储blog id
let BLOG_ID = ''

describe('微博', () => {
  test('创建微博，应该成功', async () => {
    const content = '单元测试自动创建的内容_' + Date.now()
    const image = '/test.png'

    const res = await server.post('/api/blog/create')
      .send({content, image})
      .set('cookie', Z_COOKIE)

    expect(res.body.errno).toBe(0)
    expect(res.body.data.content).toBe(content)
    expect(res.body.data.image).toBe(image)

    // 记录微博id
    BLOG_ID = res.body.data.id
  })

  test('首页，加载第一页数据，应该成功', async () => {
    const res = await server
      .get(`/api/blog/loadMore/0`)
      .set('cookie', Z_COOKIE)
    expect(res.body.errno).toBe(0)
    const data = res.body.data
    expect(data).toHaveProperty('isEmpty')
    expect(data).toHaveProperty('pageIndex')
    expect(data).toHaveProperty('pageSize')
    expect(data).toHaveProperty('count')
    expect(data).toHaveProperty('blogList')
  })
})
