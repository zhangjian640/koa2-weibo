const { User, Blog } = require('./model')
// 创建
!(async function () {
  // 查询一个
  const zj = await User.findOne({
    where: {
      userName: 'zj'
    }
  })
  console.log('zj: ', zj.dataValues)

  // 查询列
  const zjInfo = await User.findOne({
    attributes: ['userName', 'nickName']
  })

  console.log('info: ', zjInfo.dataValues)

  // 查询集合
  const zjBlogs = await Blog.findAll({
    where: {
      userId: 1
    },
    order: [
      ['id', 'desc']
    ]
  })
  console.log('zjBlogs: ', zjBlogs.map(blog => blog.dataValues))

  // 分页
  const blogPageList = await Blog.findAll({
    order: [
      ['id', 'desc']
    ],
    limit: 2,
    offset: 2
  })

  console.log('blogPageList: ', blogPageList.map(blog => blog.dataValues))

  // 查询总数
  const blogListAndCount = await Blog.findAndCountAll({
    order: [
      ['id', 'desc']
    ],
    limit: 2,
    offset: 2
  })
  console.log('blogListAndCount：',
    blogListAndCount.count, // 总数
    blogListAndCount.rows.map(blog => blog.dataValues)
  )

  // 连表查询
  const blogListWithUser = await Blog.findAndCountAll({
    order: [
      ['id', 'desc']
    ],
    include: [
      {
        model: User,
        attributes: ['userName', 'nickName'],
        where: {
          userName: 'zj'
        }
      }
    ]
  })
  console.log('blogListWithUser: ',
    blogListWithUser.count,
    blogListWithUser.rows.map(blog => {
      const blogVal = blog.dataValues
      blogVal.user = blogVal.user.dataValues
      return blogVal
    })
  )

  // 连表查询2
  const userListWithBlog = await User.findAndCountAll({
    attributes: ['userName', 'nickName'],
    include: [
      {
        model: Blog
      }
    ]
  })
  console.log('userListWithBlog: ',
    userListWithBlog.count,
    userListWithBlog.rows.map(user => {
      const userVal = user.dataValues
      userVal.blogs = userVal.blogs.map(blog => blog.dataValues)
      return userVal
    })
  )
})()