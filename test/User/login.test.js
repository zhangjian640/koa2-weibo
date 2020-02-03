/**
 * @description user api test
 */
const server = require('../server')

const userName = `u_${Date.now()}`
const password = `p_${Date.now()}`

const testUser = {
  userName,
  password,
  nickName: userName,
  gender: 1
}

let COOKIE = ''

describe('注册', () => {
  test('用户注册，应该成功', async () => {
    const res = await server
      .post('/api/user/register')
      .send(testUser)
    expect(res.body.errno).toBe(0)
  })

  test('重复注册, 应该失败', async () => {
    const res = await server
      .post('/api/user/register')
      .send(testUser)
    expect(res.body.errno).not.toBe(0)
  })

  test('查询注册的用户名，应该存在', async () => {
    const res = await server
      .post('/api/user/isExist')
      .send({ userName })
    expect(res.body.errno).toBe(0)
  })

  test('json schema 检测，非法的格式，注册应该失败', async () => {
    const res = await server
      .post('/api/user/register')
      .send({
        userName: '123',
        password: 'a',
        gender: 'abc'
      })
    expect(res.body.errno).not.toBe(0)
  })
})

describe('登录', () => {
  test('应该登录成功', async () => {
    const res = await server
      .post('/api/user/login')
      .send({
        userName,
        password
      })
    expect(res.body.errno).toBe(0)

    // 获取cookie
    COOKIE = res.headers['set-cookie'].join(';')

  })

  test('修改基本信息，应该成功', async () => {
    const res = await server
      .patch('/api/user/changeInfo')
      .send({
        nickName: '测试昵称',
        city: '测试城市',
        picture: '/test.png'
      })
      .set('cookie', COOKIE)
    expect(res.body.errno).toBe(0)
  })

  test('修改密码应该成功', async () => {
    const res = await server
      .patch('/api/user/changePassword')
      .send({
        password,
        newPassword: `p_${Date.now()}`
      })
      .set('cookie', COOKIE)
    expect(res.body.errno).toBe(0)
  })

  test('删除用户应该成功', async () => {
    const res = await server
      .post('/api/user/delete')
      .set('cookie', COOKIE)
    expect(res.body.errno).toBe(0)
  })

  test('退出登录应该成功', async () => {
    const res = await server
      .post('/api/user/logout')
      .set('cookie', COOKIE)
    expect(res.body.errno).toBe(0)
  })

  test('删除用户后，再次查询注册的用户名，应该不存在', async () => {
    const res = await server
      .post('/api/user/isExist')
      .send({ userName })
    expect(res.body.errno).not.toBe(0)
  })
})
