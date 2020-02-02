/**
 * @description user model test
 */

const { User } = require('../../src/db/model/index')

describe('User Model', () => {
  test('属性符合预期', () => {
    // build 会构建一个内存的 User实例，不会提交到数据库中
    const user = User.build({
      userName: 'zhangsan',
      password: '123',
      nickName: '张三',
      picture: '/xxx.png',
      city: '武汉'
    })

    // 验证属性
    expect(user.userName).toBe('zhangsan')
    expect(user.password).toBe('123')
    expect(user.nickName).toBe('张三')
    expect(user.gender).toBe(3)
    expect(user.picture).toBe('/xxx.png')
    expect(user.city).toBe('武汉')
  })
})
