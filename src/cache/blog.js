/**
 * @description 微博缓存
 */

const { get, set } = require('./_redis')
const { getBlogListByUser } = require('../services/blog')

// redis key 前缀
const KEY_PREFIX = 'weibo:square'

/**
 * 获取广场列表缓存
 * @param pageIndex
 * @param pageSize
 * @returns {Promise<void>}
 */
async function getSquareCacheList(pageIndex, pageSize) {
  const key = `${KEY_PREFIX}${pageIndex}_${pageSize}`

  const cacheResult = await get(key)
  if(cacheResult != null) {
    // 有缓存
    return cacheResult
  }

  // 没有缓存， 则读取数据库
  const result = await getBlogListByUser({pageIndex, pageSize})

  // 设置缓存，过期时间 1min
  set(key, result, 60)

  return result
}

module.exports = {
  getSquareCacheList
}
