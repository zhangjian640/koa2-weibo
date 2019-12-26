const server = require('./server')

test('json 接口数据返回格式正确', async () => {
  const res = await server.get('/json')
  expect(res.body).toEqual({
    title: 'koa2 json'
  })
  expect(res.body.title).toBe('koa2 json')
})

test('post 请求', async () => {
  const res = await server.post('/login').send({
    userName: 'zj',
    password: '123'
  })
  expect(res.body).toEqual({
    title: 'koa2 json'
  })
  expect(res.body.title).toBe('koa2 json')
})
