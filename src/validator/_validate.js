/**
 * @description 校验规则
 */
const Ajv = require('ajv')
const ajv = new Ajv({
  // allErrors: true // 输出所有的错误（慢）
})

/**
 * json schema 校验
 * @param {object} schema 规则
 * @param {object} data 待校验数据
 */
function validate(schema, data = {}) {
  const valid = ajv.validate(schema, data)
  if (!valid) {
    return ajv.errors[0]
  }
}

module.exports = validate
