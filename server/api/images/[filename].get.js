import { createReadStream, existsSync } from 'fs'
import { join, extname } from 'path'
import { lookup } from 'mime-types'

export default defineEventHandler((event) => {
  const { filename } = event.context.params

  // Създаване на пълния път до файла
  const filePath = join(process.cwd(), 'uploads', filename)

  // Проверка дали файлът съществува
  if (!existsSync(filePath)) {
    event.res.statusCode = 404
    return 'Not Found'
  }

  // Определяне на MIME типа на файла (например image/jpeg, image/png)
  const ext = extname(filename)
  const mimeType = lookup(ext) || 'application/octet-stream'
  event.res.setHeader('Content-Type', mimeType)

  // Връщане на потока към файла
  return createReadStream(filePath)
})
