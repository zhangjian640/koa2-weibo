/**
 * @description utils controller
 */

const path = require('path')
const { ErrorModel, SuccessModel } = require('../model/ResponseModel')
const { uploadFileSizeFailInfo } = require('../model/ErrorInfo')
const fse = require('fs-extra')
// 文件最大提交 1M
const MAX_SIZE = 1024 * 1024 * 1024

// 存储目录
const DIST_FOLDER_PATH = path.join(__dirname, '..', '..', 'uploadFiles')

// 是否需要创建目录
fse.pathExists(DIST_FOLDER_PATH).then(exist => {
  if (!exist) {
    fse.ensureDir(DIST_FOLDER_PATH)
  }
})

/**
 * 保存文件
 * @param name 文件名
 * @param type 文件类型
 * @param size 文件体积大小
 * @param filePath 文件路径
 */
async function saveFile({name, type, size, filePath}) {
  if (size > MAX_SIZE) {
    await fse.remove(filePath) // 删除临时文件
    return new ErrorModel(uploadFileSizeFailInfo)
  }
  // 移动文件
  const fileName = Date.now() + '.' + name // 防止重名
  const distFilePath = path.join(DIST_FOLDER_PATH, fileName) // 目的地
  await fse.move(filePath, distFilePath)

  // 返回信息
  return new SuccessModel({
    url: '/' + fileName
  })
}

module.exports = {
  saveFile
}
