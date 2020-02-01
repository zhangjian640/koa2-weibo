/**
 * @param {function} 验证的中间件
 */
function genValidator (userValidate) {
  async function validator(ctx, next) {
    userValidate(ctx.request.body)
  }
  return validator 
}

module.exports = {
  genValidator
}