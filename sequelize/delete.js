const { User, Blog } = require('./model')
// 创建
!(async function () {
  const delBlogRes = await Blog.destroy(
    {
      where: {
        id: 4
      }
    }
  )

  console.log('delBlogRes:', delBlogRes)

  const delUser = await User.destroy({
    where: {
      id: 1
    }
  })
  console.log('delUser:', delUser)
})()

/**
 1.
 sequelize 1.连接数据库
 [sequelize 1.连接数据库](https://blog.csdn.net/m0_37068028/article/details/103594498)
 https://blog.csdn.net/m0_37068028/article/details/103594498
 */

/*
2. 
sequelize 2.创建模型
https://blog.csdn.net/m0_37068028/article/details/103594671
[sequelize 2.创建模型](https://blog.csdn.net/m0_37068028/article/details/103594671)
*/
/*
3.
sequelize 3. 根据模型创建数据库
https://blog.csdn.net/m0_37068028/article/details/103594984
[sequelize 3. 根据模型创建数据库](https://blog.csdn.net/m0_37068028/article/details/103594984)
*/
/*
4
sequelize 操作 4.新增
https://blog.csdn.net/m0_37068028/article/details/103595054
[sequelize 操作 4.新增](https://blog.csdn.net/m0_37068028/article/details/103595054)
*/

/**
5
sequelize操作，5.查询，总数、分页、联表
https://blog.csdn.net/m0_37068028/article/details/103595111
[sequelize操作，5.查询，总数、分页、联表](https://blog.csdn.net/m0_37068028/article/details/103595111)
 */
/*
6

https://blog.csdn.net/m0_37068028/article/details/103595218
[sequelize操作 6.更新](https://blog.csdn.net/m0_37068028/article/details/103595218)

*/