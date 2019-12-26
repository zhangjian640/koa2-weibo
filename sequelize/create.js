const { User, Blog } = require('./model')
// 创建
!(async function() {
  // 创建用户
  const zj = await User.create({
    userName: 'zj',
    password: '123', 
    nickName: 'zj'
  })
  const zjId = zj.dataValues.id
  
  const zhangsan = await User.create({
    userName: 'zhangsan',
    password: '123', 
    nickName: 'zj'
  })
  const zhangsanId = zhangsan.dataValues.id


  const blog1 = await Blog.create({
    title: 'blog1',
    content: 'blog1内容',
    userId: zjId
  })
  const blog2 = await Blog.create({
    title: 'blog2',
    content: 'blog2内容',
    userId: zjId
  })
  const blog3 = await Blog.create({
    title: 'blog3',
    content: 'blog3内容',
    userId: zhangsanId
  })
  const blog4 = await Blog.create({
    title: 'blog4',
    content: 'blog4内容',
    userId: zhangsanId
  })
})()
