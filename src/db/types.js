/**
 * @description 封装 sequeilze 数据类型
 */

const Sequelize = require('sequelize')

module.exports = {
  STRING: Sequelize.STRING,
  DECIMAL: Sequelize.DECIMAL,
  TEXT: Sequelize.TEXT,
  INTERGER: Sequelize.INTEGER,
  BOOLEAN: Sequelize.BOOLEAN
}
