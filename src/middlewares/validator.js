/**
 * @description json schema 验证中间件
 */

const { ErrorModel } = require('../model/ResponseModel')
const { jsonSchemaFailInfo } = require('../model/ErrorInfo')

/**
 * @param {function} 验证的中间件
 */
function genValidator (validateFn) {
  // 定义中间件函数
  async function validator(ctx, next) {
    const data = ctx.request.body
    const error = validateFn(data)
    if (error) {
      // 验证失败
      ctx.body = new ErrorModel(jsonSchemaFailInfo)
      return
    }
    await next()
  }
  return validator
}

module.exports = {
  genValidator
}
